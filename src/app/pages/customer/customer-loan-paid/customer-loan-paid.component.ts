import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { CustomerLoan } from '../customer-loan';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'ngx-customer-loan-paid',
  templateUrl: './customer-loan-paid.component.html',
  styleUrls: ['./customer-loan-paid.component.scss']
})
export class CustomerLoanPaidComponent implements OnInit {

  loan: CustomerLoan = new CustomerLoan();
  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT
  };

  constructor(private customerservice: CustomerService, private toastrService: NbToastrService) { }

  ngOnInit() {
    this.getInstallmentDtl(766);
  }

  getInstallmentDtl(txnId: number){    
    this.customerservice.getInstallmentData(txnId).subscribe(res=>{
      if(res!=null){
        console.log(res);
        debugger;
        this.loan = res;
        this.loan.paidamount = res.paidamount === 0 ? null : res.paidamount;
        this.loan.paymentmethodid = res.paymentmethodid === 0 ? null : res.paymentmethodid;
        this.loan.installmentdate = new Date(res.installmentdate);
      }
    },err=>{
      
    });
  }

  markpaid(form:any){
    //console.log(JSON.stringify(data));
    if(form.valid){
      this.customerservice.markinstallmentpaid(this.loan).subscribe(res=>{
        if(res.success){
          this.toastrService.success('Mark As Paid Successfully !', 'Success', this.config);
        }
        else
        {
          this.toastrService.danger('Something went wrong !', 'Error', this.config);
        }
      });
    }
    
  }



}
