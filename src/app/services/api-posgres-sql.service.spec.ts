import { TestBed } from '@angular/core/testing';

import { ApiPosgresSqlService } from './api-posgres-sql.service';

describe('ApiPosgresSqlService', () => {
  let service: ApiPosgresSqlService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPosgresSqlService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
