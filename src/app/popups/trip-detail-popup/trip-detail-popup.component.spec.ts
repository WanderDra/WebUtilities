import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripDetailPopupComponent } from './trip-detail-popup.component';

describe('TripDetailPopupComponent', () => {
  let component: TripDetailPopupComponent;
  let fixture: ComponentFixture<TripDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripDetailPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
