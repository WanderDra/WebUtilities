import { TestBed } from '@angular/core/testing';

import { SpringService } from './spring-service.service';

describe('SpringServiceService', () => {
  let service: SpringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
