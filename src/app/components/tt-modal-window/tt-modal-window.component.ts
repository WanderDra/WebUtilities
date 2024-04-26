import { Component, OnInit } from '@angular/core';
import { openWindowCenter } from './tt-utils';

@Component({
  selector: 'crew-nav-tt-modal-window',
  templateUrl: './tt-modal-window.component.html',
  styleUrls: ['./tt-modal-window.component.scss']
})
export class TtModalWindowComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onShowClick(): void {
    // window.open('ttap', 'ttap', 'menubar=no,status=no,titlebar=no,toolbar=no,width=250,height=500');
    openWindowCenter('ttap', 'ttap', 270, 500);
  }
}
