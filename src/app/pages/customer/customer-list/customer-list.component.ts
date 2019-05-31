import { Component, OnInit, OnDestroy } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../dialog-name-prompt/dialog-name-prompt.component';
import { ExceptionHandler } from '../../../commonServices/exceptionhandler.service';
import { PageAccessService } from '../../../commonServices/getpageaccess.service';


@Component({
  selector: 'ngx-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.scss']
})
export class CustomerListComponent implements OnInit, OnDestroy {

  pageTitle : string = "Customer List";
  pageView : string = "List";
  dtOptions: DataTables.Settings = {};
  customerlist: Customer[] = [];
  dtTrigger: any = new Subject();
  editUserID: number;

  names:string[];
  
  constructor(private pageAccessService: PageAccessService,private customerservice: CustomerService, private dialogService: NbDialogService, private handleError:ExceptionHandler){ 
  }

  ngOnInit(): void {
    this.pageAccessService.getAccessData(); //used in future to disable add/delete/view button ad per role-rights 
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    this.customerservice.getCustomers().subscribe(result =>{
      debugger;
      this.customerlist = result;
      this.dtTrigger.next();
    },
    error =>{
      console.log(error);
      this.handleError.handleExcption(error);
    });   

  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }

  addCustomer(){
    this.pageView='Add';
    this.pageTitle='Add Customer';
  }

  editCustomer(userId:number){
    this.pageView ='Edit';
    this.pageTitle ='Edit Customer';
    this.editUserID = userId;
  }

  callParent(event:any){
    this.pageView = event;
    this.dtTrigger = new Subject();
    this.ngOnInit();
  }

  onSwitchChange(event: any){    
    this.dialogService.open(DialogNamePromptComponent)
    .onClose.subscribe(name => name && this.names.push(name));
  }

}
