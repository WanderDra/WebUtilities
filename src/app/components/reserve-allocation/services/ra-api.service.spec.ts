import { TestBed } from '@angular/core/testing';

import { RaAPIService } from './ra-api.service';

describe('RaApiService', () => {
  let service: RaAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RaAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
