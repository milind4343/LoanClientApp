import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInstalmentHistoryComponent } from './customer-instalment-history.component';

describe('CustomerInstalmentHistoryComponent', () => {
  let component: CustomerInstalmentHistoryComponent;
  let fixture: ComponentFixture<CustomerInstalmentHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInstalmentHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInstalmentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
