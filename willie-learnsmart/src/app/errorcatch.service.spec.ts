import { TestBed } from '@angular/core/testing';

import { ErrorcatchService } from './errorcatch.service';

describe('ErrorcatchService', () => {
  let service: ErrorcatchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorcatchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
