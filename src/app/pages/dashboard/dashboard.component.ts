import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit, OnDestroy {

  editTxnID: number;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  user:any;

  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  dueinstallmenthstorylist: any[] = [];

  pageView: string = "List";

  constructor(private dashboardservice: DashboardService) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  ngOnDestroy() {
    //this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
   
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
