import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SessionListFilterSearchCriteria } from './models/session-list-filter';
import { SessionListFilterService } from './services/session-list-filter.service';

@Component({
  selector: 'app-session-list-filter',
  templateUrl: './session-list-filter.component.html',
  styleUrls: ['./session-list-filter.component.scss']
})
export class SessionListFilterComponent implements OnInit, OnDestroy {

  isFilterExpanded = false;
  
  searchCriteria: SessionListFilterSearchCriteria = new SessionListFilterSearchCriteria();
  getFilterSearchCriteriaSub: Subscription;

  filterForm: FormGroup;

  constructor(
    private sessionListFilterService: SessionListFilterService,
    private fb: FormBuilder
  ) { 
    this.filterForm = this.fb.group({
      base: [''],
      eqNbr: [''],
      seat: [''],
      tripNbr: [''],
      tripDate: ['']
    });
  }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.getFilterSearchCriteriaSub.unsubscribe();
  }

  initData(): void {
    this.loadSearchCriteria();
  }

  loadSearchCriteria(): void {
    this.getFilterSearchCriteriaSub = this.sessionListFilterService.getSessionListFilterSearchCriteria().subscribe(
      (response: SessionListFilterSearchCriteria) => {
        this.searchCriteria = response;
      }
    )
  }

  onExpandFilterClick(): void {
    this.isFilterExpanded = !this.isFilterExpanded;
  }

}
