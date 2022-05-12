import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordPilotResponsePopupComponent } from './record-pilot-response-popup.component';

describe('RecordPilotResponsePopupComponent', () => {
  let component: RecordPilotResponsePopupComponent;
  let fixture: ComponentFixture<RecordPilotResponsePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecordPilotResponsePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordPilotResponsePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
