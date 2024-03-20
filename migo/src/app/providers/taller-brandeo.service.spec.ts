import { TestBed } from '@angular/core/testing';

import { TallerBrandeoService } from './taller-brandeo.service';

describe('TallerBrandeoService', () => {
  let service: TallerBrandeoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TallerBrandeoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
