import { Component, Injectable, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { TripDetailData, TripDetailPopupComponent } from 'src/app/popups/trip-detail-popup/trip-detail-popup.component';
import { PopupService } from 'src/app/services/popup.service';

@Component({
  selector: 'app-test-container',
  templateUrl: './test-container.component.html',
  styleUrls: ['./test-container.component.scss']
})
export class TestContainerComponent implements OnInit, OnDestroy {

  isOverlayOn: boolean = false;
  left

  constructor(private popupService: PopupService) {
  }

  ngOnInit(): void {
    // const popup1 = this.popupService.createPopup(
    //   TripDetailPopupComponent, 
    //   { x: window.innerWidth / 2, y: window.innerHeight / 2}, 
    //   TripDetailData, 
    //   {content: 1}
    // );
  }

  ngOnDestroy(): void {
    
  }
}
