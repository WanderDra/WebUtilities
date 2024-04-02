import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RAURChartUIParam } from './ra-ur-chart.model';

@Component({
  selector: 'crew-nav-ra-uncovered-requirements-chart',
  templateUrl: './ra-uncovered-requirements-chart.component.html',
  styleUrls: ['./ra-uncovered-requirements-chart.component.scss']
})
export class RaUncoveredRequirementsChartComponent implements OnInit {

  uiParams$ = new BehaviorSubject<RAURChartUIParam | null>(null);

  constructor() { }

  ngOnInit(): void {
  }

  urChartTrackBy = () => {}

}
