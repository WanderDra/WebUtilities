import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Moment } from 'moment';
import { Subscription } from 'rxjs';
import { SessionListFilterSearchCriteria } from '../session-list-filter/models/session-list-filter';


export class QueryForm {
  constructor() {
    this.inputFields = [];
  }
  createFilterForm(fields: QueryInputField[]): void {
    this.inputFields = fields;
  }
  loadSearchCriteria(criteria: SearchCriteria[]): void {
    criteria.forEach(control => {
      this.inputFields.forEach(field => {
        if (field.controlName === control.controlName) {
          if (control.selections) {
            field.selections = control.selections;
          }
        }
      });
    });
  }
  inputFields: QueryInputField[];
}

export interface SearchCriteria {
  controlName: string,
  selections?: Array<string>
}

export interface QueryInputField {
  controlName: string,
  controlLabel: string,
  type: QueryInputFieldType,
  selections?: Array<string>,
  value?: string | Array<string>
}

export enum QueryInputFieldType {
  STRING_INPUT = 'stringInput',
  MULTI_SELECT_BOX = 'multiSelectBox',
  DATE_PICKER = 'datePicker',
  SEARCH_INPUT = 'searchInput',
  CHECKBOX = 'checkbox',
  DATERANGE_PICKER = 'daterangePicker'
}

@Component({
  selector: 'app-dynamic-query-form',
  templateUrl: './dynamic-query-form.component.html',
  styleUrls: ['./dynamic-query-form.component.scss']
})
export class DynamicQueryFormComponent implements OnInit {

  @Input('inputForm') inputForm: QueryForm = new QueryForm();
  @Output('dirty') isFormDirty = new EventEmitter<boolean>();
  @Output('output')
  formOutput = new EventEmitter<unknown>();

  queryForm: FormGroup;
  formValueChangeSub: Subscription;


  constructor(
    private fb: FormBuilder
  ) { 
  }

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.clearForm();
    this.formValueChangeSub.unsubscribe();
  }

  initData(): void {
    const controllers = this.inputForm.inputFields.reduce((form, field) => {
      switch (field.type) {
        case QueryInputFieldType.MULTI_SELECT_BOX:
          form[field.controlName] = [field.value ? field.value : []];
          break;
        case QueryInputFieldType.DATERANGE_PICKER:
          form[field.controlName + '-start'] = [ field.value ? field.value[0] : ''];
          form[field.controlName + '-end'] = [ field.value ? field.value[1] : ''];
          break;
        default:
          form[field.controlName] = [field.value ? field.value : ''];
      }
      return form;
    }, {});
    this.queryForm = this.fb.group(controllers);
    this.onFormChange();
    this.formValueChangeSub = this.queryForm.valueChanges.subscribe(
      () => {
        this.onFormChange();
      }
    );
  }

  onSubmit(): void{
    const filterValue = { ...this.queryForm.value };
    Object.keys(filterValue).forEach(selectionKey => {
      let selection = filterValue[selectionKey];
      if (selection instanceof Array) {
        filterValue[selectionKey] = selection.filter(option => 
          option !== 'All'
        );
      }
    });
    this.formOutput.emit(filterValue);
  }

  onSelectAllChange(controlName: string, controlValue: Array<string>): void {
    const controller = this.queryForm.controls[controlName];
    if (controller.value instanceof Array) {
      {
        if (controller.value.indexOf('All') !== -1) {
          controller.patchValue(['All', ...controlValue]);
        } else {
          controller.reset();
        }
      }
    }
  }

  onSelectionChange(controlName: string, controlValue: Array<string>,currentSelectionName: string) {
    const controller = this.queryForm.controls[controlName];
    if (controller.value instanceof Array) {
      const isAllSelected = 
        controller.value.indexOf('All') !== -1 ?
        true : false;
      const isCurrentSelected = 
        controller.value.indexOf(currentSelectionName) !== -1 ? 
        true : false;
      if (!isCurrentSelected) {
        if(isAllSelected) {
          controller.patchValue(controller.value.slice(1, controller.value.length));
        }
      } else {
        if (controller.value.length === controlValue.length) {
          controller.patchValue(['All', ...controlValue]);
        }
      }
    }
  }

  clearForm() {
    this.queryForm.reset();
  }

  onFormChange() {
    this.isFormDirty.emit(this.queryForm.dirty);
  }

}
