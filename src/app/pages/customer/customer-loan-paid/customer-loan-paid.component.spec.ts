import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoanPaidComponent } from './customer-loan-paid.component';

describe('CustomerLoanPaidComponent', () => {
  let component: CustomerLoanPaidComponent;
  let fixture: ComponentFixture<CustomerLoanPaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLoanPaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLoanPaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
