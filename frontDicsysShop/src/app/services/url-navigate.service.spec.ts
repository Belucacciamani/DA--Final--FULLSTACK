import { TestBed } from '@angular/core/testing';

import { UrlNavigateService } from './url-navigate.service';

describe('UrlNavigateService', () => {
  let service: UrlNavigateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UrlNavigateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
