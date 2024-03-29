import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as moment from 'moment';
import { Moment } from 'moment';
import { RA_DATE_FORMAT, RAUserType } from '../../constants/ra-general-constants';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SearchCriteriaControls, ViewAsOption } from './ra-search-panel.model';
import { RA_BASES_TEST, RA_EQ_TEST, RA_SEAT_TEST, RA_RSV_PRD_TEST, RA_SIBA_TEST, RA_VIEW_AS_TEST } from '../../constants/ra-test-constants';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { ISearchCriteriaConfigs, ISearchCriteriaForm } from './ra-search-panel.interfaces';

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

  @Input('config') searchCriteriaConfigs$: BehaviorSubject<ISearchCriteriaConfigs>; 

  @Output('onSubmit') searchSubmitEvent = new EventEmitter<ISearchCriteriaForm>();

  isSearchExpanded: boolean = true;
  isViewAsAdmin$ = new BehaviorSubject<boolean>(false);

  searchCriteriaForm: FormGroup;

  optionsCache: ISearchCriteriaForm;

  selectAllText = (event: MouseEvent) => (event.target as HTMLInputElement).select();
  controlNames = SearchCriteriaControls;
  userType = RAUserType;

  subscriptions = new Subscription();

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
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

  initForm(config: ISearchCriteriaConfigs): void {
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

  onRaSearchExpandClick(): void {
    this.isSearchExpanded = !this.isSearchExpanded;
  }

  onSearchCriteriaSubmit(): void {
    if (this.checkSearchFormValidation(this.searchCriteriaForm)) {
      this.searchSubmitEvent.emit(this.searchCriteriaForm.value);
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
      case ViewAsOption.ADMIN:
        return this.userType.ADMIN;
      case ViewAsOption.PILOT:
        return this.userType.PILOT;
      default:
        return this.userType.PILOT;
    } 
  }

  updateLocalSearchOptionCache(): void {
    this.optionsCache = { ...this.optionsCache, ...this.searchCriteriaForm.value }
  }

}
