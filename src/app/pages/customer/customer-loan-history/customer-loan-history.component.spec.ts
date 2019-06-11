import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoanHistoryComponent } from './customer-loan-history.component';

describe('CustomerLoanHistoryComponent', () => {
  let component: CustomerLoanHistoryComponent;
  let fixture: ComponentFixture<CustomerLoanHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLoanHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLoanHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
