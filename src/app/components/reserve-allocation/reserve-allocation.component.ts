import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subscription } from 'rxjs';
import { ISearchCriteriaConfigs, ISearchCriteriaForm } from './components/ra-search-panel/ra-search-panel.interfaces';
import { RaAPIService } from './services/ra-api.service';
import { RA_MAX_TRIP_LENGTH, RAForecastCellType, RAUserType } from './constants/ra-general-constants';
import { retry } from 'rxjs/operators';
import { ForecastCoverageData } from './models/ra-forecast-coverage';
import { FCChartRecord } from './components/ra-forecast-coverage-chart/ra-fc-chart.model';
import * as moment from 'moment';
import { IRACellConfig, IRAConfig } from './interfaces/ra-config.interfaces';
import { RAForecastChartCell } from './models/ra-forecast-cell';
import { ViewAsOption } from './components/ra-search-panel/ra-search-panel.model';
import { RAData } from './models/ra-data';
import { UncoveredRequirementsData } from './models/ra-uncovered-requirements';
import { URChartRecord } from './components/ra-uncovered-requirements-chart/ra-ur-chart.model';

@Component({
  selector: 'crew-nav-reserve-allocation',
  templateUrl: './reserve-allocation.component.html',
  styleUrls: ['./reserve-allocation.component.scss']
})
export class ReserveAllocationComponent implements OnInit, OnDestroy {

  @Input('config') raConfig: IRAConfig

  readonly raData$ = new BehaviorSubject<RAData | null>(null);
  readonly searchCriteriaConfigs$ = new BehaviorSubject<ISearchCriteriaConfigs>(null);
  // User type for content displaying, not influencing Search criteria
  readonly displayUserType$ = new BehaviorSubject<RAUserType | null>(null); 

  isPageInitiating: boolean = false;
  isRADataLoading: boolean = false;
  isZulu: boolean = true;
  userType: RAUserType = RAUserType.ADMIN; //TEMP
  
  loadingError: string = '';
  raUserType = RAUserType;

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
      // Init User data
      this.displayUserType$.next(this.userType);
      // Init Configs
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
    this.displayUserType$.next(this.getUserTypeFromViewAs(searchCriteria.view_as))
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
        data.forecastCoverageRecords = this.generateFCChartRecords(response.forecastCoverage);
        data.uncoveredRequirementsRecords = this.generateURChartRecords(response.uncoveredRequirements)
        data.maxTripLength = RA_MAX_TRIP_LENGTH;
        data.backgroundColor = this.raConfig?.backgroundColor ?? 'white';
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

  generateFCChartRecords(forecastCoverageData: ForecastCoverageData): FCChartRecord[] {
    const fcChartRecords: FCChartRecord[] = [];
    // Test
    let dateCounter = 0;
    for (let i = 0; i < 60; i++) {
      const testData = new FCChartRecord();
      testData.date = moment().add(dateCounter, 'day').utc().format('DDMMM');
      if (i % 4 === 0) {
        ++dateCounter;
      }
      const testCells: RAForecastChartCell[] = [];
      const testCells2: RAForecastChartCell[] = [];
      for (let j = 0; j < i; j++) {
        testCells.push(null)
      }
      for (let k = 14 - i; k >= 0; k--) {
        testCells2.push(null);
      }
      Object.values(RAForecastCellType).forEach((value, i) => {
        if (i < 6) {
          return
        }
        const testCellConfig: IRACellConfig = {
          cellType: value as RAForecastCellType,
          cellContent: 'X',
          hideContent: value == RAForecastCellType.FORECAST_EQUAL
        }
        testCells.push(new RAForecastChartCell(testCellConfig));
        testCells2.push(new RAForecastChartCell(testCellConfig));
      });
      testData.tripDateCells = [
        ...testCells
      ];
      for (let l = 0; l < 18 - testCells.length; l++) {
        testData.tripDateCells.push(null);
      }
      testData.tripDateCells.forEach((cell, i) => testData.tripDateCells[i] = cell ? cell : testCells2[i])
      fcChartRecords.push(testData);
    }
    return fcChartRecords;
  }

  generateURChartRecords(uncoveredRequirementsData: UncoveredRequirementsData): URChartRecord[] {
    const urChartRecord: URChartRecord[] = [];
    for (let i = 0; i < 80; ++i) {
      const testRecord = new URChartRecord();
      testRecord.date = moment().format('DDMMMYY');
      testRecord.days = 5;
      testRecord.requirement = 'Test';
      testRecord.typeOfRequirement = 'Projected Open Time';
      testRecord.rsvPrd = 'RA';
      const testCVG: IRACellConfig = {
        cellType: RAForecastCellType.FORECAST_SHORT,
        cellContent: '-2'
      }
      testRecord.cvg = new RAForecastChartCell(testCVG);
      urChartRecord.push(testRecord);
    }
    return urChartRecord;
  }

  getUserTypeFromViewAs(viewAs: string): RAUserType {
    switch (viewAs) {
      case ViewAsOption.ADMIN:
        return RAUserType.ADMIN;
      case ViewAsOption.PILOT:
        return RAUserType.PILOT;
      default:
        return RAUserType.PILOT;
    }
  }
}
