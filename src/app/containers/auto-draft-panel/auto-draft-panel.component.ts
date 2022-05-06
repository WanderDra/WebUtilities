import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { Subscription } from 'rxjs';
import { SessionItem, SessionDataResponse, TripResponse, TripItem, LegalityOutcomeResponse, LegalityOutcomeItem } from 'src/app/components/current-draft-session-list/models/current-draft-session-list';
import { CDSService } from 'src/app/components/current-draft-session-list/services/cds.service';
import { QueryForm, QueryInputFieldType, SearchCriteria } from 'src/app/components/dynamic-query-form/dynamic-query-form.component';
import { SessionListFilterSearchCriteria } from 'src/app/components/session-list-filter/models/session-list-filter';
import { SessionListFilterService } from 'src/app/components/session-list-filter/services/session-list-filter.service';
import { SessionResultItem, SessionResultResponse, TripLegalityResponse, TripLegality, ContactOutcomeResponse, ContactOutcome } from 'src/app/components/session-result-list/models/session-result';
import { SessionResultService } from 'src/app/components/session-result-list/services/session-result.service';
import { SessionResultListComponent } from 'src/app/components/session-result-list/session-result-list.component';
import { TripDetailData, TripDetailPopupComponent } from 'src/app/popups/trip-detail-popup/trip-detail-popup.component';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-auto-draft-panel',
  templateUrl: './auto-draft-panel.component.html',
  styleUrls: ['./auto-draft-panel.component.scss']
})
export class AutoDraftPanelComponent implements OnInit {

  sessionsDataSub: Subscription;
  sessionResultDataSub: Subscription;
  sessionsData: SessionItem[];
  sessionResultData: SessionResultItem[];
  sessionFilterForm: QueryForm = new QueryForm();
  sessionResultFilterForm: QueryForm = new QueryForm();
  getSessionFilterCriteriaSub: Subscription;

  SessionResultId: string = '0123456';
  filterResultLabel = 'FILTER SESSION ' + this.SessionResultId + ' RESULTS';

  sessionFilterOutput: unknown;
  sessionFilterResultOutput: unknown;

  popupOverlays: Map<number, Set<number>>;

  rightPanelContent: TemplateRef<any> | null;
  @ViewChild('sessionResult') sessionResultRef: TemplateRef<SessionResultListComponent>;
  popupOverlaySub: Subscription;
  popupEventSub: Subscription;

