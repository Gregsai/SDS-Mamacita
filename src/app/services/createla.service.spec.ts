import { TestBed } from '@angular/core/testing';

import { CreatelaService } from './createla.service';

describe('CreatelaService', () => {
  let service: CreatelaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatelaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
