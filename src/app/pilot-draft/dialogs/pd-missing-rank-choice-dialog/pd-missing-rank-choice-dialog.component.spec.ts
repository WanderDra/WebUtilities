import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdMissingRankChoiceDialogComponent } from './pd-missing-rank-choice-dialog.component';

describe('PdMissingRankChoiceDialogComponent', () => {
  let component: PdMissingRankChoiceDialogComponent;
  let fixture: ComponentFixture<PdMissingRankChoiceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdMissingRankChoiceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdMissingRankChoiceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
