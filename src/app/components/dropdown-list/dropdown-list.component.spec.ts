import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownListComponent } from './dropdown-list.component';

describe('DropdownListComponent', () => {
  let component: DropdownListComponent;
  let fixture: ComponentFixture<DropdownListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DropdownListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
