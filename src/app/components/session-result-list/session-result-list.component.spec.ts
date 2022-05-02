import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionResultListComponent } from './session-result-list.component';

describe('SessionResultListComponent', () => {
  let component: SessionResultListComponent;
  let fixture: ComponentFixture<SessionResultListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SessionResultListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionResultListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
