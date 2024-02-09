import { TestBed } from '@angular/core/testing';

import { HoraireDeTravailService } from './horaire-de-travail.service';

describe('HoraireDeTravailService', () => {
  let service: HoraireDeTravailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HoraireDeTravailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
