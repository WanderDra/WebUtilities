import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripboardComponent } from './tripboard.component';

describe('TripboardComponent', () => {
  let component: TripboardComponent;
  let fixture: ComponentFixture<TripboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TripboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