  constructor(
    private cdsService: CDSService,
    private sessionResultService: SessionResultService,
    private sessionListFilterService: SessionListFilterService,
    private popupService: PopupService
  ) { }


  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.sessionsDataSub.unsubscribe();
    this.sessionResultDataSub.unsubscribe();
    this.getSessionFilterCriteriaSub.unsubscribe();
    this.popupOverlaySub.unsubscribe();
    this.popupEventSub.unsubscribe();
  }

  initData(): void {
    this.loadSessionListData();
    this.loadSessionResultData();
    this.createSessionFilterForm();
    this.createSessionResultFilterForm();
    this.initPopupOverlay();
  }

  loadSessionListData(): void {
    this.sessionsDataSub = this.cdsService.getSessionData().subscribe(
      (response: SessionDataResponse[]) => {
        this.sessionsData = this.generateSessionDataItem(this.sortSessionDataResponse(response));
      },
      (error: any) => {
      }
    );
  }

  loadSessionResultData(): void {
    this.sessionResultDataSub = this.sessionResultService.getSessionResult().subscribe(
      (response: SessionResultResponse[]) => {
        this.sessionResultData = this.generateSessionResultDataItem(this.sortSessionResultResponse(response));
      }
    )
  }

  createSessionFilterForm(): void {
    this.sessionFilterForm.filterInputFields = [
      { 
        controlName: "base", 
        controlLabel: "Base", 
        type: QueryInputFieldType.MULTI_SELECT_BOX,
        selections: []
      },
      { 
        controlName: "eqNbr", 
        controlLabel: "Equipment", 
        type: QueryInputFieldType.MULTI_SELECT_BOX,
        selections: []
      },
      { 
        controlName: "seat", 
        controlLabel: "Seat", 
        type: QueryInputFieldType.MULTI_SELECT_BOX,
        selections: []
      },
      { 
        controlName: "tripNbr", 
        controlLabel: "Trip Number", 
        type: QueryInputFieldType.STRING_INPUT,
      },
      { 
        controlName: "tripDate", 
        controlLabel: "Trip Date", 
        type: QueryInputFieldType.DATE_PICKER,
        value: moment().format()
      }
    ]
    this.getSessionFilterCriteriaSub = this.sessionListFilterService.getSessionListFilterSearchCriteria().subscribe(
      (response: SessionListFilterSearchCriteria) => {
        const criteria: Array<SearchCriteria> = [];
        Object.keys(response).forEach(resKey => {
          criteria.push({
            controlName: resKey,
            selections: response[resKey]
          });
        })
        this.sessionFilterForm.loadSearchCriteria(criteria);
      }
    )
  }

  createSessionResultFilterForm(): void {
    this.sessionResultFilterForm.filterInputFields = [
      {
        controlName: "empId",
        controlLabel: "Employee Number or ID",
        type: QueryInputFieldType.SEARCH_INPUT
      }
    ]
  }

  initPopupOverlay(): void {
    // Handle Event From Popups
    this.popupEventSub = this.popupService.popupEvent$.subscribe((event) => {
      switch (event.eventName) {
        case 'trip_detail_applied':
          // console.log(this.popupService.popupList$.value.get(popup2).data.value);
          break;
        case 'trip_detail_cancelled':
          this.popupService.removePopup(event.context);
          break;
      }
    })

    this.popupOverlaySub = this.popupService.popupListStructure$.subscribe(overlays => {
      this.popupOverlays = overlays;
    })
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

  sortSessionResultResponse(response: SessionResultResponse[]): SessionResultResponse[] {
    return response;
  }

  setSessionFilterOutput(output: unknown): void {
    this.sessionFilterOutput = output;
    console.log(this.sessionFilterOutput);
  }

  setSessionResultFilterOutput(output: unknown): void {
    this.sessionFilterResultOutput = output;
    console.log(this.sessionFilterResultOutput);
    
  }

  generateSessionDataItem(response: SessionDataResponse[]): SessionItem[] {
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

  generateSessionResultDataItem(response: SessionResultResponse[]): SessionResultItem[] {
    return response.map(res => {
      const item = new SessionResultItem();
      item.seniorityNbr = res.seniorityNbr;
      item.pilotName = res.pilotName;
      item.empId = res.empId;
      item.tripsOffered = res.tripsOffered === -1 ? 'Pending' : res.tripsOffered + ' Trips';
      item.contactOutcome = res.contactOutcome;
      item.tripLegalities = this.generateTripLegalityItem(res.tripLegalities);
      item.outcomes = this.generateContactOutcomeItem(res.outcomes);
      item.isTripLegalityExtended = false;
      item.isContactOutcomesExtended = false;
      item.isCallAttempting = res.isCallAttempting;
      item.isRecordResponseAvailable = res.isRecordResponseAvailable;
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

  generateTripLegalityItem(tripLegalityResponse: TripLegalityResponse[]): TripLegality[] {
    return tripLegalityResponse.map(res => {
      const tripLegalityItem = new TripLegality();
      tripLegalityItem.tripNbr = res.tripNbr;
      tripLegalityItem.legalityCheckOutcome = res.legalityCheckOutcome;
      // TODO: Update condition
      if (res.legalityCheckOutcome === 'Legality Issues') {
        tripLegalityItem.isLegalityDetailsAvailable = true;
      } else {
        tripLegalityItem.isLegalityDetailsAvailable = false;
      }
      tripLegalityItem.pilotSelection = res.pilotSelection;
      return tripLegalityItem;
    });
  }

  generateContactOutcomeItem(contactOutcomeResponse: ContactOutcomeResponse[]): ContactOutcome[] {
    return contactOutcomeResponse.map(res => {
      const contactOutcomeItem = new ContactOutcome();
      contactOutcomeItem.phoneNbr = 
        res.phoneNbr === 'crs' ? 
          'Inbound CRS' :
          '(' + res.phoneNbr.substring(0, 3) + ') ' + res.phoneNbr.substring(3, 6) + '-' + res.phoneNbr.substring(6);
      contactOutcomeItem.contactOutcome = res.contactOutcome;
      return contactOutcomeItem;
    });
  }

  onSessionListTripIdClick(event: {event: MouseEvent, trip: TripItem}): void {
    const position = { x: event.event.pageX, y: event.event.pageY }
    this.popupService.createPopup(TripDetailPopupComponent, position, TripDetailData, {content: event.trip})
  }

  onSessionSelected(sessionSelected: SessionItem | null): void {
    if (sessionSelected) {
      this.rightPanelContent = this.sessionResultRef;
    }
    else {
      this.rightPanelContent = null;
    }
  }

}
