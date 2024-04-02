import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaReservePilotCalendarComponent } from './ra-reserve-pilot-calendar.component';

describe('RaReservePilotCalendarComponent', () => {
  let component: RaReservePilotCalendarComponent;
  let fixture: ComponentFixture<RaReservePilotCalendarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaReservePilotCalendarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaReservePilotCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
