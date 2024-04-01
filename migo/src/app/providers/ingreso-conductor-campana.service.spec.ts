import { TestBed } from '@angular/core/testing';

import { IngresoConductorCampanaService } from './ingreso-conductor-campana.service';

describe('IngresoConductorCampanaService', () => {
  let service: IngresoConductorCampanaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoConductorCampanaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
