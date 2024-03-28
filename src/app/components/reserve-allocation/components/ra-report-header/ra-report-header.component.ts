import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import * as moment from 'moment';
import { RAData } from '../../reserve-allocation.model';
import { RA_RSV_PRD_TEST, RA_SIBA_TEST } from '../../constants/ra-test-constants';
import { RAUserType } from '../../constants/ra-general-constants';
import { RAReportHeaderUIParams } from './ra-report-header.model';
import { ViewAsOption } from '../ra-search-panel/ra-search-panel.model';
import { ISearchCriteriaForm } from '../ra-search-panel/ra-search-panel.interfaces';

@Component({
  selector: 'crew-nav-ra-report-header',
  templateUrl: './ra-report-header.component.html',
  styleUrls: ['./ra-report-header.component.scss']
})
export class RaReportHeaderComponent implements OnInit, OnDestroy {

  @Input('raData') raData$: BehaviorSubject<RAData | null>;

  @Input('zulu') isZulu: boolean;

  uiParams: RAReportHeaderUIParams;

  raUserType = RAUserType;

  subscriptions = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initData(): void {
    const configUpdateSub = this.raData$.subscribe(
      data => {
        if (!data) {
          return;
        }
        this.updateUIData(data);
      }
    );
    this.subscriptions.add(configUpdateSub);
  }

  updateUIData(raData: RAData): void {
    this.uiParams = new RAReportHeaderUIParams();
    this.uiParams.base = raData.searchCriteria.base;
    this.uiParams.equipment = raData.searchCriteria.equipment;
    this.uiParams.seat = raData.searchCriteria.seat;
    this.uiParams.bidMonth = raData.searchCriteria.bid_month;
    this.uiParams.bidMonthDisplay = moment(this.uiParams.bidMonth).utc().format('MMMDD');
    if (this.isZulu) {
      this.uiParams.updateTime = moment().utc().format('DDMMMYY HH:mm[Z]');
    } else {
      this.uiParams.updateTime = moment().format('DDMMMYY HH:mm');
    }
    this.uiParams.rsvPrd = raData.searchCriteria.rsv_prd !== RA_RSV_PRD_TEST[0] ? raData.searchCriteria.rsv_prd : null;
    this.uiParams.siba = raData.searchCriteria.siba !== RA_SIBA_TEST[0] ? raData.searchCriteria.siba : null;
    this.uiParams.pilotInfo = raData.currentPilot;
    this.uiParams.uncoveredTripsAmount = raData.uncoveredTripsAmount;
    this.uiParams.uncoveredTripsDays = raData.uncoveredTripsDays;
    this.uiParams.userType = this.setUserType(raData.searchCriteria.view_as);
    const addtionalLineData = this.getIncludedAndExcludedChecks(raData.searchCriteria);
    this.uiParams.includedChecks = addtionalLineData.included;
    this.uiParams.excludedChecks = addtionalLineData.excluded;
  }

  setUserType(viewAs: string): RAUserType {
    switch (viewAs) {
      case ViewAsOption.ADMIN:
        return RAUserType.ADMIN;
      case ViewAsOption.PILOT:
        return RAUserType.PILOT;
      default:
        return null;
    }
  }

  getIncludedAndExcludedChecks(searchCriteria: ISearchCriteriaForm): {included: string, excluded: string} {
    let included: string[] = [];
    let excluded: string[] = [];
    if (searchCriteria.is_forecast) {
      included.push('Forecast');
    } else {
      excluded.push('Forecast');
    }
    if (searchCriteria.is_open_time) {
      included.push('Open Time');
    } else {
      excluded.push('Open Time');
    }
    if (searchCriteria.is_open_time_standbys) {
      included.push('Open Time Standbys');
    } else {
      excluded.push('Open Time Standbys');
    }
    if (searchCriteria.is_projected_open_time) {
      included.push('Projected Open Time');
    } else {
      excluded.push('Projected Open Time');
    }
    return {
      included: included.join(', '),
      excluded: excluded.join(', ')
    }
  } 

}
