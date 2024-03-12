import { TestBed } from '@angular/core/testing';

import { FormularioAplicacionService } from './formulario-aplicacion.service';

describe('FormularioAplicacionService', () => {
  let service: FormularioAplicacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormularioAplicacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
