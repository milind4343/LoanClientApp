import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { CustomerService } from '../../customer/customer.service';
import { CustomerLoan } from '../../customer/customer-loan';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { LoaderService } from '../../../commonServices/loader.service';

@Component({
  selector: 'ngx-customer-loan-paid',
  templateUrl: './customer-loan-paid.component.html',
  styleUrls: ['./customer-loan-paid.component.scss']
})

export class CustomerLoanPaidComponent implements OnInit {

  @Input() editTxnID: number;
  @Output() callParent = new EventEmitter<string>();

  submitted: boolean = false;
  loan: CustomerLoan = new CustomerLoan();
  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT
  };

  constructor(private customerservice: CustomerService, private toastrService: NbToastrService,
    private loader: LoaderService) 
    { }

  ngOnInit() {
    this.getInstallmentDtl(this.editTxnID);
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
    this.loader.loader = true;
    if(form.valid && this.loan.paidamount <= this.loan.totalunpaidamount && this.loan.paidamount > 0)
    {
      this.customerservice.markinstallmentpaid(this.loan).subscribe(res=>{
        if(res.success){
          this.cancelForm();
          this.loader.loader = false;
          this.toastrService.success('Mark As Paid Successfully !', 'Success', this.config);
        }
        else
        {
          this.loader.loader = false;
          this.toastrService.danger('Something went wrong !', 'Error', this.config);
        }
      });
    }
    else
    {
      this.loader.loader = false;
    }    
  }

  cancelForm(){
    this.editTxnID = 0;
    this.callParent.emit('List');
  }

}
