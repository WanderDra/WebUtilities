import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { RAData } from '../../reserve-allocation.model';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RAForecastCellType, RAUserType } from '../../constants/ra-general-constants';
import { RAForecastCoverageChartUIParam } from './ra-fc-chart.model';
import { ViewAsOption } from '../ra-search-panel/ra-search-panel.model';
import { MatTableDataSource } from '@angular/material/table';
import { RAForecastChartCell } from '../../models/ra-forecast-cell';

@Component({
  selector: 'crew-nav-ra-forecast-coverage-chart',
  templateUrl: './ra-forecast-coverage-chart.component.html',
  styleUrls: ['./ra-forecast-coverage-chart.component.scss']
})
export class RaForecastCoverageChartComponent implements OnInit, OnDestroy {

  @Input('raData') raData$: BehaviorSubject<RAData>;

  raUserType = RAUserType;

  uiParams$ = new BehaviorSubject<RAForecastCoverageChartUIParam | null>(null);

  subscriptions = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  initData(): void {
    const updateRaDataSub = this.raData$.subscribe(
      raData => {
        if (!raData) {
          return;
        }
        this.initUIData(raData);
      }
    );
    this.subscriptions.add(updateRaDataSub);
  }

  initUIData(raData: RAData): void {
    const uiInitData = new RAForecastCoverageChartUIParam();
    this.initLegends(uiInitData);
    uiInitData.chartUserType = this.getChartUserType(raData);
    uiInitData.fcChartData = new MatTableDataSource(raData.forecastCoverageUIData);
    this.initChartColumn(uiInitData, raData);
    this.uiParams$.next(uiInitData);
  }

  initLegends(uiParams: RAForecastCoverageChartUIParam): void {
    // Admin
    const rcLegends: RAForecastChartCell[] = [];
    rcLegends.push(new RAForecastChartCell({
      cellType: RAForecastCellType.ONLY_FORECAST,
      cellContent: '#'
    }));
    rcLegends.push(new RAForecastChartCell({
      cellType: RAForecastCellType.OPENTIME_COUNT_INCLUDED,
      hideContent: true
    }));
    rcLegends.push(new RAForecastChartCell({
      cellType: RAForecastCellType.OPENTIME_COUNT_OVER_FORECAST,
      hideContent: true
    }));
    uiParams.requirementCountLegends = rcLegends;
    const cdLegends: RAForecastChartCell[] = [];
    cdLegends.push(new RAForecastChartCell({
      cellType: RAForecastCellType.FORECAST_EXCEED,
      hideContent: true
    }));
    cdLegends.push(new RAForecastChartCell({
      cellType: RAForecastCellType.FORECAST_EQUAL,
      hideContent: true
    }));
    cdLegends.push(new RAForecastChartCell({
      cellType: RAForecastCellType.FORECAST_SHORT,
      hideContent: true
    }));
    uiParams.coverageDifferencesLegends = cdLegends;
    // Pilot
    const pilotLegends: RAForecastChartCell[] = [];
    pilotLegends.push(new RAForecastChartCell({
      cellType: RAForecastCellType.NO_FORECAST_REQUIREMENT,
      hideContent: true
    }));
    pilotLegends.push(new RAForecastChartCell({
      cellType: RAForecastCellType.FORECAST_EXCEED,
      hideContent: true
    }));
    pilotLegends.push(new RAForecastChartCell({
      cellType: RAForecastCellType.FORECAST_SHORT,
      hideContent: true
    }));
    pilotLegends.push(new RAForecastChartCell({
      cellType: RAForecastCellType.FORECAST_EQUAL,
      hideContent: true
    }));
    uiParams.pilotLegends = pilotLegends;
  }

  initChartColumn(uiData: RAForecastCoverageChartUIParam, raData: RAData): void{ 
    const initHeaderColumn = [
      'date',
      'rsvPrd',
      'tripLengthHeader'
    ]
    const initTripDateColumn = []
    for (let i = 1; i <= raData.maxTripLength; ++i) {
      initTripDateColumn.push('count' + i);
    }
    const initCellColumns = [
      'date',
      'rsvPrd',
      ...initTripDateColumn
    ]
    uiData.fcChartHeaderColumns = initHeaderColumn;
    uiData.fcChartDateHeaderColumns = initTripDateColumn;
    uiData.fcChartCellColumns = initCellColumns;
  }

  fcChartTrackBy = () => {

  }

  getChartUserType(raData: RAData): RAUserType {
    switch (raData.userType) {
      case RAUserType.ADMIN:
        switch (raData.searchCriteria.view_as) {
          case ViewAsOption.ADMIN:
            return RAUserType.ADMIN;
          case ViewAsOption.PILOT:
            return RAUserType.PILOT;
          default:
            return RAUserType.PILOT;
        }
        break;
      case RAUserType.PILOT:
        return RAUserType.PILOT;
      default:
        return RAUserType.PILOT;
    }
  }
}

