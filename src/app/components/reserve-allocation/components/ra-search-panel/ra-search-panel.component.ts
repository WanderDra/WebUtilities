import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { RA_DATE_FORMAT, RAUserType } from '../../constants/ra-general-constants';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchCriteriaConfigs, SearchCriteriaControls, SearchCriteriaForm } from './ra-model';
import { RA_BASES_TEST, RA_EQ_TEST, RA_SEAT_TEST, RA_RSV_PRD_TEST, RA_SIBA_TEST, RA_VIEW_AS_TEST } from '../../constants/ra-test-constants';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';

@Component({
  selector: 'crew-nav-ra-search-panel',
  templateUrl: './ra-search-panel.component.html',
  styleUrls: ['./ra-search-panel.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]},
    {provide: MAT_DATE_FORMATS, useValue: RA_DATE_FORMAT},
  ]
})
export class RaSearchPanelComponent implements OnInit, OnDestroy {

  @Input('config') searchCriteriaConfigs$: BehaviorSubject<SearchCriteriaConfigs>; 

  @Output('onSubmit') searchSubmitEvent = new EventEmitter<FormGroup>();

  isSearchExpanded: boolean = true;
  isViewAsAdmin$ = new BehaviorSubject<boolean>(false);

  searchCriteriaForm: FormGroup;

  optionsCache: SearchCriteriaForm;

  selectAllText = (event: MouseEvent) => (event.target as HTMLInputElement).select();
  controlNames = SearchCriteriaControls;
  userType = RAUserType;

  subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initSearchCriteriaConfigs();
    const searchConfigSub = this.searchCriteriaConfigs$.subscribe(
      config => {
        this.initForm(config);
      }
    );
    this.subscriptions.add(searchConfigSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initForm(config: SearchCriteriaConfigs): void {
    this.searchCriteriaForm = this.fb.group({
      [this.controlNames.BID_MONTH]: [moment().utc().toISOString(), [Validators.required]],
      [this.controlNames.BASE]: ['', Validators.required],
      [this.controlNames.EQUIPMENT]: ['', Validators.required],
      [this.controlNames.SEAT]: ['', Validators.required],
      [this.controlNames.RSV_PRD]: [RA_RSV_PRD_TEST[0], Validators.required],
      [this.controlNames.SIBA]: [RA_SIBA_TEST[0], Validators.required]
    })
    // Admin Option Variation
    if (config.userType === RAUserType.ADMIN) {
      this.searchCriteriaForm.addControl(this.controlNames.VIEW_AS, new FormControl(RA_VIEW_AS_TEST[0], [Validators.required]));
      const isViewAdminSub = this.isViewAsAdmin$.subscribe(
        isViewAsAdmin => {
          if (isViewAsAdmin) {
            this.searchCriteriaForm.addControl(
              this.controlNames.OPEN_TIME_CHECK, 
              new FormControl(this.optionsCache[this.controlNames.OPEN_TIME_CHECK] ?? true));
            this.searchCriteriaForm.addControl(
              this.controlNames.OPEN_TIME_STANDBYS_CHECK, 
              new FormControl(this.optionsCache[this.controlNames.OPEN_TIME_STANDBYS_CHECK] ?? true));
            this.searchCriteriaForm.addControl(
              this.controlNames.PROJECTED_OPEN_TIME_CHECK, 
              new FormControl(this.optionsCache[this.controlNames.PROJECTED_OPEN_TIME_CHECK] ?? true));
            this.searchCriteriaForm.addControl(
              this.controlNames.FORECAST_CHECK, 
              new FormControl(this.optionsCache[this.controlNames.FORECAST_CHECK] ?? true));
          } else {
            this.searchCriteriaForm.removeControl(this.controlNames.OPEN_TIME_CHECK);
            this.searchCriteriaForm.removeControl(this.controlNames.OPEN_TIME_STANDBYS_CHECK);
            this.searchCriteriaForm.removeControl(this.controlNames.PROJECTED_OPEN_TIME_CHECK);
            this.searchCriteriaForm.removeControl(this.controlNames.FORECAST_CHECK);
          }
        }
      )
      this.subscriptions.add(isViewAdminSub);
    }
    const searchCriteriaUpdateSub = this.searchCriteriaForm.valueChanges.subscribe(() => {
      this.updateLocalSearchOptionCache();
    });
    this.subscriptions.add(searchCriteriaUpdateSub);
  }

  // Test
  initSearchCriteriaConfigs(): void {
    if (this.searchCriteriaConfigs$) {
      return;
    }
    const searchCriteriaConfigs = new SearchCriteriaConfigs();
    searchCriteriaConfigs.baseOptions = RA_BASES_TEST;
    searchCriteriaConfigs.minBidMonth = moment().utc().toISOString();
    searchCriteriaConfigs.equipmentOptions = RA_EQ_TEST;
    searchCriteriaConfigs.seatOptions = RA_SEAT_TEST;
    searchCriteriaConfigs.rsvPrdOptions = RA_RSV_PRD_TEST;
    searchCriteriaConfigs.sibaOptions = RA_SIBA_TEST;
    searchCriteriaConfigs.userType = RAUserType.ADMIN;
    searchCriteriaConfigs.viewAsOptions = RA_VIEW_AS_TEST
    
    this.searchCriteriaConfigs$ = new BehaviorSubject(searchCriteriaConfigs);
  }

  onRaSearchExpandClick(): void {
    this.isSearchExpanded = !this.isSearchExpanded;
  }

  onSearchCriteriaSubmit(): void {
    if (this.checkSearchFormValidation(this.searchCriteriaForm)) {
      this.searchSubmitEvent.emit(this.searchCriteriaForm);
      console.log(this.searchCriteriaForm);
    }
  }

  onViewAsSelect(option: string): void {
    if (option === this.userType.ADMIN) {
      setTimeout(() => {
        this.isViewAsAdmin$.next(true);
      });
    } else {
      setTimeout(() => {
        this.isViewAsAdmin$.next(false);
      });
    }
  }

  checkSearchFormValidation(searchForm: FormGroup): boolean {
    let isValid = true;
    searchForm.markAllAsTouched();
    Object.values(searchForm.controls).forEach(control => {
      if (control.errors) {
        isValid = false;
      }
    });
    return isValid;
  }

  viewAsOptionMap = (option) => {
    switch (option) {
      case RA_VIEW_AS_TEST[0]:
        return this.userType.ADMIN;
      case RA_VIEW_AS_TEST[1]:
        return this.userType.PILOT;
      default:
        return this.userType.PILOT;
    } 
  }

  updateLocalSearchOptionCache(): void {
    this.optionsCache = { ...this.optionsCache, ...this.searchCriteriaForm.value }
  }

}
