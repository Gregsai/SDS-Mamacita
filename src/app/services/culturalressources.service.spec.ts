import { TestBed } from '@angular/core/testing';

import { CulturalressourcesService } from './culturalressources.service';

describe('CulturalressourcesService', () => {
  let service: CulturalressourcesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CulturalressourcesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
