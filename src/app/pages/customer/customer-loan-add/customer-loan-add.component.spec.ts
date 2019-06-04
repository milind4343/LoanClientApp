import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerLoanAddComponent } from './customer-loan-add.component';

describe('CustomerLoanAddComponent', () => {
  let component: CustomerLoanAddComponent;
  let fixture: ComponentFixture<CustomerLoanAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerLoanAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerLoanAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
