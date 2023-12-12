import { TestBed } from '@angular/core/testing';

import { LearningagreementService } from './learningagreement.service';

describe('LearningagreementService', () => {
  let service: LearningagreementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningagreementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
