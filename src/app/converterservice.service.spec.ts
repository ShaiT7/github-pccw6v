import { TestBed } from '@angular/core/testing';

import { ConverterserviceService } from './_services/converterservice.service';

describe('ConverterserviceService', () => {
  let service: ConverterserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConverterserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
