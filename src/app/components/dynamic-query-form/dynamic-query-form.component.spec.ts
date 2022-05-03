import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicQueryFormComponent } from './dynamic-query-form.component';

describe('DynamicQueryFormComponent', () => {
  let component: DynamicQueryFormComponent;
  let fixture: ComponentFixture<DynamicQueryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicQueryFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicQueryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
