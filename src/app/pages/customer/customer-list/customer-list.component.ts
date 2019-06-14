import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../dialog-name-prompt/dialog-name-prompt.component';
import { ExceptionHandler } from '../../../commonServices/exceptionhandler.service';
import { PageAccessService } from '../../../commonServices/getpageaccess.service';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Agent } from '../../agent/agent';
import { DataTableDirective } from 'angular-datatables';
import { AuthenticationService } from '../../../commonServices/authentication.service';


@Component({
  selector: 'ngx-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  pageTitle: string = "Customer List";
  pageView: string = "List";
  customerlist: Customer[] = [];
  agentlist : Agent[] = [];
  agentId: string;
  editUserID: number;
  names: string[];
  roleId: number;

  config: ToasterConfig;
  status = NbToastStatus.PRIMARY;
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = true;
  pageaccesscontrol:any={};

  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  
  constructor(private authservice: AuthenticationService,private pageAccessService: PageAccessService, private customerservice: CustomerService, 
    private dialogService: NbDialogService, private handleError: ExceptionHandler, private toastrService: NbToastrService) {

      this.dtOptions = {
        pagingType: 'full_numbers',
        pageLength: 3,
        //lengthMenu: [[10, 25, 50, -1], [10, 25, 50, "All"]],
        //dom: 'Blfrtip'     
      };
      this.pageaccesscontrol = this.pageAccessService.getAccessData();
      this.authservice.getLoggedInUserDetail().subscribe(res=>{
      if(res!= null){
        this.roleId = res.roleId;
        if(this.roleId ==1){
          this.getAllAgents();
        }
      }
      });
     
  }

  ngOnInit(): void {
    debugger;  
    this.customerservice.getCustomers().subscribe(result => {
      this.customerlist = result;
      this.dtTrigger.next();
    },
      error => {
        console.log(error);
        this.handleError.handleExcption(error);
      });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  addCustomer() {
    debugger;
    this.pageView = 'Add';
    this.pageTitle = 'Fill Customer Detail';
    this.editUserID = 0;
  }

  editCustomer(userId: number) {
    this.pageView = 'Edit';
    this.pageTitle = 'Update Customer Detail';
    this.editUserID = userId;
  }

  callParent(event: any) {
    this.pageView = event;
    this.pageTitle = 'Customer List';
    this.dtTrigger = new Subject();
    this.ngOnInit();
  }

  onSwitchChange(cust: any) {
    debugger;
    this.dialogService.open(DialogNamePromptComponent, {
      context: {
        title: 'Confirmation',
        description: cust.isActive == true ? 'Are you sure, you want to deactive?' : 'Are you sure, you want to active?'
      }
    }).onClose.subscribe(result => result && result == 'Yes' ? this.activeinactive(cust.userID,cust.isActive) : cust.isActive = !cust.isActive);
  }

  activeinactive(custId: any, status:boolean) {
    debugger;
    this.customerservice.changeStatus(custId).subscribe(result => {
      debugger;
      let s = status == true ? " Activated " : " Deactivated ";

      const config = {
        status: this.status,
        destroyByClick: this.destroyByClick,
        duration: this.duration,
        hasIcon: this.hasIcon,
        position: this.position,
        preventDuplicates: this.preventDuplicates
      };

      this.toastrService.show(        
        "Customer" + s + "Successfully",
        "Success",
        config);

    },
      error => {
        debugger;
      });
  }

  addLoan(userId: number){
    this.pageView = "AddLoan";
    this.pageTitle = "Fill Up Loan Detail";
    this.editUserID = userId;
  }

  getAllAgents(){
    this.customerservice.getAgent().subscribe(res=>{
      if(res !== null){
        debugger;
        this.agentlist = res;
        this.agentId= '';
      }
    });
  }

  onAgentSelect(agentId: number){
    this.rerender();
    this.customerlist = [];
    this.customerservice.getCustomerbyAgent(agentId).subscribe(res=>{
      if(res!== null){       
        this.customerlist = res;
        this.dtTrigger.next();
      }
    });
  }


  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  // loanHistory(userId: number){
  //   this.pageView = "LoanHistory";
  //   this.pageTitle = "Loan History";
  //   this.editUserID = userId;
  // }


}
