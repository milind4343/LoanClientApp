import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../dialog-name-prompt/dialog-name-prompt.component';
import { ExceptionHandler } from '../../../commonServices/exceptionhandler.service';
import { PageAccessService } from '../../../commonServices/getpageaccess.service';
import { ToasterConfig } from 'angular2-toaster';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';


@Component({
  selector: 'ngx-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  pageTitle: string = "Customer List";
  pageView: string = "List";
  dtOptions: DataTables.Settings = {};
  customerlist: Customer[] = [];
  dtTrigger: any = new Subject();
  editUserID: number;

  names: string[];

  config: ToasterConfig;
  status = NbToastStatus.PRIMARY;
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = true;

  constructor(private pageAccessService: PageAccessService, private customerservice: CustomerService, 
    private dialogService: NbDialogService, private handleError: ExceptionHandler, private toastrService: NbToastrService) {
  }

  ngOnInit(): void {
    this.pageAccessService.getAccessData(); //used in future to disable add/delete/view button ad per role-rights 
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3
    };

    this.customerservice.getCustomers().subscribe(result => {
      debugger;
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
    this.pageTitle = 'Add Customer';
    this.editUserID = 0;
  }

  editCustomer(userId: number) {
    this.pageView = 'Edit';
    this.pageTitle = 'Edit Customer';
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

}
