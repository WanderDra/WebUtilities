import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtModalWindowContainerComponent } from './tt-modal-window-container.component';

describe('TtModalWindowViewComponent', () => {
  let component: TtModalWindowContainerComponent;
  let fixture: ComponentFixture<TtModalWindowContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TtModalWindowContainerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TtModalWindowContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
