import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import {  FormGroup } from '@angular/forms';
import { DynamicQueryFormComponent, QueryForm } from '../dynamic-query-form/dynamic-query-form.component';

@Component({
  selector: 'app-session-list-filter',
  templateUrl: './session-list-filter.component.html',
  styleUrls: ['./session-list-filter.component.scss']
})
export class SessionListFilterComponent implements OnInit, OnDestroy {

  isFilterExpanded: boolean = false;
  isClearable: boolean = false;
  isQueryFormDirty: boolean = false;

  @Input('inputForm') inputForm: QueryForm = new QueryForm();
  @Input('expandLabel') expandLabel: string = '';

  @Output('output')
  filterOutput = new EventEmitter<unknown>();

  @ViewChild('queryForm') queryForm: DynamicQueryFormComponent;

  constructor() { 
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  onExpandFilterClick(): void {
    this.isFilterExpanded = !this.isFilterExpanded;
    if (!this.isFilterExpanded) {
      this.isClearable = false;
    } else {
      this.isClearable = true;
    }
  }

  onCleanAllFilterClick(): void{
    this.queryForm.clearForm();
  }

  checkQueryFormDirty(isFormDirty: boolean) {
    this.isQueryFormDirty = isFormDirty;
  }

  formSubmit(output: unknown) {
    this.filterOutput.emit(output);
  }

}
