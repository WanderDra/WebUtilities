import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'crew-nav-autocomplete-input-demo',
  templateUrl: './autocomplete-input-demo.component.html',
  styleUrls: ['./autocomplete-input-demo.component.scss']
})
export class AutocompleteInputDemoComponent implements OnInit {

  testOptions = ['', 'test1', 'test2', '123', 'MEM', 'OAK'];
  testSelect = '';
  testControl = new FormControl('MEM', [Validators.required]);
  testErrorsMap = new Map<string, string>();

  constructor() { }

  ngOnInit(): void {
    this.initTestErrorMap();
  }

  initTestErrorMap(): void {
    this.testErrorsMap.set(Validators.required.name, 'This field is required.')
  }

  onTestFieldSelect(option): void {
    this.testSelect = option;
  }


}
