import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Agent } from '../../agent/agent-list/agent';
import { NbDateService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
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
  min: Date;
  agentlist: Agent[] = [];
  loan: any = {};
  agent: any = [];
  loantypelist: any = [];
  submitted: boolean = false;
  tenure: any = [];
  installmenttenure: any[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  showInstallments: boolean = false;
  formData: FormData = new FormData();
  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT
  };

  objDoc: any = [];
  selectedDocs: any = [];
  docTypeList: any = [];
  finalDoc: any = [];

  constructor(private customerService: CustomerService, private dateService: NbDateService<Date>, private toastrService: NbToastrService) {
  }


  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5
    };

    // this.loan={};
    // this.loan.tenure=[];
    // this.installmenttenure=[];
    this.loan.customerid = this.editUserID;
    this.setdefaultvalue();
    //this.agentbind();
    this.loantypebind();
    this.getUploadedLoanDoc(this.editUserID);
  }

  setdefaultvalue() {
    debugger;
    this.min = this.dateService.addDay(new Date(),0);

    this.max = this.dateService.addDay(this.min, 44);

    // this.max = new Date();
    // this.min = new Date();
    this.loan.startdate = new Date();
    this.loan.enddate = this.max;
    this.loan.interest = '';
    this.loan.interest = '';
    this.loan.paymentperiodicity = 'Daily';
    this.loan.interestpayat = 'AtEnd';
  }

  agentbind() {
    this.customerService.getAgent().subscribe(result => {
      debugger;
      if (result != null) {
        this.agent.push({ id: '', name: "--Select Agent--" });
        result.forEach(element => {
          this.agent.push({ id: element.userId, name: element.firstname + ' ' + element.lastname + ' ' + element.middlename })
        });
        this.loan.agentid = '';
      }
    });
  }

  loantypebind() {
    this.customerService.getloantype().subscribe(result => {
      if (result != null) {
        this.loantypelist.push({ id: '', name: "- - Select - -" });
        result.forEach(element => {
          this.loantypelist.push({ id: element.loantypeid, name: element.loantype })
        });
        this.loan.loantypeid = '';
      }
    });
  }

  assignloan(loan: any, form: any) {
    //loan.tenure=this.tenure;
    var finaldata = JSON.stringify(loan);
    this.formData = new FormData();
    this.formData.append('loandetail', finaldata);

    this.finalDoc = this.objDoc.filter(q => q.isChecked === true);

    for (let i = 0; i < this.finalDoc.length; i++) {
      this.formData.append("UploadDoc[" + i + "].filedata", this.finalDoc[i].filedata);
      this.formData.append("UploadDoc[" + i + "].docType", this.finalDoc[i].docType);
      this.formData.append("UploadDoc[" + i + "].isChecked", this.finalDoc[i].isChecked);
      this.formData.append("UploadDoc["+ i + "].filename", this.finalDoc[i].filename);
    }

    if(form.valid)
    {
      this.customerService.assignloan(this.formData).subscribe(result => {
        debugger;
        if (result.success) {
          // this.tenure=[];
          // this.loan={};
          // this.installmenttenure=[];
          // this.ngOnInit();
          this.toastrService.success('Loan assigned !', 'Success', this.config);
          this.editUserID = 0;
          this.callParent.emit('List');
        }
        else {  
          //this.customerService.uploadLoanDoc(this.formData).subscribe(result=>{
          this.customerService.uploadLoanDoc(this.formData).subscribe(result => {  
          });
        }
      }, err => {
  
      });
    }   
  }


  changeenddate(startdate: any) {
    this.loan.enddate = this.dateService.addDay(startdate, 44);
  }

  tenurecalculation(data: any) {
    debugger;
    if (data.loanamount != undefined && data.interest != "") {
      if (this.installmenttenure.length > 0) {
        this.rerender();
      }
      this.installmenttenure = [];

      let interestAnnual: any;
      let loanamount = +data.loanamount;
      interestAnnual = +(data.loanamount * data.interest) / 100;

      let finalAmount = 0;
      let interestDaily = +((+interestAnnual / 365).toFixed(2));
      let durationInterest = +((+interestDaily * 45).toFixed(2));
      if (data.interestpayat == "AtEnd") {
        // finalAmount=(loanamount)+(durationInterest);
        finalAmount = (loanamount);
        this.loan.paymentamount = finalAmount;
      }
      else {
        debugger;
        finalAmount = (loanamount);
        this.loan.paymentamount = (finalAmount) - (durationInterest);
      }
      this.loan.interestamount = +(durationInterest);

      let date = data.startdate;
      if (data.paymentperiodicity == "Weekly") {
        this.loan.totalinstallments = 6;
        let weeklyinstallment = +(finalAmount / 6).toFixed(2);

        this.tenure = [];
        for (let i = 0; i < 6; i++) {
          if (i !== 0)
            date = this.dateService.addDay(date, 7);
          this.tenure.push({
            srno: i + 1,
            installmentdate: date,
            installmentamount: weeklyinstallment
          })
        }
      }
      else {
        this.loan.totalinstallments = 45;
        let dailyinstallment = +(finalAmount / 45).toFixed(2);

        this.tenure = [];

        for (let i = 0; i < 45; i++) {
          if (i !== 0)
            date = this.dateService.addDay(date, 1);
          this.tenure.push({
            srno: i + 1,
            installmentdate: date,
            installmentamount: dailyinstallment
          })
        }
      }
      this.loan.tenure = this.tenure;
      this.dtTrigger.next();
      this.installmenttenure = this.tenure;
      //this.loan.paymentamount = finalAmount;   
      this.showInstallments = true;
    }
  }


  /*This function used for rerender grid*/
  rerender(): void {
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

  selectedDoc(fileInput: any) {
    if (fileInput.length === 0)
      return;
    this.docTypeList = [];
    this.getAllDocTypes();    
    for (let f of fileInput) {
      let file = <File>f;
      this.objDoc.push({ filedata: file, docType: '', isChecked: true, downloadPath: '', filename:file.name });
    }   
  }

  // removeFile(data: any) {
  //   this.objDoc = this.objDoc.filter(q => q.filedata.name !== data.filedata.name);
  // }

  getAllDocTypes() {
    this.customerService.getDocType().subscribe(res => {
      if (res != null) {
        res.forEach(item => {
          this.docTypeList.push({ name: item.type, id: item.documentTypeId });
        });
      }
    });
  }

  getUploadedLoanDoc(userId:number){   
    this.getAllDocTypes();
    this.customerService.getUplodedDoc(userId).subscribe(res=>{
      res.forEach(element => {
        this.objDoc.push({filedata: null, downloadPath: element.downloadPath, isChecked: element.isChecked, docType: element.docType, filename: element.filename});
      });
    });
  }


}


