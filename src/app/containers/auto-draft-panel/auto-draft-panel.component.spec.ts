import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDraftPanelComponent } from './auto-draft-panel.component';

describe('AutoDraftPanelComponent', () => {
  let component: AutoDraftPanelComponent;
  let fixture: ComponentFixture<AutoDraftPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutoDraftPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoDraftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
