import { TestBed } from '@angular/core/testing';

import { DraggableDialogService } from './draggable-dialog.service';

describe('DraggableDialogService', () => {
  let service: DraggableDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DraggableDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
