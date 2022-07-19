import { Component, OnInit } from '@angular/core';
import { TripCard } from '../../models/tb-board';

@Component({
  selector: 'app-tb-board',
  templateUrl: './tb-board.component.html',
  styleUrls: ['./tb-board.component.scss']
})
export class TbBoardComponent implements OnInit {

  tripcards: TripCard[] = [];
  
  constructor() { }

  ngOnInit(): void {
    this.initTestData();
  }

  initTestData(): void {
    for (let i = 0; i < 10; ++i) {
      this.tripcards.push(new TripCard());
    }
  }

}
