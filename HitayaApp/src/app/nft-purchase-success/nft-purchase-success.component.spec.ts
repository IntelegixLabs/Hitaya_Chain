import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NftPurchaseSuccessComponent } from './nft-purchase-success.component';

describe('NftPurchaseSuccessComponent', () => {
  let component: NftPurchaseSuccessComponent;
  let fixture: ComponentFixture<NftPurchaseSuccessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NftPurchaseSuccessComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NftPurchaseSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
