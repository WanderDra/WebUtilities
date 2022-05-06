import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SessionItem, TripItem } from './models/current-draft-session-list';

@Component({
  selector: 'app-current-draft-session-list',
  templateUrl: './current-draft-session-list.component.html',
  styleUrls: ['./current-draft-session-list.component.scss']
})
export class CurrentDraftSessionListComponent implements OnInit, OnDestroy {

  @Input('data') sessionsData: SessionItem[];

  @Output('onTripIdClicked') tripIdClickedEvent = new EventEmitter<{event: MouseEvent, trip: TripItem}>();

  @Output('sessionSelected') sessionSelectedEvent = new EventEmitter<SessionItem | null>();

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

  constructor(private elRef :ElementRef) { 
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
    this.sessionSelectedEvent.emit(this.selectedSession);
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

  onTripIdClick(event: {event: MouseEvent, trip: TripItem}): void {
    this.tripIdClickedEvent.emit(event);
  }

  onTripInfoClick(session: SessionItem): void {
  }

  ngOnDestroy(): void {
  }

}
