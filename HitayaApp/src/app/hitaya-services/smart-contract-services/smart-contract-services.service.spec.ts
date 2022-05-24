import { TestBed } from '@angular/core/testing';

import { SmartContractServicesService } from './smart-contract-services.service';

describe('SmartContractServicesService', () => {
  let service: SmartContractServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmartContractServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
