import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Agent }from '../../agent/agent-list/agent';
import { NbDateService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

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
  tenure:any=[];
  installmenttenure:any[]=[];

  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  showInstallments: boolean = false;

  objDoc: any = [];
  formData = new FormData();
  selectedDocs : any = [];
  docTypeList: any = [];
  filesToUpload : File[];

  constructor(private customerService: CustomerService,private dateService: NbDateService<Date>) {
   
  }    

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    this.setdefaultvalue();
    //this.agentbind();
    this.loantypebind();
  }

  setdefaultvalue(){
    this.min = new Date();
    this.max = this.dateService.addDay(this.min, 44);
    
    // this.max = new Date();
    // this.min = new Date();
    this.loan.startdate = this.min;
    this.loan.enddate = this.max;
    this.loan.interest = '';
    this.loan.interest = '';
    this.loan.paymentperiodicity = 'Daily';
    this.loan.interestpayat = 'AtEnd';
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
    this.objDoc = this.objDoc.filter(q=>q.isChecked === true);
    for(let i=0;i< this.objDoc.length; i++) {
          this.formData.append("UploadDoc[" + i + "].filedata", this.objDoc[i].filedata);
          this.formData.append("UploadDoc[" + i + "].docType", this.objDoc[i].docType);
          this.formData.append("UploadDoc[" + i + "].isChecked", this.objDoc[i].isChecked);
    }
   
    //this.customerService.uploadLoanDoc(this.formData).subscribe(result=>{
    this.customerService.uploadLoanDoc(this.formData).subscribe(result=>{
      console.log(result);

    });
  }

  changeenddate(startdate:any){
    debugger;
    this.loan.enddate= this.dateService.addDay(startdate, 44);
  }

  tenurecalculation(data:any) {

    if(this.installmenttenure.length > 0) {
      this.rerender();
    }
    this.installmenttenure = [];
    
    let interestAnnual:any;
    let loanamount=+data.loanamount;
    interestAnnual=+(data.loanamount*data.interest)/100;
  
    let finalAmount=0;
    let interestDaily=+((+interestAnnual/365).toFixed(2));
    let durationInterest=+((+interestDaily*45).toFixed(2));
    if(data.interestpayat=="AtEnd"){      
      // finalAmount=(loanamount)+(durationInterest);
      finalAmount=(loanamount);
      this.loan.paymentamount=finalAmount;
    }
    else{
      debugger;
      finalAmount=(loanamount);
      this.loan.paymentamount=(finalAmount)-(durationInterest);
    }
    this.loan.interestamout=+(durationInterest);

    let date =  data.startdate;
    if(data.paymentperiodicity=="Weekly") {
      this.loan.totalinstallments=6;
      let weeklyinstallment=+(finalAmount/6).toFixed(2);

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
      this.loan.totalinstallments=45;
      let dailyinstallment=+(finalAmount/45).toFixed(2);

      this.tenure=[];
      
      for(let i=0;i<45;i++) {
        if(i !== 0) 
          date=  this.dateService.addDay(date,1);
          this.tenure.push({
          srno:i+1,
          installmentdate:date,
          installmentamount:dailyinstallment
        })
      }
    }
    this.dtTrigger.next();
    this.installmenttenure = this.tenure;    
    //this.loan.paymentamount = finalAmount;   
    this.showInstallments = true;   
  }


  /*This function used for rerender grid*/
  rerender():void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.installmenttenure = this.tenure;
    // this.installmenttenure = {
    //   tenure:this.tenure
    // }
  
  }

  cancelForm() {
    this.editUserID = 0;
    this.callParent.emit('List');
  }

  selectedDoc(fileInput: any){
    debugger;
    this.filesToUpload = fileInput;
    if(fileInput.length === 0)
    return;
    this.getAllDocTypes();
    for(let f of fileInput){
      let file = <File>f;
      this.objDoc.push({filedata:file, docType :''});           
    }
  
    //var reader = new FileReader();      
    }
   

    checkedCB(isChecked: boolean, fileData: any){
      debugger;
      if(isChecked){
        this.selectedDocs.push(fileData);
        //this.formData.append("files",fileData, fileData.name);
      }
      else
      {
       // if(this.selectedDocs[])
        this.selectedDocs.remove();
      }
    }

    removeFile(data: any){
      debugger;
      this.objDoc = this.objDoc.filter( q=>q.filedata.name!== data.filedata.name);

    }

    getAllDocTypes(){
      this.customerService.getDocType().subscribe(res=>{
        if(res!=null){
          res.forEach(item => {
            this.docTypeList.push({name : item.type, id : item.documentTypeId});
          });
       
        }
      });
    }
  

}


