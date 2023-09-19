import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgCaptureComponent } from './ng-capture.component';

describe('NgCaptureComponent', () => {
  let component: NgCaptureComponent;
  let fixture: ComponentFixture<NgCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgCaptureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
