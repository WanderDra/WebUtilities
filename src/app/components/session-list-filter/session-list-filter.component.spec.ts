import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionListFilterComponent } from './session-list-filter.component';

describe('SessionListFilterComponent', () => {
  let component: SessionListFilterComponent;
  let fixture: ComponentFixture<SessionListFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionListFilterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
