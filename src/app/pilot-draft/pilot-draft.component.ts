import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { PdConfirmSubmissionDialogComponent } from './dialogs/pd-confirm-submission-dialog/pd-confirm-submission-dialog.component';
import { PdSessionStatus, TripCard, TripCardActionStatus } from './models/pd-session-status-panel';
import { PilotDraftService } from './services/pilot-draft.service';

@Component({
  selector: 'app-pilot-draft',
  templateUrl: './pilot-draft.component.html',
  styleUrls: ['./pilot-draft.component.scss']
})
export class PilotDraftComponent implements OnInit {

  sessionStatus: PdSessionStatus;
  sessionStatusCode = PdSessionStatus;
  tripStatusCode = TripCardActionStatus;
  trips: TripCard[] = [];
  updatedTrips: TripCard[] = [];

  isPilotAssigned: boolean = false;

  constructor(
    private dialog: MatDialog,
    private pdService: PilotDraftService
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.sessionStatus = PdSessionStatus.LEVELING;
    this.loadTestData();
  }

  loadTestData(): void {
    const testroute = [
      {base: 'MEM', isDeadhead: false, isLayover: false},
      {base: 'IND', isDeadhead: true, isLayover: false},
      {base: 'BOS', isDeadhead: false, isLayover: true},
      {base: 'ORD', isDeadhead: true, isLayover: false},
      {base: 'DEN', isDeadhead: false, isLayover: true},
      {base: 'LAX', isDeadhead: false, isLayover: false},
      {base: 'MEM', isDeadhead: true, isLayover: false},
    ]
    setTimeout(() => {
      for (let i = 1; i < 4; i++) {
        let mocktrip = new TripCard();
        mocktrip.tripId = i;
        mocktrip.rankSelected = null;
        mocktrip.status = this.tripStatusCode.RANKING;
        mocktrip.route = testroute;
        mocktrip.showtime = moment();
        mocktrip.countdown = 1000;
        this.trips.push(mocktrip);
        this.pdService.tripsUpdateEvent$.emit();
      }
    });
  }

  onSubmitChoiceClick(): void {
    this.pdService.rankSubmitEvent$.emit();
  }

  onRankSubmit(tripRankMap: Map<number, number>): void {
    this.updatedTrips = [];
    this.trips.forEach(trip => {
      let updatedTrip = new TripCard();
      Object.assign(updatedTrip, trip);
      this.updatedTrips.push(updatedTrip);
    });
    this.updatedTrips.forEach(trip => {
      trip.rankSelected = tripRankMap.get(trip.tripId);
    });
    this.updatedTrips = this.getRerankedTrips(this.updatedTrips);
    this.openConfirmSubmissionDialog(this.updatedTrips);
  }

  onResetAll(): void {
    this.pdService.tripsUpdateEvent$.emit();
  }

  openConfirmSubmissionDialog(trips: TripCard[]): void {
    const dialogRef = this.dialog.open(PdConfirmSubmissionDialogComponent, {
      width: '80%',
      maxHeight: '90%',
      data: {trips: trips},
    });
    dialogRef.afterClosed().subscribe((submit: boolean) => {
      if (submit) {
        this.trips = this.updatedTrips;
        // Send Submit Request
        setTimeout(() => {
          this.pdService.tripsUpdateEvent$.emit();
        });
        console.log(trips);
      }
    });
  }

  getRerankedTrips(trips: TripCard[]): TripCard[] {
    trips.sort((a, b) => a.rankSelected - b.rankSelected);
    let index = 1;
    trips.forEach(trip => {
      if (trip.rankSelected !== 0) {
        trip.rankSelected = index;
        ++index;
      }
    });
    return trips;
  }

}
