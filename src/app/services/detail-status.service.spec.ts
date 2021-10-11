import { TestBed } from '@angular/core/testing';

import { DetailStatusService } from './detail-status.service';

describe('DetailStatusService', () => {
  let service: DetailStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
