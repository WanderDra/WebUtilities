import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaUncoveredRequirementsChartComponent } from './ra-uncovered-requirements-chart.component';

describe('RaUncoveredRequirementsChartComponent', () => {
  let component: RaUncoveredRequirementsChartComponent;
  let fixture: ComponentFixture<RaUncoveredRequirementsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaUncoveredRequirementsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaUncoveredRequirementsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
