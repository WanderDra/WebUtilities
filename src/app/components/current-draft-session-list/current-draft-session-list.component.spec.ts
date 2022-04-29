import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDraftSessionListComponent } from './current-draft-session-list.component';

describe('CurrentDraftSessionListComponent', () => {
  let component: CurrentDraftSessionListComponent;
  let fixture: ComponentFixture<CurrentDraftSessionListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CurrentDraftSessionListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDraftSessionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
