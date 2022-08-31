import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdTripBoardComponent } from './pd-trip-board.component';

describe('PdTripBoardComponent', () => {
  let component: PdTripBoardComponent;
  let fixture: ComponentFixture<PdTripBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdTripBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdTripBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
