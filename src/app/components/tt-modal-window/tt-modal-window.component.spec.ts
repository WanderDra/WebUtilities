import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtModalWindowComponent } from './tt-modal-window.component';

describe('TtModalWindowComponent', () => {
  let component: TtModalWindowComponent;
  let fixture: ComponentFixture<TtModalWindowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtModalWindowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
