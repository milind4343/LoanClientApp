import {Component, OnDestroy, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { AuthenticationService } from '../../commonServices/authentication.service';
import { ChartsService } from '../charts/charts.service';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit, OnDestroy {

  @Input() editTxnID: number;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();
  dueinstallmenthstorylist: any[] = [];

  user:any;
  roleId:number;
  pageView: string = "List";
  //showChart:boolean = false;
  chartData: any = {};
  res:any;

  constructor(private dashboardservice: DashboardService,private authservice: AuthenticationService,
    private chartService: ChartsService) {
    debugger;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };

    this.chartData.toDate = "2019-06-27";
    this.chartData.fromDate = "2019-06-15";
    this.chartData.agentId = "2";

    this.chartService.getChartData(this.chartData).subscribe(res=>{

      this.res = res;
      // res.forEach(element => {
      //   //debugger;
      //   let dt = new Date(element.createdDate).toDateString();
      //   name.push(dt);
      
      //   lblist.push(element.lb);
      //   vblist.push(element.vb);
      //   bblist.push(element.bb);                
      // }); 

    });

  }

  ngOnDestroy() {
    //this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    debugger;
    this.authservice.getLoggedInUserDetail().subscribe(res => {
      if (res != null) {
        this.roleId = res.roleId;
        if (this.roleId == 1) {
          this.dueinstallmenthstorylist = [];
         //this.showChart = true;
         
        }
        else {
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
