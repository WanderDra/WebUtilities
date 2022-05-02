import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SessionItem, SessionDataResponse, TripItem, TripResponse, LegalityOutcomeResponse, LegalityOutcomeItem } from './models/current-draft-session-list';
import { CDSService } from './services/cds.service';

@Component({
  selector: 'app-current-draft-session-list',
  templateUrl: './current-draft-session-list.component.html',
  styleUrls: ['./current-draft-session-list.component.scss']
})
export class CurrentDraftSessionListComponent implements OnInit, OnDestroy {

  sessionsData: SessionItem[];
  sessionsDataSub: Subscription;

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

  constructor(private cdsService: CDSService) { 
  }

  ngOnInit(): void {
    this.sessionsDataSub = this.cdsService.getSessionData().subscribe(
      (response: SessionDataResponse[]) => {
        this.sessionsData = this.generateSessionData(this.sortSessionDataResponse(response));
      },
      (error: any) => {
      }
    );
  }

  sortSessionDataResponse(response: SessionDataResponse[]): SessionDataResponse[] {
    return response.sort((r1, r2) => {
      if (!r1.startTime) {
        return -1;
      }
      if (r1.startTime.isBefore(r2.startTime)) {
        return 1;
      }
      else {
        return -1;
      }
    })
  }

  generateSessionData(response: SessionDataResponse[]): SessionItem[] {
    return response.map(res => {
      const item = new SessionItem();
      item.sessionId = res.sessionId;
      item.status = res.status;
      item.tripCount = res.tripCount;
      if (res.startTime) {
        item.startTime = res.startTime.format('DDMMMYY') + '\n' + res.startTime.format('HH:mm');
      } else {
        item.startTime = '-';
      }
      item.base = res.base;
      item.eqNbr = res.eqNbr;
      item.seat = res.seat;
      item.tripAssigned = res.tripAssigned;
      item.tripAllMatch = res.tripAllMatch;
      item.tripAssignedPercentage = (res.tripAssigned / res.tripAllMatch * 100).toFixed(0);
      item.pilotAttempted = res.pilotAttempted;
      item.pilotAllMatch = res.pilotAllMatch;
      item.pilotAttemptedPercentage = (res.pilotAttempted / res.pilotAllMatch * 100).toFixed(0);
      item.estTime = res.estTime;
      item.trips = this.generateTripItem(res.trips);
      item.legalities = this.generateLegalityOutcomeItem(res.legalities);
      item.selected = false;
      item.class = '';
      item.isViewTripExtended = false;
      item.isLegalityOutcomesExtended = false;
      return item;
    });
  }

  generateTripItem(tripResponse: TripResponse[]): TripItem[] {
    return tripResponse.map(res => {
      const tripItem = new TripItem();
      tripItem.id = res.id;
      tripItem.date = res.date.format('DDMMM');
      tripItem.info = res.info;
      tripItem.status = res.status;
      return tripItem;
    });
  }

  generateLegalityOutcomeItem(legalityResponse: LegalityOutcomeResponse[]): LegalityOutcomeItem[] {
    return legalityResponse.map(res => {
      const legalityOutcomeItem = new LegalityOutcomeResponse();
      legalityOutcomeItem.id = res.id;
      legalityOutcomeItem.percentage = res.percentage;
      legalityOutcomeItem.amount = res.amount;
      legalityOutcomeItem.info = res.info;
      return legalityOutcomeItem;
    });
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
    session.isViewTripExtended = !session.isViewTripExtended;
  }
  
  onLegalityOutcomesClick(session: SessionItem) {
    session.isLegalityOutcomesExtended = !session.isLegalityOutcomesExtended;
  }

  onTripIdClick(session: SessionItem): void {
  }

  onTripInfoClick(session: SessionItem): void {
  }

  ngOnDestroy(): void {
    this.sessionsDataSub.unsubscribe();
  }

}
