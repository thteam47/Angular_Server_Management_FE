import { TestBed } from '@angular/core/testing';

import { ErrorToastrService } from './error-toastr.service';

describe('ErrorToastrService', () => {
  let service: ErrorToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorToastrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
