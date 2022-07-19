import { TestBed } from '@angular/core/testing';

import { TripboardService } from './tripboard.service';

describe('TripboardService', () => {
  let service: TripboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
