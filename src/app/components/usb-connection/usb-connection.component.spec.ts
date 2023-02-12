import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsbConnectionComponent } from './usb-connection.component';

describe('UsbConnectionComponent', () => {
  let component: UsbConnectionComponent;
  let fixture: ComponentFixture<UsbConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsbConnectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsbConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
