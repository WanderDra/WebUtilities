import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { PdMissingRankChoiceDialogComponent } from '../../dialogs/pd-missing-rank-choice-dialog/pd-missing-rank-choice-dialog.component';
import { DestinationInfo, TripCard, TripCardActionStatus } from '../../models/pd-session-status-panel';
import { PilotDraftService } from '../../services/pilot-draft.service';

@Component({
  selector: 'app-pd-trip-board',
  templateUrl: './pd-trip-board.component.html',
  styleUrls: ['./pd-trip-board.component.scss']
})
export class PdTripBoardComponent implements OnInit, OnDestroy {

  @Input('trips') trips: TripCard[];
  @Output('rankChoice') rankChoiceEvent$ = new EventEmitter<Map<number, number>>();
  @Output('tripAccept') tripAcceptEvent$ = new EventEmitter<TripCard>();
  @Output('onRankSelect') rankSelectEvent$ = new EventEmitter<TripCard>();
  
  // routes: DestinationInfo[];
  rankMap = new Map<number, TripCard>();    // rank: TripInfos
  tripRankMap = new Map<number, number>();  // tripId: rank
  tripStatus = TripCardActionStatus;
  invalidTrips = new Set<number>();
  subscriptions: Subscription[] = [];
  curTime = moment();

  constructor(
    private pdService: PilotDraftService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  initData(): void {
    this.subscriptions.push(
      this.pdService.tripsUpdateEvent$.subscribe(
        () => this.loadRankMaps(this.trips)
      )
    );
    this.subscriptions.push(
      this.pdService.rankSubmitEvent$.subscribe(
        () => this.onSubmit()
      )
    );
  }

  loadRankMaps(trips: TripCard[]): void {
    this.rankMap.clear();
    this.tripRankMap.clear();
    let tripsCopy: TripCard[] = [];
    Object.assign(tripsCopy, this.trips);  
    console.log(tripsCopy);
    tripsCopy.forEach((trip, i) => {
      this.rankMap.set(i + 1, null);
    })
    tripsCopy.forEach(trip => {
      this.tripRankMap.set(trip.tripId, trip.rankSelected);
      if (trip.rankSelected) {
        this.rankMap.set(trip.rankSelected, trip);
      }
    });
    this.invalidTrips.clear();
  }

  onRankClick(rankSelected: number, trip: TripCard): void {
    const previousRank = this.tripRankMap.get(trip.tripId);
    if (previousRank) {
      this.rankMap.set(previousRank, null);
    }
    this.tripRankMap.set(trip.tripId, rankSelected);
    if (rankSelected !== 0) {
      this.rankMap.set(rankSelected, trip);
    }
    this.rankSelectEvent$.emit(trip);
  }

  onSubmit(): void {
    const isValid = this.checkRankValidation(this.tripRankMap);
    if (isValid) {
      this.rankChoiceEvent$.emit(this.tripRankMap);
    } else {
      this.openMissingChoiceDialog();
    }
  }

  onTripAcceptClick(trip: TripCard): void {
    this.tripAcceptEvent$.emit(trip);
  }

  checkRankValidation(tripRankMap: Map<number, number>): boolean {
    tripRankMap.forEach((rank, tripId) => {
      if (rank === null) {
        this.invalidTrips.add(tripId);
      } else {
        if (this.invalidTrips.has(tripId)) {
          this.invalidTrips.delete(tripId);
        }
      }
    });
    if (this.invalidTrips.size > 0) {
      return false;
    } else {
      return true;
    }
  }

  openMissingChoiceDialog(): void {
    const dialogRef = this.dialog.open(PdMissingRankChoiceDialogComponent, {
      width: '80%',
      maxWidth: '600px',
      data: {invalidAmount: this.invalidTrips.size},
    });
    dialogRef.afterClosed().subscribe(proceed => {
      if (proceed) {
        this.tripRankMap.forEach((rank, tripId) => {
          if (rank === null) {
            this.tripRankMap.set(tripId, 0);
          }
        });
        this.onSubmit();
      }
    });
  }

}
