import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import * as moment from 'moment';
import { PdSessionStatus } from '../../models/pd-session-status-panel';

@Component({
  selector: 'app-pd-session-status-panel',
  templateUrl: './pd-session-status-panel.component.html',
  styleUrls: ['./pd-session-status-panel.component.scss']
})
export class PdSessionStatusPanelComponent implements OnInit {

  @Input("sessionStatus") sessionStatus: PdSessionStatus;
  @Input("isAssigned") isAssigned: boolean = false;
  @Output("resetAll") resetAllEvent$ = new EventEmitter();
  curTime = moment();
  
  status = PdSessionStatus;

  constructor() { }

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
  }

  onResetAllClick(): void {
    this.resetAllEvent$.emit();
  }

}
