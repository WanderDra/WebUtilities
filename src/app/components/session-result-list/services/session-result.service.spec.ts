import { TestBed } from '@angular/core/testing';

import { SessionResultService } from './session-result.service';

describe('SessionResultService', () => {
  let service: SessionResultService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionResultService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
