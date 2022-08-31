import { Component, OnInit } from '@angular/core';
import { DestinationInfo, TripCard, TripCardActionStatus } from '../../models/pd-session-status-panel';

@Component({
  selector: 'app-pd-trip-board',
  templateUrl: './pd-trip-board.component.html',
  styleUrls: ['./pd-trip-board.component.scss']
})
export class PdTripBoardComponent implements OnInit {
  
  routes: DestinationInfo[];
  rankMap = new Map<number, TripCard>();
  trips: TripCard[] = [];
  tripStatus = TripCardActionStatus;

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.routes = [
      {base: 'MEM', isDeadhead: false, isLayover: false},
      {base: 'IND', isDeadhead: true, isLayover: false},
      {base: 'BOS', isDeadhead: false, isLayover: true},
      {base: 'ORD', isDeadhead: true, isLayover: false},
      {base: 'DEN', isDeadhead: false, isLayover: true},
      {base: 'LAX', isDeadhead: false, isLayover: false},
      {base: 'MEM', isDeadhead: true, isLayover: false},
    ]
    setTimeout(() => {
      for (let i = 1; i < 3; i++) {
        let mocktrip = new TripCard();
        mocktrip.tripId = i;
        mocktrip.rankSelected = null;
        mocktrip.status = this.tripStatus.RANKING;
        this.rankMap.set(i, mocktrip);
        this.trips.push(mocktrip);
      }
    });

  }

  onRankClick(rankSelected: number, trip: TripCard): void {
    
  }

  checkRankValidation(rank: number): void {

  }

}
