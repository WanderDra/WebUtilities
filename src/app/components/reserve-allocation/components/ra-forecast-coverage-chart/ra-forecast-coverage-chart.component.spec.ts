import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaForecastCoverageChartComponent } from './ra-forecast-coverage-chart.component';

describe('RaForecastCoverageChartComponent', () => {
  let component: RaForecastCoverageChartComponent;
  let fixture: ComponentFixture<RaForecastCoverageChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaForecastCoverageChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaForecastCoverageChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
