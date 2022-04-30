import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionData, SessionDataResponse } from './models/current-draft-session-list';
import { CDSService } from './services/cds.service';

@Component({
  selector: 'app-current-draft-session-list',
  templateUrl: './current-draft-session-list.component.html',
  styleUrls: ['./current-draft-session-list.component.scss']
})
export class CurrentDraftSessionListComponent implements OnInit, OnDestroy {

  sessionsData: SessionData[];
  sessionsDataSub: Subscription;

  columnsToDisplay = [
    'status',
    'session',
    'tripCount',
    'startTime',
    'base',
    'seat',
    'eqNbr',
    'tripProgress',
    'pilotProgress',
    'estTime',
    'viewBtn'
  ];

  constructor(private cdsService: CDSService) { 
  }

  ngOnInit(): void {
    this.sessionsDataSub = this.cdsService.getSessionData().subscribe(
      (response: SessionDataResponse[]) => {
        this.sessionsData = this.generateSessionData(response);
      },
      (error: any) => {
      }
    );
  }

  generateSessionData(response: SessionDataResponse[]): SessionData[] {
    return response.map(res => {
      const data = new SessionData();
      data.sessionId = res.sessionId;
      data.status = res.status;
      data.tripCount = res.tripCount;
      data.startTime = res.startTime.format('DDMMMYY') + '\n' + res.startTime.format('HH:mm');
      data.base = res.base;
      data.eqNbr = res.eqNbr;
      data.seat = res.seat;
      data.tripAssigned = res.tripAssigned;
      data.tripAllMatch = res.tripAllMatch;
      data.tripAssignedPercentage = (res.tripAssigned / res.tripAllMatch).toFixed(1);
      data.pilotAttempted = res.pilotAttempted;
      data.pilotAllMatch = res.pilotAllMatch;
      data.pilotAttemptedPercentage = (res.pilotAttempted / res.pilotAllMatch).toFixed(1);
      data.estTime = res.estTime;
      data.trips = res.trips;
      data.legalities = res.legalities;
      data.selected = false;
      return data;
    });
  }

  selectSession(session: SessionData): void {
    session.selected = true;
    console.log(session.sessionId);
    
  }

  ngOnDestroy(): void {
    this.sessionsDataSub.unsubscribe();
  }

}
