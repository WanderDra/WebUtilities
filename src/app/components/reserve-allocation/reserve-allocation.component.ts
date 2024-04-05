import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, Subscription } from 'rxjs';
import { ISearchCriteriaConfigs, ISearchCriteriaForm } from './components/ra-search-panel/ra-search-panel.interfaces';
import { RaAPIService } from './services/ra-api.service';
import { RA_MAX_TRIP_LENGTH, RACellType, RAUserType } from './constants/ra-general-constants';
import { retry } from 'rxjs/operators';
import { ForecastCoverageData } from './models/ra-forecast-coverage';
import { FCChartRecord } from './components/ra-forecast-coverage-chart/ra-fc-chart.model';
import * as moment from 'moment';
import { IRACellConfig, IRAConfig } from './interfaces/ra-config.interfaces';
import { RAChartCell } from './models/ra-forecast-cell';
import { ViewAsOption } from './components/ra-search-panel/ra-search-panel.model';
import { RAData } from './models/ra-data';
import { UncoveredRequirementsData } from './models/ra-uncovered-requirements';
import { URChartRecord } from './components/ra-uncovered-requirements-chart/ra-ur-chart.model';
import { ReservePilotCalendarData } from './models/ra-reserve-pilot-calendar';
import { RPCChartCell, RPCChartRecord, Trip } from './components/ra-reserve-pilot-calendar/ra-rpc-model';

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
        data.uncoveredRequirementsRecords = this.generateURChartRecords(response.uncoveredRequirements);
        data.reservePilotCalendarRecords = this.generateRPCChartRecords(response.reservePilotCalendar);
        data.rpcBidMonthEndDates = this.generateBidMonthEndDates();
        data.rpcStartDate = moment().add(-10, 'day').toISOString();
        data.rpcEndDate = moment().add(30, 'day').toISOString();
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
      const testCells: RAChartCell[] = [];
      const testCells2: RAChartCell[] = [];
      for (let j = 0; j < i; j++) {
        testCells.push(null)
      }
      for (let k = 14 - i; k >= 0; k--) {
        testCells2.push(null);
      }
      Object.values(RACellType).forEach((value, i) => {
        if (i < 12 || i > 18) {
          return
        }
        const testCellConfig: IRACellConfig = {
          cellType: value as RACellType,
          cellContent: 'X',
          hideContent: value == RACellType.FORECAST_EQUAL
        }
        testCells.push(new RAChartCell(testCellConfig));
        testCells2.push(new RAChartCell(testCellConfig));
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
        cellType: RACellType.FORECAST_SHORT,
        cellContent: '-2'
      }
      testRecord.cvg = new RAChartCell(testCVG);
      urChartRecord.push(testRecord);
    }
    return urChartRecord;
  }

  generateRPCChartRecords(rpcData: ReservePilotCalendarData): RPCChartRecord[] {
    const rpcRecords: RPCChartRecord[] = [];
    for (let i = 0; i < 20; ++i) {
      const testRecord = new RPCChartRecord();
      testRecord.pilotId = '00000' + i;
      testRecord.cells = [];
      for (let d = 0; d < 40; ++d) {
        const emptyDay = new RPCChartCell();
        const emptyCell = new RAChartCell({
          cellType: RACellType.NO_TRIP_ASSIGNMENT,
          cellContent: ''
        });
        emptyDay.cell = emptyCell;
        const trip = new Trip();
        trip.length = (d + i) % 5;
        trip.tripNbr = '' + i;
        trip.tripType = 'RA';
        emptyDay.trip = trip;
        
        const openTripDay = new RPCChartCell(); 
        const openTimeTripCell = new RAChartCell({
          cellType: RACellType.OPENTIME_TRIP,
          cellContent: trip.tripNbr
        });
        openTripDay.cell = openTimeTripCell;
        openTripDay.trip = trip;

        const projectedOpenTripDay = new RPCChartCell();
        const projectedOpenTripCell = new RAChartCell({
          cellType: RACellType.PROJECTED_OPEN_TRIP,
          cellContent: 'RA'
        });
        projectedOpenTripDay.cell = projectedOpenTripCell;
        projectedOpenTripDay.trip = trip;

        if (d % 3 === 0) {
          testRecord.cells.push(openTripDay);
        } else if (d % 3 === 1) {
          testRecord.cells.push(projectedOpenTripDay);
        } else {
          testRecord.cells.push(emptyDay);
        }
      }
      rpcRecords.push(testRecord);
    }
    return rpcRecords;
  }

  generateBidMonthEndDates(): string[] {
    const bidMonthEndDates: string[] = [];

    const testEndDate = this.setBidMonthEndDate('20240331');
    bidMonthEndDates.push(testEndDate);

    return bidMonthEndDates;
  }

  setBidMonthEndDate(endDate: string): string {
    return moment(endDate).utc().startOf('day').toISOString();
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
