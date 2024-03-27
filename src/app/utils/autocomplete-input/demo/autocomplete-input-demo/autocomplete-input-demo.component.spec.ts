import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteInputDemoComponent } from './autocomplete-input-demo.component';

describe('AutocompleteInputDemoComponent', () => {
  let component: AutocompleteInputDemoComponent;
  let fixture: ComponentFixture<AutocompleteInputDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteInputDemoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteInputDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
