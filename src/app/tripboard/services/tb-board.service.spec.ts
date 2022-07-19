import { TestBed } from '@angular/core/testing';

import { TbBoardService } from './tb-board.service';

describe('TbBoardService', () => {
  let service: TbBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TbBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
