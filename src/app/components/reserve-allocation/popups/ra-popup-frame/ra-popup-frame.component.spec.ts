import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaPopupFrameComponent } from './ra-popup-frame.component';

describe('RaPopupFrameComponent', () => {
  let component: RaPopupFrameComponent;
  let fixture: ComponentFixture<RaPopupFrameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaPopupFrameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaPopupFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
