import { TestBed } from '@angular/core/testing';

import { NftServiceService } from './nft-service.service';

describe('NftServiceService', () => {
  let service: NftServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NftServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
