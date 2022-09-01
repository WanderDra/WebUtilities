import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdConfirmTripAcceptanceDialogComponent } from './pd-confirm-trip-acceptance-dialog.component';

describe('PdConfirmTripAcceptanceDialogComponent', () => {
  let component: PdConfirmTripAcceptanceDialogComponent;
  let fixture: ComponentFixture<PdConfirmTripAcceptanceDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdConfirmTripAcceptanceDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdConfirmTripAcceptanceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
