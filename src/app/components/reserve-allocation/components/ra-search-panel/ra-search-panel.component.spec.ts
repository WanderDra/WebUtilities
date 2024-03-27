import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaSearchPanelComponent } from './ra-search-panel.component';

describe('RaSearchPanelComponent', () => {
  let component: RaSearchPanelComponent;
  let fixture: ComponentFixture<RaSearchPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaSearchPanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RaSearchPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
