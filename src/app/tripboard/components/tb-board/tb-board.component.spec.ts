import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TbBoardComponent } from './tb-board.component';

describe('TbBoardComponent', () => {
  let component: TbBoardComponent;
  let fixture: ComponentFixture<TbBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TbBoardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TbBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
