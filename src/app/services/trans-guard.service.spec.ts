import { TestBed, inject } from '@angular/core/testing';

import { TransGuardService } from './trans-guard.service';

describe('TransGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransGuardService]
    });
  });

  it('should be created', inject([TransGuardService], (service: TransGuardService) => {
    expect(service).toBeTruthy();
  }));
});
