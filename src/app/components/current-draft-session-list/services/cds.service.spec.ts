import { TestBed } from '@angular/core/testing';

import { CDSService } from './cds.service';

describe('CDSService', () => {
  let service: CDSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CDSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
