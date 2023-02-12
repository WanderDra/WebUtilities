import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsbPermissionDialogComponent } from './usb-permission-dialog.component';

describe('UsbPermissionDialogComponent', () => {
  let component: UsbPermissionDialogComponent;
  let fixture: ComponentFixture<UsbPermissionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsbPermissionDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsbPermissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
