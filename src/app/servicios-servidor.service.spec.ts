import { TestBed } from '@angular/core/testing';

import { ServiciosServidorService } from './servicios-servidor.service';

describe('ServiciosServidorService', () => {
  let service: ServiciosServidorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiciosServidorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
