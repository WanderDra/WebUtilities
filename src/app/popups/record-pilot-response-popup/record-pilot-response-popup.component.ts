import { Component, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionItem, TripItem } from 'src/app/components/current-draft-session-list/models/current-draft-session-list';
import { PopupInputValue } from 'src/app/components/draggable-popup/draggable-popup.component';
import { SessionResultItem, TripLegality } from 'src/app/components/session-result-list/models/session-result';
import { PopupService } from 'src/app/services/popup.service';

@Injectable()
export class RecordResponseInput implements PopupInputValue {
  id: number;
  content: SessionResultItem;
}

export class RecordResponseData {
  sessionId: number;
  base: string;
  eqNbr: string;
  seat: string;
  crewName: string;
  empId: number;
  tripLegalities: TripLegality[]
}

@Component({
  selector: 'app-record-pilot-response-popup',
  templateUrl: './record-pilot-response-popup.component.html',
  styleUrls: ['./record-pilot-response-popup.component.scss']
})
export class RecordPilotResponsePopupComponent implements OnInit {

  id: number;
  data: BehaviorSubject<RecordResponseData>;

  responses = ['Trip Accepted', 'Trip Declined'];

  constructor(
    private inputData: RecordResponseInput,
    private popupService: PopupService
    ) {
    this.id = this.inputData.id;
    // Bind to related returnData in PopupService 
    this.data = this.popupService.getPopupData(this.id);
  }

  ngOnInit(): void {
    this.data.next(this.loadTestData(this.inputData.content));
  }

  onApply(): void {
    this.popupService.popupEvent$.emit({eventName: 'close_popup', context: this.id});
  }

  onCancel(): void {
    this.popupService.popupEvent$.emit({eventName: 'close_popup', context: this.id});
  }

  onTripNbrClick(session: SessionItem): void {

  }

  loadTestData(sessionResultItem: SessionResultItem){
    const data = new RecordResponseData();
    data.sessionId = 123456;
    data.base = 'MEM';
    data.crewName = 'Tester'
    data.empId = 1234567890;
    data.seat = 'CAP';
    data.eqNbr = '67';
    data.tripLegalities = sessionResultItem.tripLegalities;
    console.log(sessionResultItem.tripLegalities);
    
    return data;
  }

}
