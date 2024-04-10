import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { IRACoverageDetail } from './ra-cd.interface';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RACoverageDetailPilot, RACoverageDetailTrip } from './ra-cd.model';
import { RATypeOfRequirement } from '../../constants/ra-general-constants';

@Component({
  selector: 'crew-nav-ra-coverage-detail-popup',
  templateUrl: './ra-coverage-detail-popup.component.html',
  styleUrls: ['./ra-coverage-detail-popup.component.scss']
})
export class RaCoverageDetailPopupComponent implements OnInit, OnDestroy {

  @Input('data') detailData: IRACoverageDetail;

  totalTrips: number;
  opentimeTrips: number;
  openStandbyTrips: number;
  projectedTrips: number;
  forecast: number;
  totalForecast: number;

  trips: RACoverageDetailTrip[] = [];
  pilots: RACoverageDetailPilot[] = [];

  breakdownStr: string = '';

  raTripType = RATypeOfRequirement;

  subscriptions = new Subscription();

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();    
  }

  initData(): void {
      this.totalTrips = this.detailData.totalTrips;
      this.opentimeTrips = this.detailData.openTimeTrips;
      this.openStandbyTrips = this.detailData.openStandbyTrips;
      this.projectedTrips = this.detailData.projectedTrips;
      this.forecast = this.detailData.forecast;
      this.totalForecast = this.detailData.totalForecast;
      this.breakdownStr = this.getBreakdownStr();
      this.trips = this.detailData.trips;
      this.pilots = this.detailData.pilots;
  }

  getBreakdownStr(): string {
    const breakdownContent: string[] = [];
    if (this.opentimeTrips) {
      breakdownContent.push(this.opentimeTrips + ' Open Time');
    }
    if (this.openStandbyTrips) {
      breakdownContent.push(this.openStandbyTrips + ' Open Stand By');
    }
    if (this.projectedTrips) {
      breakdownContent.push(this.projectedTrips + ' Projected');
    }
    if (this.forecast) {
      breakdownContent.push(this.forecast + `(of ${this.totalForecast})` + ' Forecast');
    }
    return breakdownContent.join(' + ');
  }

}
