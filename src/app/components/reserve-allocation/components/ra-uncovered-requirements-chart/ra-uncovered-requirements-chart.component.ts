import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RAURChartUIParam, URChartRecord, URChartRecordUI } from './ra-ur-chart.model';
import { RAData } from '../../models/ra-data';
import { MatTableDataSource } from '@angular/material/table';
import { RATypeOfRequirement } from '../../constants/ra-general-constants';

@Component({
  selector: 'crew-nav-ra-uncovered-requirements-chart',
  templateUrl: './ra-uncovered-requirements-chart.component.html',
  styleUrls: ['./ra-uncovered-requirements-chart.component.scss']
})
export class RaUncoveredRequirementsChartComponent implements OnInit, OnDestroy {

  @Input('raData') raData$: BehaviorSubject<RAData>;

  readonly uiParams$ = new BehaviorSubject<RAURChartUIParam | null>(null);
  
  screenY: number;

  subscriptions = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.screenY = screen.height;
    const raDataSub = this.raData$.subscribe(raData => {
      if (!raData) {
        return;
      }
      this.initUIParams(raData);
    });
    this.subscriptions.add(raDataSub);
  }

  initUIParams(raData: RAData): void {
    const initUIParams = new RAURChartUIParam();
    initUIParams.urChartData = new MatTableDataSource(this.setChartRecordUIOption(raData.uncoveredRequirementsRecords));
    this.initChart(initUIParams);
    this.uiParams$.next(initUIParams);
  }

  initChart(uiParam: RAURChartUIParam): void {
    uiParam.urChartHeaderColumns = [
      'requirement',
      'date',
      'days',
      'rsvPrd',
      'typeOfRequirement',
      'cvg'
    ]
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  urChartTrackBy = () => {}

  setChartRecordUIOption(urChartRecord: URChartRecord[]): URChartRecordUI[] {
    const urChartRecordUI: URChartRecordUI[] = [];
    urChartRecord.forEach(record => {
      const uiChartRecord = new URChartRecordUI(record);
      uiChartRecord.typeOfRequirementType = this.getChartType(uiChartRecord.typeOfRequirement);
      uiChartRecord.cellClass = this.setRowBackgroundColor(uiChartRecord.typeOfRequirementType, uiChartRecord.cellClass);
      urChartRecordUI.push(uiChartRecord);
    });
    return urChartRecordUI;
  }

  getChartType(typeOfRequirement: string): RATypeOfRequirement | null {
    switch (typeOfRequirement) {
      case 'Open Time Trip':
        return RATypeOfRequirement.OPEN_TIME;
      case 'Projected Open Time':
        return RATypeOfRequirement.PROJECTED_OPEN_TIME;
      case 'Forecast Trip':
        return RATypeOfRequirement.FORECAST_TRIP;
      default:
        return null;
    }
  }

  setRowBackgroundColor(requirementType: RATypeOfRequirement, cellClass: string[]): string[] {
    if (!cellClass){
      cellClass = [];
    }
    switch (requirementType) {
      case RATypeOfRequirement.OPEN_TIME:
        cellClass.push('ra-ur-opentime');
        break;
      case RATypeOfRequirement.FORECAST_TRIP:
        cellClass.push('ra-ur-forecast-trip');
        break;
      case RATypeOfRequirement.PROJECTED_OPEN_TIME:
        cellClass.push('ra-ur-projected-opentime');
        break;
    }
    return cellClass;
  }

}
