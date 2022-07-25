import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { TBBoardInfo, TripCard } from '../../models/tb-board';

@Component({
  selector: 'app-tb-board',
  templateUrl: './tb-board.component.html',
  styleUrls: ['./tb-board.component.scss']
})
export class TbBoardComponent implements OnInit {

  data: TBBoardInfo = new TBBoardInfo();

  constructor() { 
  }

  ngOnInit(): void {
    this.initTestData();
  }

  initTestData(): void {
    this.data.pilotNbr = 123456;
    this.data.sessionRefNumber = 98765432;
    this.data.tripcards = [];
    for (let i = 0; i < 10; ++i) {
      const tc = new TripCard();
      tc.tripId = 1234;
      tc.rankchoice = 0;
      tc.showtime = moment().utc().toISOString();
      tc.endtime = moment().utc().toISOString();
      tc.pay = 1234;
      tc.destinations = 'MEM - IND - BOS(lo) - DEN(lo) - LAX(lo) - ORD(lo) - MEM';
      tc.deadheads = 2;
      this.data.tripcards.push(tc);
    }
  }

  onActionClick(rank: number, tripcard: TripCard): void {
    tripcard.rankchoice = rank;

  }

}
