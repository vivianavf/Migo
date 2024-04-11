import { TestBed } from '@angular/core/testing';

import { RecorridoRealizadoService } from './recorrido-realizado.service';

describe('RecorridoRealizadoService', () => {
  let service: RecorridoRealizadoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecorridoRealizadoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
