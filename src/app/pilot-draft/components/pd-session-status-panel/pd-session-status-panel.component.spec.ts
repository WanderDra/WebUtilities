import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdSessionStatusPanelComponent } from './pd-session-status-panel.component';

describe('PdSessionStatusPanelComponent', () => {
  let component: PdSessionStatusPanelComponent;
  let fixture: ComponentFixture<PdSessionStatusPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdSessionStatusPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdSessionStatusPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
