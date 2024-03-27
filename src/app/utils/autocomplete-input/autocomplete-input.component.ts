import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';

@Component({
  selector: 'crew-nav-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss']
})
export class AutocompleteInputComponent implements OnInit, OnDestroy {

  @Input('options') options: string[] | any[];

  @Input('placeholder') placeholder?: string | undefined;

  @Input('optionDisplay') optionDisplayMap?: (option: any) => string = (option) => {
    try {
      if (typeof(option) === 'string') {
        return option;
      } else {
        throw 'Option has to be "string" if no optionDisplayMap defined.';
      }
    } catch (error) {
      console.log(option);
      console.error(error);
      throw error;
    }
  };
  
  @Input('optionValueMap') optionValueMap?: (option: any) => any = (option) => option;

  @Input('sort') compareFn?: (a: any, b: any) => number | undefined;

  @Input('defaultValue') defaultValue: any | undefined = '';

  @Input('label') label: string;

  @Input('inputControl') inputControl = new FormControl();

  /** If using formControlName, formGroup from parent has to be passed as well */
  @Input('forFormGroup') formGroup: FormGroup | undefined;

  /** If using formControlName, formGroup from parent has to be passed as well */
  @Input('inputControlName') inputControlName: string | undefined;

  /** Error validations to input control. It is the same to set errors directly to input form control.*/
  @Input('errors') errors?: ValidationErrors | undefined;

  /** A map for mapping an error to its customized error message. */
  @Input('errorMsgsMap') errorMsgMap = new Map<string, string>();

  @Input('hideErrorMsg') hideErrorMsg: boolean = false;

  @Output('onSelect') onSelectEvent = new EventEmitter<any>();

  optionsDisplayList: any[];

  displayToOptionMap = new Map<string, any>();

  previousSelect: string | null = null;

  errorMsgs: string[] = [];

  subscriptions = new Subscription();

  private 
  constructor() { }

  ngOnInit(): void {
    this.initInputField();
  }

  initInputField(): void {
    this.initErrors();
    if (this.formGroup && this.inputControlName) {
      this.inputControl = (this.formGroup.get(this.inputControlName) as FormControl);
    }
    // Map display name to actual option if display is different. It doesn't make sense to have duplicated display options.
    try {
      this.options.forEach(option => {
        if (this.displayToOptionMap.has(this.optionDisplayMap(option))) {
          throw 'Duplicated display options are not allowed. Make sure options in dropdown are always unique.';
        }
        this.displayToOptionMap.set(this.optionDisplayMap(option), option);
      });
    } catch (error) {
      console.error(error);
    }
    const inputChangeSub = this.inputControl.valueChanges.pipe(startWith('')).subscribe(
      (input: string) => {
        this.optionsDisplayList = this.options.filter(option => 
          this.optionDisplayMap(option).toLowerCase().includes(input ? '' + input.toLowerCase() : '')).sort(this.compareFn);
      }
    );
    if (this.defaultValue) {
      this.inputControl.setValue(this.defaultValue);
    }
    this.updateSelectValue();
    this.subscriptions.add(inputChangeSub);
  }

  initErrors(): void {
    if (this.errors) {
      this.inputControl.setErrors(this.errors);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onFocusOut(): void {
    this.updateSelectValue();
  }

  onOptionSelect(): void {
    this.updateSelectValue();
  }

  onInputClick(event: MouseEvent): void {
    (event.target as HTMLInputElement).select();
  }

  updateErrorMsg(): void {
    if (this.hideErrorMsg) {
      return;
    }
    this.errorMsgs = [];
    if (this.inputControl.errors) {
      Object.keys(this.inputControl.errors).forEach(key => {
        if (this.errorMsgMap && this.errorMsgMap.has(key)) {
          this.errorMsgs.push(this.errorMsgMap.get(key))
        } else {
          this.errorMsgs.push(key);
        }
      })
    }
  }

  updateSelectValue(): void {
    const firstMatchDisplayOption = this.optionsDisplayList[0];
    let firstMatchOption: any = null;
    if (firstMatchDisplayOption !== undefined && this.isInputUpdate(this.inputControl.value)) {
      firstMatchOption = this.displayToOptionMap.get(firstMatchDisplayOption);
      this.previousSelect = firstMatchDisplayOption;
      this.inputControl.setValue(firstMatchDisplayOption);
      this.onSelectEvent.emit(this.optionValueMap(firstMatchOption));
    }
    this.optionsDisplayList = [...this.options.map(option => this.optionDisplayMap(option))].sort(this.compareFn);
    this.updateErrorMsg();
  }

  isInputUpdate(input: string): boolean {
    return input !== this.previousSelect;
  }

}
