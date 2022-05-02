import { Component, Input, OnInit } from '@angular/core';
import { SessionResultItem } from './models/session-result';

@Component({
  selector: 'app-session-result-list',
  templateUrl: './session-result-list.component.html',
  styleUrls: ['./session-result-list.component.scss']
})
export class SessionResultListComponent implements OnInit {

  @Input('data') sessionResults: SessionResultItem[];

  columnsToDisplay = [
    'callMark',
    'seniorityNbr',
    'pilotName',
    'empId',
    'tripsOffered',
    'contactOutcomes',
    'responseBtn'
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onTripLegalityExtendClick(sessionResult: SessionResultItem): void {
    if (sessionResult){
      sessionResult.isTripLegalityExtended = !sessionResult.isTripLegalityExtended;
    }
  }

  onLegalityOutcomeExtendClick(sessionResult: SessionResultItem): void {
    if (sessionResult) {
      sessionResult.isContactOutcomesExtended = !sessionResult.isContactOutcomesExtended;
    }
  }

  onTripNbrClick(sessionResult: SessionResultItem): void {

  }

}
