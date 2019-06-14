import {Component, OnDestroy, OnInit, Output, EventEmitter} from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { takeWhile } from 'rxjs/operators' ;
import { SolarData } from '../../@core/data/solar';
import { Subject } from 'rxjs';
import { DashboardService } from './dashboard.service';
import {Router} from '@angular/router';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit, OnDestroy {

  editTxnID: number;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  user:any;
  private alive = true;

  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  dueinstallmenthstorylist: any[] = [];

  pageView: string = "List";

  constructor(private dashboardservice: DashboardService,private themeService: NbThemeService,private router:Router) {
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
