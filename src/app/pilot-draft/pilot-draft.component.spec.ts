import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotDraftComponent } from './pilot-draft.component';

describe('PilotDraftComponent', () => {
  let component: PilotDraftComponent;
  let fixture: ComponentFixture<PilotDraftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PilotDraftComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PilotDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
