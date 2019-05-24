import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';

@Component({
  selector: 'ngx-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  customerlist: Customer[] = [];
  dtTrigger: any = new Subject();

  constructor(private customerservice: CustomerService){
    
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    this.customerservice.getCustomers().subscribe(result =>{
      debugger;
      this.customerlist = result;
      this.dtTrigger.next();

    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

}
