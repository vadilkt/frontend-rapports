import { TestBed } from '@angular/core/testing';

import { BorderauxService } from './borderaux.service';

describe('BorderauxService', () => {
  let service: BorderauxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BorderauxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
