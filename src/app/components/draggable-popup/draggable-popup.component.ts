import { Portal } from '@angular/cdk/portal';
import { AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, Injector, Input, OnInit, QueryList, TemplateRef, Type, ViewChild, ViewChildren } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TripDetailPopupComponent } from 'src/app/popups/trip-detail-popup/trip-detail-popup.component';
import { PopupService } from 'src/app/services/popup.service';

export class PopupDialog {
  id: number;
  component: Type<any>;
  position: {x: number, y: number};
  provider?: Type<any>;
  injector?: any;
  data?: BehaviorSubject<any>;
}

export interface PopupInputValue {
  id: number
}

@Component({
  selector: 'app-draggable-popup',
  templateUrl: './draggable-popup.component.html',
  styleUrls: ['./draggable-popup.component.scss']
})
export class DraggablePopupComponent implements OnInit, AfterViewInit {

  popups: Array<PopupDialog> = [];

  @Input('layer')
  popupLayer: Set<number>;

  constructor(private popupService: PopupService) { }


  ngOnInit(): void {
    this.popupService.popupList$.subscribe(list => {
      this.popups = Array.from(list.values()).filter(popup => this.popupLayer.has(popup.id));
    });
  }

  ngAfterViewInit(): void {
    
  }


}

