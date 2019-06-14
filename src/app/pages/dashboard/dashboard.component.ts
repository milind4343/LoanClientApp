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
  @Output() passEntry: EventEmitter<any> = new EventEmitter();
  user:any;
  private alive = true;

  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  dueinstallmenthstorylist: any[] = [];

  constructor(private dashboardservice: DashboardService,private themeService: NbThemeService,
    private solarService: SolarData,private router:Router) {
  }

  ngOnDestroy() {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
   
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
    
    this.dashboardservice.getinstallment(transactionid).subscribe(result => {
      debugger;
      
      // this.passEntry.emit(this.user=result);
      // this.router.navigate(['../pages/customer', {  user: result }]);

      //  this.dueinstallmenthstorylist = result;
      //  this.dtTrigger.next();
    },
      error => {
        console.log(error);
    });
  }
}
