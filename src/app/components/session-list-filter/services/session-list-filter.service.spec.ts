import { TestBed } from '@angular/core/testing';

import { SessionListFilterService } from './session-list-filter.service';

describe('SessionListFilterService', () => {
  let service: SessionListFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionListFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
