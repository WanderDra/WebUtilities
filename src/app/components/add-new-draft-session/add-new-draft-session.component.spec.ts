import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewDraftSessionComponent } from './add-new-draft-session.component';

describe('AddNewDraftSessionComponent', () => {
  let component: AddNewDraftSessionComponent;
  let fixture: ComponentFixture<AddNewDraftSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewDraftSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewDraftSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
