import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Agent }from '../../agent/agent-list/agent';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-customer-loan-add',
  templateUrl: './customer-loan-add.component.html',
  styleUrls: ['./customer-loan-add.component.scss']
})
export class CustomerLoanAddComponent implements OnInit {

  @Input() editUserID: number;
  @Output() callParent = new EventEmitter<string>();
  
  max: Date;
  min:Date;
  agentlist: Agent[] = [];
  loan:any=[];
  agent:any=[];
  loantypelist:any=[];
  submitted:boolean=false;
  constructor(private customerService: CustomerService,private dateService: NbDateService<Date>) { }

  ngOnInit() {
    this.setdefaultvalue();
    this.agentbind();
    this.loantypebind();
  }

  setdefaultvalue(){
    debugger;
    this.min = new Date();
    this.max = this.dateService.addDay(this.min, 45);
    // this.max = new Date();
    // this.min = new Date();
    this.loan.startdate=this.min;
    this.loan.enddate=this.max;
    this.loan.interest='';
    this.loan.interest='';
    this.loan.paymentperiodicity='Weekly';
    this.loan.interestpayat='UpFront';
  }

  agentbind(){
    this.customerService.getAgent().subscribe(result => {
      debugger;
      if (result != null) {
        this.agent.push({id:'',name: "--Select Agent--"});
        result.forEach(element => {
          this.agent.push({id : element.userId , name : element.firstname+' '+element.lastname+' '+element.middlename})
        });
        this.loan.agentid='';
      }
    });
  }

  loantypebind(){
  this.customerService.getloantype().subscribe(result => {
    debugger;
    if (result != null) {
      this.loantypelist.push({id:'',name: "--Select LoanType--"});
      result.forEach(element => {
        this.loantypelist.push({id : element.loantypeid , name : element.loantype})
      });
      this.loan.loantypeid = '';
    }
  });
  }

  assignloan(loan:any,form:any)
  {
    debugger;
    if(form.valid)
    {

    }
  }

  changeenddate(startdate:any){
    debugger;
    this.loan.enddate= this.dateService.addDay(startdate, 45);
  }

  loantermcalculation(){
    debugger;
  }

  cancelForm() {
    this.editUserID = 0;
    this.callParent.emit('List');
  }
}


