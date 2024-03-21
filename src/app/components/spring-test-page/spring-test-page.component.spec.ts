import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpringTestPageComponent } from './spring-test-page.component';

describe('SpringTestPageComponent', () => {
  let component: SpringTestPageComponent;
  let fixture: ComponentFixture<SpringTestPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpringTestPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpringTestPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
