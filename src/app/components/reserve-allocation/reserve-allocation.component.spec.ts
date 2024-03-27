import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReserveAllocationComponent } from './reserve-allocation.component';

describe('ReserveAllocationComponent', () => {
  let component: ReserveAllocationComponent;
  let fixture: ComponentFixture<ReserveAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReserveAllocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReserveAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
