import { TestBed } from '@angular/core/testing';

import { SoketsService } from './sokets.service';

describe('SoketsService', () => {
  let service: SoketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SoketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
