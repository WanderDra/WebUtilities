import { Component, OnDestroy, OnInit } from '@angular/core';
import { RAData } from './reserve-allocation.model';
import { BehaviorSubject, forkJoin, Observable, Subscription } from 'rxjs';
import { ISearchCriteriaConfigs, ISearchCriteriaForm } from './components/ra-search-panel/ra-search-panel.interfaces';
import { RaAPIService } from './services/ra-api.service';
import { RAUserType } from './constants/ra-general-constants';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'crew-nav-reserve-allocation',
  templateUrl: './reserve-allocation.component.html',
  styleUrls: ['./reserve-allocation.component.scss']
})
export class ReserveAllocationComponent implements OnInit, OnDestroy {

  readonly raData$ = new BehaviorSubject<RAData | null>(null);
  readonly searchCriteriaConfigs$ = new BehaviorSubject<ISearchCriteriaConfigs>(null);

  isPageInitiating: boolean = false;
  isRADataLoading: boolean = false;
  isZulu: boolean = true;
  userType: RAUserType = RAUserType.ADMIN; //TEMP
  
  loadingError: string = '';

  subscriptions = new Subscription();

  constructor(private raAPI: RaAPIService) { }

  ngOnInit(): void {
     this.initData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initData(): void {
    this.isPageInitiating = true;
    const initSub = forkJoin([
      this.getSearchCriteriaConfigs()
    ]).pipe(retry(3)).subscribe(results => {
      const configs: ISearchCriteriaConfigs = results[0].searchConfigs;
      this.initSearchCriteriaConfig(configs);
      this.isPageInitiating = false;
    }, error => {
      this.loadingError = error;
      console.error(error);
    });
    this.subscriptions.add(initSub);
  }

  // WIP
  getSearchCriteriaConfigs(): Observable<any> {
    return this.raAPI.getRAConfigs();
  }

  initSearchCriteriaConfig(configs: ISearchCriteriaConfigs): void {
    configs.userType = this.userType;
    this.searchCriteriaConfigs$.next(configs);
  }

  onRaSearchSubmit(form: ISearchCriteriaForm): void {
    this.getRAData(form);
  }

  getRAData(searchCriteria: ISearchCriteriaForm): void {
    this.isRADataLoading = true;
    this.raData$.next(null);
    // temp
    const raSearchSub = this.raAPI.getSearchResponse().subscribe(
      (response) => {
        const data = new RAData();
        data.searchCriteria = searchCriteria;
        // temp
        data.currentPilot = response.pilotInfo;
        data.uncoveredTripsAmount = response.uncoveredTripsAmount;
        data.uncoveredTripsDays = response.uncoveredTripsDays;
        data.userType = this.userType;
        this.raData$.next(data);
        this.isRADataLoading = false;
      },
      error => {
        console.error(error);
        this.isRADataLoading = false;
      }
    )
    this.subscriptions.add(raSearchSub);
  }

  patchRAData(newRAData: RAData): void {
    const oldRAData = this.raData$.value;
    const newData = {...oldRAData, ...newRAData};
    this.raData$.next(newData);
  }
}
