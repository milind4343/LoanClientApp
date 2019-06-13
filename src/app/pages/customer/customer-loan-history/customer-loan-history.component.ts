import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PageAccessService } from '../../../commonServices/getpageaccess.service';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'ngx-customer-loan-history',
  templateUrl: './customer-loan-history.component.html',
  styleUrls: ['./customer-loan-history.component.scss']
})
export class CustomerLoanHistoryComponent implements OnInit {
  pageTitle: string = "Assigned Loan List";
  pageView: string = "List";
  editloanID: number;
  clientname:string;
  editUserID:number;
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  pageaccesscontrol:any={};
  loanhstorylist:any=[];
  constructor(private pageAccessService: PageAccessService, private customerservice: CustomerService) { }

  ngOnInit() : void{
    this.pageaccesscontrol = this.pageAccessService.getAccessData(); //used in future to disable add/delete/view button ad per role-rights 
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    this.customerservice.getCustomerLoan(this.editUserID).subscribe(result => {
      debugger;
      this.loanhstorylist = result;
      this.dtTrigger.next();
    },
      error => {
        console.log(error);
        //this.handleError.handleExcption(error);
    });
  }

  installmentlist(customerLoanId,customername,customerloanid){
      debugger;
      this.pageView = "LoanInstallment";
      this.pageTitle = "Loan History";
      this.editloanID = customerLoanId;
      this.clientname=customername +' (LoanId : '+ customerloanid+')';
  }

  callParent(event: any) {
    debugger;
    this.pageView = event;
    this.pageTitle = 'Assigned Loan List';
    this.dtTrigger = new Subject();
    this.ngOnInit();
  }
}
