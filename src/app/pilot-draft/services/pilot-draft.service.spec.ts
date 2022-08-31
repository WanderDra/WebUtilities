import { TestBed } from '@angular/core/testing';

import { PilotDraftService } from './pilot-draft.service';

describe('PilotDraftService', () => {
  let service: PilotDraftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PilotDraftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
