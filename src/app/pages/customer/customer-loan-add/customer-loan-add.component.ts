import { Component, OnInit, PipeTransform } from '@angular/core';
import { CustomerService } from '../customer.service';
import{Agent}from '../../agent/agent-list/agent';
import { NbDateService } from '@nebular/theme';
import { forEach } from '@angular/router/src/utils/collection';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Component({
  selector: 'ngx-customer-loan-add',
  templateUrl: './customer-loan-add.component.html',
  styleUrls: ['./customer-loan-add.component.scss']
})
export class CustomerLoanAddComponent implements OnInit {
  max: Date;
  min:Date;
  agentlist: Agent[] = [];
  loan:any=[];
  agent:any=[];
  loantypelist:any=[];
  submitted:boolean=false;
  tenure:any=[];
 installmenttenure:any={};
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
    this.loan.paymentperiodicity='Daily';
    this.loan.interestpayat='AtEnd';
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
      this.loan.loantypeid='';
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

  tenurecalculation(data:any){
    this.installmenttenure={};
    
    let interestAnnual:any;
    let loanamount=+data.loanamount;
    let interestper=+data.interest;
    interestAnnual=+(data.loanamount*data.interest)/100;

    let interestDaily=+((+interestAnnual/365).toFixed(2));
    let durationInterest=+((+interestDaily*45).toFixed(2));
    let finalAmount=0;
    if(data.interestpayat=="AtEnd"){
       finalAmount=(loanamount)+(durationInterest);
    }
    else{
      finalAmount=(loanamount);
    }

    this.loan.totalinstallments=6;
    let weeklyinstallment=finalAmount/6;

    let date =  data.startdate;
    if(data.paymentperiodicity=="Weekly") {
      this.tenure=[];
      for(let i=0;i<6;i++)
      {
        if(i !== 0) 
          date=  this.dateService.addDay(date,7);
          this.tenure.push({
          srno:i+1,
          installmentdate:date,
          installmentamount:weeklyinstallment
        })
      }
    }
    else
    {
      this.tenure=[];
      this.loan.totalinstallments=45;
      for(let i=0;i<45;i++) {
        if(i !== 0) 
          date=  this.dateService.addDay(date,1);
          this.tenure.push({
          srno:i+1,
          installmentdate:date,
          installmentamount:weeklyinstallment
        })
      }
    }

    this.installmenttenure = {
      tenure:this.tenure
    }
    debugger;
    this.loan.paymentamount=finalAmount;
  }
}


