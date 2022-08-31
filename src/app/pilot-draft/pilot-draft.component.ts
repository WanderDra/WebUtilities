import { Component, OnInit } from '@angular/core';
import { PdSessionStatus } from './models/pd-session-status-panel';

@Component({
  selector: 'app-pilot-draft',
  templateUrl: './pilot-draft.component.html',
  styleUrls: ['./pilot-draft.component.scss']
})
export class PilotDraftComponent implements OnInit {

  sessionStatus: PdSessionStatus;
  SESSION_STATUS = PdSessionStatus;

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.sessionStatus = PdSessionStatus.LEVELING;
  }

}
