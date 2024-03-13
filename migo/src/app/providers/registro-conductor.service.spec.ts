import { TestBed } from '@angular/core/testing';

import { RegistroConductorService } from './registro-conductor.service';

describe('RegistroConductorService', () => {
  let service: RegistroConductorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistroConductorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
