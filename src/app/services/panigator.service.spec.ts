import { TestBed } from '@angular/core/testing';

import { PanigatorService } from './panigator.service';

describe('PanigatorService', () => {
  let service: PanigatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PanigatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
