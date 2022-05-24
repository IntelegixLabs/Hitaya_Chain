import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoanCheckoutComponent } from './loan-checkout.component';

describe('LoanCheckoutComponent', () => {
  let component: LoanCheckoutComponent;
  let fixture: ComponentFixture<LoanCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoanCheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoanCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
