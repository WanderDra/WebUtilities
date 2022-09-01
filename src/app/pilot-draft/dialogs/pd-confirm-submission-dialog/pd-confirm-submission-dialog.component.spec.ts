import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdConfirmSubmissionDialogComponent } from './pd-confirm-submission-dialog.component';

describe('PdConfirmSubmissionDialogComponent', () => {
  let component: PdConfirmSubmissionDialogComponent;
  let fixture: ComponentFixture<PdConfirmSubmissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdConfirmSubmissionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdConfirmSubmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
