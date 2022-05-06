import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DraggablePopupComponent } from './draggable-popup.component';

describe('DraggablePopupComponent', () => {
  let component: DraggablePopupComponent;
  let fixture: ComponentFixture<DraggablePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DraggablePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DraggablePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
