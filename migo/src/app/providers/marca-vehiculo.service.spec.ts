import { TestBed } from '@angular/core/testing';

import { MarcaVehiculoService } from './marca-vehiculo.service';

describe('MarcaVehiculoService', () => {
  let service: MarcaVehiculoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarcaVehiculoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
