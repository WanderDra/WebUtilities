import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RARPCUIParam, RPCChartRecord } from './ra-rpc-model';
import { RAData } from '../../models/ra-data';
import { RAChartCell } from '../../models/ra-forecast-cell';
import { RACellType } from '../../constants/ra-general-constants';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'crew-nav-ra-reserve-pilot-calendar',
  templateUrl: './ra-reserve-pilot-calendar.component.html',
  styleUrls: ['./ra-reserve-pilot-calendar.component.scss']
})
export class RaReservePilotCalendarComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  @Input('raData') raData$: BehaviorSubject<RAData>;

  readonly uiParams$ = new BehaviorSubject<RARPCUIParam | null>(null);

  rpcTableHeight: number;

  subscriptions = new Subscription();

  @ViewChild('rpcTableRef') rpcTableElement: ElementRef<HTMLDivElement>;
  @ViewChild(MatSort) sort: MatSort;

  private sortingDataAccessor = (record: RPCChartRecord, headers: string) => {
    switch (headers) {
      case 'pilot':
        let weight = 0;
        try {
          weight = Number.parseInt(record.pilotId)
        } catch (e) {
          console.log(e);
        }
        return weight;
      default:
        return 0;
    }
  }

  constructor() { }

  ngOnInit(): void {
    const initDataSub = this.raData$.subscribe(raData => {
      if (!raData) {
        return;
      }
      const uiParams = new RARPCUIParam();
      uiParams.legends = this.initLegends();
      uiParams.rpcChartData = new MatTableDataSource(
        this.processTableData(raData.reservePilotCalendarRecords)
      );
      uiParams.rpcChartData.sortingDataAccessor = this.sortingDataAccessor;
      uiParams.dateHeaderArray = this.getDateHeaderArray(raData.rpcStartDate, raData.rpcEndDate);
      uiParams.rpcChartColumns = this.initChartColumns(uiParams.dateHeaderArray);
      uiParams.bidMonthEndDates = raData.rpcBidMonthEndDates;
      this.uiParams$.next(uiParams);
    });
    this.subscriptions.add(initDataSub);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateRPCTableHeight();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.updateRPCTableHeight();
    this.uiParams$.value.rpcChartData.sort = this.sort;
  }

  initLegends(): RAChartCell[] {
    const legends: RAChartCell[] = [
      new RAChartCell({
        cellType: RACellType.FORECAST_TRIP,
        hideContent: true
      }),
      new RAChartCell({
        cellType: RACellType.OPENTIME_TRIP,
        hideContent: true
      }),
      new RAChartCell({
        cellType: RACellType.PROJECTED_OPEN_TRIP,
        hideContent: true
      }),
      new RAChartCell({
        cellType: RACellType.ASSIGNED_TRIP,
        hideContent: true
      }),
      new RAChartCell({
        cellType: RACellType.NO_TRIP_ASSIGNMENT,
        hideContent: true
      }),
      new RAChartCell({
        cellType: RACellType.PILOT_UNAVAILABLE,
        hideContent: true
      })
    ];
    return legends;
  }

  initChartColumns(daysArray: string[]): string[] {
    const columns = [
      'pilot'
    ]
    daysArray.forEach((day, i) => columns.push('date' + i));
    return columns;
  }

  getDateHeaderArray(startDate: string, endDate: string): string[] {
    const sDate = moment(startDate).utc().startOf('day');
    const eDate = moment(endDate).utc().startOf('day');
    const duration = eDate.diff(sDate, 'day');
    const days: string[] = [];
    for (let i = 0; i < duration; ++i) {
      days.push(moment(sDate).add(i, 'day').toISOString());
    }
    return days;
  }

  rpcChartTrackBy = (index: number, record: RPCChartRecord) => record.pilotId;

  processTableData(rpcChartRecord: RPCChartRecord[]): RPCChartRecord[] {
    // Merge Cells
    rpcChartRecord.forEach(row => {
      row.cells.forEach((cell, i) => {
        if (cell.trip.length > 1 && !cell.mergedByPreviousCell) {
          for (let index = i + 1; index < i + cell.trip.length; ++index) {
            if (row.cells[index]) {
              row.cells[index].mergedByPreviousCell = true;
            }
          }
        }
      })
    });
    return rpcChartRecord;
  }

  updateRPCTableHeight(): void {
    setTimeout(() => {
      this.rpcTableHeight = this.rpcTableElement?.nativeElement.offsetHeight - 2;
    });
  }


}
