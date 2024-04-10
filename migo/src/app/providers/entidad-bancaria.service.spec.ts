import { TestBed } from '@angular/core/testing';

import { EntidadBancariaService } from './entidad-bancaria.service';

describe('EntidadBancariaService', () => {
  let service: EntidadBancariaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntidadBancariaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
