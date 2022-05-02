import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SessionItem } from './models/current-draft-session-list';

@Component({
  selector: 'app-current-draft-session-list',
  templateUrl: './current-draft-session-list.component.html',
  styleUrls: ['./current-draft-session-list.component.scss']
})
export class CurrentDraftSessionListComponent implements OnInit, OnDestroy {

  @Input('data') sessionsData: SessionItem[];

  selectedSession: SessionItem | null = null;

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

  constructor() { 
  }

  ngOnInit(): void {
  }

  sessionClicked(session: SessionItem): void {
    if (!session.selected) {
      this.selectSession(session);
      if (this.selectedSession) {
        this.deselectSession(this.selectedSession);
      }
      this.selectedSession = session;
    } else {
      this.deselectSession(session);
      this.selectedSession = null;
    }
  }

  selectSession(session: SessionItem): void {
    session.selected = true;
    session.class = 'clicked-row';
  }

  deselectSession(session: SessionItem): void {
    session.selected = false;
    session.class = '';
  }

  onTripListExtendClick(session: SessionItem) {
    if (session) {
      session.isViewTripExtended = !session.isViewTripExtended;
    }
  }
  
  onLegalityOutcomesClick(session: SessionItem) {
    if (session) {
      session.isLegalityOutcomesExtended = !session.isLegalityOutcomesExtended;
    }
  }

  onTripIdClick(session: SessionItem): void {
  }

  onTripInfoClick(session: SessionItem): void {
  }

  ngOnDestroy(): void {
  }

}
