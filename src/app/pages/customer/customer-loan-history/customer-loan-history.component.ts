import { Component, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { PageAccessService } from '../../../commonServices/getpageaccess.service';
import { CustomerService } from '../customer.service';
import { DataTableDirective } from 'angular-datatables';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { Agent } from '../../agent/agent';

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
  editUserID:number = 0;
  pageaccesscontrol:any = {};
  loanhstorylist:any = [];
  roleId: number;
  agentlist : Agent[] = [];
  agentId: string;

  selectedAgentname:string;
  showsearchlbl:boolean=true;
  searchresult:string="Display Result for Agent: All";
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  constructor(private authservice: AuthenticationService, private pageAccessService: PageAccessService, private customerservice: CustomerService) { }

  ngOnInit() : void{
    this.pageaccesscontrol = this.pageAccessService.getAccessData();
    this.authservice.getLoggedInUserDetail().subscribe(res => {
      if (res != null) {
        this.roleId = res.roleId;
        if (this.roleId == 1) {
          this.getAllAgents();
        }
      }
    });

    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    this.customerservice.getCustomerLoan(this.editUserID).subscribe(result => {
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

  onAgentSelect(agentId: number,val:any){
    this.rerender();
    this.loanhstorylist = [];
    this.customerservice.getCustomerLoan(agentId).subscribe(res=>{
      if(res!== null){       
        this.loanhstorylist = res;
        this.dtTrigger.next();
      }
    });

    this.showsearchlbl=true;
    if(+agentId!=+("0"))
    {
      this.selectedAgentname=val.agentlist.filter(x => x.userId == agentId)[0]["firstname"]+" "+val.agentlist.filter(x => x.userId == 2)[0]["lastname"];
    }
    this.searchresult="Display Result for Agent: " +((+agentId==+("0"))?'All':this.selectedAgentname);
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  getAllAgents(){
    this.customerservice.getAgent().subscribe(res=>{
      if(res !== null){
        debugger;
        this.agentlist = res;
        this.agentId= '0';
      }
    });
  }


}
