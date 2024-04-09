import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaCoverageDetailPopupComponent } from './ra-coverage-detail-popup.component';

describe('RaCoverageDetailPopupComponent', () => {
  let component: RaCoverageDetailPopupComponent;
  let fixture: ComponentFixture<RaCoverageDetailPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaCoverageDetailPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaCoverageDetailPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
