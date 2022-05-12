import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TripItem } from '../current-draft-session-list/models/current-draft-session-list';
import { QueryForm, QueryInputFieldType } from '../dynamic-query-form/dynamic-query-form.component';

@Component({
  selector: 'app-add-new-draft-session',
  templateUrl: './add-new-draft-session.component.html',
  styleUrls: ['./add-new-draft-session.component.scss']
})
export class AddNewDraftSessionComponent implements OnInit {

  trips: TripItem[] = [];
  selectedTrips: TripItem[] = [];
  pilotForDraftOptions: FormGroup;

  isSearchExpanded: boolean = false;
  isQueryFormDirty: boolean = false;

  searchForm: QueryForm = new QueryForm();
  

  constructor(private fb: FormBuilder) {
    this.pilotForDraftOptions = this.fb.group({
      'proximity_bypass': false,
      'siba': false,
      'auto_start_dialing': true
    })
  }

  ngOnInit(): void {
    this.initSearchForm();
  }

  initSearchForm(): void {
    this.searchForm.inputFields = [
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
        controlName: "showtimeRange", 
        controlLabel: "Showtime Range", 
        type: QueryInputFieldType.DATERANGE_PICKER,
      },
      { 
        controlName: "shift", 
        controlLabel: "Shift", 
        type: QueryInputFieldType.MULTI_SELECT_BOX,
        selections: ['A']
      },
      { 
        controlName: "type", 
        controlLabel: "Type", 
        type: QueryInputFieldType.MULTI_SELECT_BOX,
        selections: ['ASBY']
      },
      { 
        controlName: "includeLock", 
        controlLabel: "Include Lock", 
        type: QueryInputFieldType.CHECKBOX,
      },
    ]
  }

  onTripNbrClick(tripNbr: number): void {
    
  }

  onExpandSearchClick(): void {
    this.isSearchExpanded = !this.isSearchExpanded;
  }

  onClearSearchClick(): void {

  }

  onFormSubmit(searchCriteria: unknown): void {

  }

  checkQueryFormDirty(isDirty: boolean): void {

  }

}
