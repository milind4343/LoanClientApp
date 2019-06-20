import {Component, OnDestroy, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { AuthenticationService } from '../../commonServices/authentication.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit, OnDestroy {

  @Input() editTxnID: number;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  user:any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  dueinstallmenthstorylist: any[] = [];

  roleId:number;
  pageView: string = "List";

  constructor(private dashboardservice: DashboardService,private authservice: AuthenticationService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  ngOnDestroy() {
    //this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.authservice.getLoggedInUserDetail().subscribe(res=>{
      if(res!= null){
        debugger;
        this.roleId = res.roleId;
        if(this.roleId ==1){
          this.dueinstallmenthstorylist = [];
        }
        else
        {
          this.dueinstallmenthstorylist = [];
          this.dashboardservice.getLoanInstallments(0).subscribe(result => {
            debugger;
             this.dueinstallmenthstorylist = result;
             this.dtTrigger.next();
          },
            error => {
              console.log(error);
              //this.handleError.handleExcption(error);
          });
        }
      }
      });
    
  
  }

  receiptpay(transactionid:number)
  {
    this.editTxnID = transactionid;
    this.pageView = "paid";
  }


  callParent(event: any) {
    this.pageView = event;
    this.dtTrigger = new Subject();
    this.ngOnInit();
  }

}
