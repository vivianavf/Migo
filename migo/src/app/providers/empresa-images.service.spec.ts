import { TestBed } from '@angular/core/testing';

import { EmpresaImagesService } from './empresa-images.service';

describe('EmpresaImagesService', () => {
  let service: EmpresaImagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaImagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
