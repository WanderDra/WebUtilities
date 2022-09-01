import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { PdConfirmSubmissionDialogComponent } from './dialogs/pd-confirm-submission-dialog/pd-confirm-submission-dialog.component';
import { PdConfirmTripAcceptanceDialogComponent } from './dialogs/pd-confirm-trip-acceptance-dialog/pd-confirm-trip-acceptance-dialog.component';
import { PdSessionStatus, TripCard, TripCardActionStatus } from './models/pd-session-status-panel';
import { PilotDraftService } from './services/pilot-draft.service';

@Component({
  selector: 'app-pilot-draft',
  templateUrl: './pilot-draft.component.html',
  styleUrls: ['./pilot-draft.component.scss']
})
export class PilotDraftComponent implements OnInit, OnDestroy {

  sessionStatus: PdSessionStatus;
  sessionStatusCode = PdSessionStatus;
  tripStatusCode = TripCardActionStatus;
  trips: TripCard[] = [];
  updatedTrips: TripCard[] = [];
  counterInterval: any;

  isPilotAssigned: boolean = false;
  
  //Test
  testSessionStatus = this.sessionStatusCode.LEVELING;
  testTripsStatus = this.tripStatusCode.RANKING;
  testIsPilotAssigned = false;
  testCountdown = 1000;
  //

  constructor(
    private dialog: MatDialog,
    private pdService: PilotDraftService
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    clearInterval(this.counterInterval);
  }

  initData(): void {
    this.loadTestData();
  }

  loadTestData(): void {
    this.sessionStatus = this.testSessionStatus;
    this.isPilotAssigned = this.testIsPilotAssigned;
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
        mocktrip.status = this.testTripsStatus;
        mocktrip.route = testroute;
        mocktrip.showtime = moment();
        mocktrip.countdown = this.testCountdown;
        this.trips.push(mocktrip);
        this.pdService.tripsUpdateEvent$.emit();
      }

      this.startCounter(this.trips);
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

  onTripAccepted(trip: TripCard): void {
    this.openTripAcceptanceDialog(trip);
  }

  onResetAll(): void {
    this.pdService.tripsUpdateEvent$.emit();
  }

  openConfirmSubmissionDialog(trips: TripCard[]): void {
    const dialogRef = this.dialog.open(PdConfirmSubmissionDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      maxHeight: '90%',
      data: {trips: trips},
    });
    dialogRef.afterClosed().subscribe((submit: boolean) => {
      if (submit) {
        this.trips = this.updateTrips(this.updatedTrips);
        // Send Submit Request
        setTimeout(() => {
          this.pdService.tripsUpdateEvent$.emit();
        });
      }
    });
  }

  openTripAcceptanceDialog(trip: TripCard): void {
    const dialogRef = this.dialog.open(PdConfirmTripAcceptanceDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      maxHeight: '90%',
      data: {trips: [trip]},
    });
    dialogRef.afterClosed().subscribe(isAccepted => {
      if (isAccepted) {
      // Send Accept Trip Request
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

  updateTrips(newTrips: TripCard[]): TripCard[] {
    const updatedTrips = newTrips;
    clearInterval(this.counterInterval);
    this.counterInterval = this.startCounter(updatedTrips);
    return updatedTrips;
  }

  startCounter(trips: TripCard[]): void {
    this.counterInterval = setInterval(() => {
      trips.forEach(trip => --trip.countdown);
    }, 1000);
  }

}
