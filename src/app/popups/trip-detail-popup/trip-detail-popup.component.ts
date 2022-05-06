import { Component, Injectable, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { SessionItem, TripItem } from 'src/app/components/current-draft-session-list/models/current-draft-session-list';
import { PopupInputValue } from 'src/app/components/draggable-popup/draggable-popup.component';
import { PopupService } from 'src/app/services/popup.service';


// Define Input Values
@Injectable()
export class TripDetailData implements PopupInputValue {
  id: number;
  content: TripItem;
}

@Component({
  selector: 'app-trip-detail-popup',
  templateUrl: './trip-detail-popup.component.html',
  styleUrls: ['./trip-detail-popup.component.scss']
})
export class TripDetailPopupComponent implements OnInit {

  id: number;
  data: BehaviorSubject<any>;
  
  tripId: string;

  constructor(private inputData: TripDetailData, private popupService: PopupService) { 
  }

  ngOnInit(): void {
    this.id = this.inputData.id;
    this.tripId = this.inputData.content.id;
    // Bind to related returnData in PopupService 
    this.data = this.popupService.getPopupData(this.id).value
  }

  onApply(event: MouseEvent) {
    console.log('applied!');
    const testTripItem = new TripItem();
    testTripItem.id = '231';
    testTripItem.date = '';
    testTripItem.info = '';
    testTripItem.status = '';
    this.popupService.createPopup(TripDetailPopupComponent, {x: event.pageX, y: event.pageY}, TripDetailData, {content: testTripItem}, true);
    // Update return data and emit Event    
    // this.data.next('Applied!!')
    this.popupService.popupEvent$.emit({eventName: 'trip_detail_applied'});
  }

  onCancel() {
    this.popupService.popupEvent$.emit({eventName: 'trip_detail_cancelled', context: this.id});
    console.log('cancelled!')
  }

}
