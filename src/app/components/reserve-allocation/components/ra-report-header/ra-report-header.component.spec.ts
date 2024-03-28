import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaReportHeaderComponent } from './ra-report-header.component';

describe('RaReportHeaderComponent', () => {
  let component: RaReportHeaderComponent;
  let fixture: ComponentFixture<RaReportHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaReportHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaReportHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
