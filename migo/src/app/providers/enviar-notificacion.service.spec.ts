import { TestBed } from '@angular/core/testing';

import { EnviarNotificacionService } from './enviar-notificacion.service';

describe('EnviarNotificacionService', () => {
  let service: EnviarNotificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnviarNotificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
