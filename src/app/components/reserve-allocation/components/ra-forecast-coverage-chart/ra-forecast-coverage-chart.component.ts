import { Component, ElementRef, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RACellType, RAUserType } from '../../constants/ra-general-constants';
import { RAForecastCoverageChartUIParam } from './ra-fc-chart.model';
import { ViewAsOption } from '../ra-search-panel/ra-search-panel.model';
import { MatTableDataSource } from '@angular/material/table';
import { RAChartCell, RAForecastCoverageCell } from '../../models/ra-forecast-cell';
import { RAData } from '../../models/ra-data';

@Component({
  selector: 'crew-nav-ra-forecast-coverage-chart',
  templateUrl: './ra-forecast-coverage-chart.component.html',
  styleUrls: ['./ra-forecast-coverage-chart.component.scss']
})
export class RaForecastCoverageChartComponent implements OnInit, OnDestroy {

  @Input('raData') raData$: BehaviorSubject<RAData>;

  raUserType = RAUserType;

  readonly uiParams$ = new BehaviorSubject<RAForecastCoverageChartUIParam | null>(null);

  private _previousSelectedCell: RAForecastCoverageCell | null = null;

  subscriptions = new Subscription();

  @ViewChild('popupRef') popupRef: ElementRef;

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
    uiInitData.fcChartData = new MatTableDataSource(raData.forecastCoverageRecords);
    this.initChartColumn(uiInitData, raData);
    this.uiParams$.next(uiInitData);
  }

  initLegends(uiParams: RAForecastCoverageChartUIParam): void {
    // Admin
    const rcLegends: RAChartCell[] = [];
    rcLegends.push(new RAChartCell({
      cellType: RACellType.ONLY_FORECAST,
      cellContent: '#'
    }));
    rcLegends.push(new RAChartCell({
      cellType: RACellType.OPENTIME_COUNT_INCLUDED,
      hideContent: true
    }));
    rcLegends.push(new RAChartCell({
      cellType: RACellType.OPENTIME_COUNT_OVER_FORECAST,
      hideContent: true
    }));
    uiParams.requirementCountLegends = rcLegends;
    const cdLegends: RAChartCell[] = [];
    cdLegends.push(new RAChartCell({
      cellType: RACellType.FORECAST_EXCEED,
      hideContent: true
    }));
    cdLegends.push(new RAChartCell({
      cellType: RACellType.FORECAST_EQUAL,
      hideContent: true
    }));
    cdLegends.push(new RAChartCell({
      cellType: RACellType.FORECAST_SHORT,
      hideContent: true
    }));
    uiParams.coverageDifferencesLegends = cdLegends;
    // Pilot
    const pilotLegends: RAChartCell[] = [];
    pilotLegends.push(new RAChartCell({
      cellType: RACellType.NO_FORECAST_REQUIREMENT,
      hideContent: true
    }));
    pilotLegends.push(new RAChartCell({
      cellType: RACellType.FORECAST_EXCEED,
      hideContent: true
    }));
    pilotLegends.push(new RAChartCell({
      cellType: RACellType.FORECAST_SHORT,
      hideContent: true
    }));
    pilotLegends.push(new RAChartCell({
      cellType: RACellType.FORECAST_EQUAL,
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
  
  onCellClick(cell: RAForecastCoverageCell): void {
    if (!cell) {
      return;
    }
    if (this.uiParams$.value.chartUserType === this.raUserType.ADMIN) {
      setTimeout(() => {
        cell.showDetailsPopup = true;
        this._previousSelectedCell = cell;
      });
    }
  }

  @HostListener('document:click', ['$event'])
  public documentClick(event: Event): void {
    if (!this.popupRef?.nativeElement?.contains(event.target)) {
      if (this._previousSelectedCell) {
        this._previousSelectedCell.showDetailsPopup = false;
      }
    }
  }
}

