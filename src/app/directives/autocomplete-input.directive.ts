import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[crewNavAutocompleteInput]'
})
export class AutocompleteInputDirective {

  constructor(
    private element: ElementRef
  ) { }
  
  

}
