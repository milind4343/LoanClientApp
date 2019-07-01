import {Component, OnDestroy, OnInit, Output, EventEmitter, Input} from '@angular/core';
import { Subject } from 'rxjs';
import { DashboardService } from './dashboard.service';
import { AuthenticationService } from '../../commonServices/authentication.service';
import { CustomerService } from '../customer/customer.service';
import { Agent } from '../agent/agent';
import { NbDateService } from '@nebular/theme';

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit, OnDestroy {

  @Input() editTxnID: number;
  @Output() passEntry: EventEmitter<any> = new EventEmitter();

  submitted: boolean = false;
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();

  dtOptionsVB: DataTables.Settings = {};
  dtTriggerVB: any = new Subject();
  
  dueinstallmenthstorylist: any[] = [];
  vbtansferlist:any[]=[];

  agentlist : Agent[] = [];
  agentId: string;
  user:any;
  roleId:number;
  pageView: string = "List";
  chartData: any = {};
  res:any;
  balance: any = {};
  showlbl:boolean = false;

  constructor(private dashboardservice: DashboardService,private authservice: AuthenticationService,
    private customerservice: CustomerService, private dateService: NbDateService<Date>) {

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
    };
  }

  ngOnDestroy() {
    //this.dtTrigger.unsubscribe();
  }

  ngOnInit() {
    debugger;
    this.authservice.getLoggedInUserDetail().subscribe(res => {
      if (res != null) {
        debugger;
        this.roleId = res.roleId;
        if (this.roleId == 1) {
          this.dueinstallmenthstorylist = [];
          this.getAllAgents();         
        }
        else {
          this.balance.agentId = res.userId;
          this.dueinstallmenthstorylist = [];
          this.dashboardservice.getLoanInstallments(0).subscribe(result => {
            this.dueinstallmenthstorylist = result;
            this.dtTrigger.next();
          },
            error => {
              //this.handleError.handleExcption(error);
            });
        }
        
        this.dashboardservice.getvbtranslist().subscribe(result => {
          debugger;
           this.vbtansferlist=result;
           this.dtTriggerVB.next();
        },
          error => {
            console.log(error);
            //this.handleError.handleExcption(error);
        });       
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
    this.dtTriggerVB =  new Subject();
    this.ngOnInit();
  }

  changeenddate(startdate: any) {
    this.balance.toDate = this.dateService.addDay(startdate, 6);
  }

  getAllAgents(){
    this.customerservice.getAgent().subscribe(res=>{
      if(res !== null){
        this.agentlist = res;
        this.agentId= '0';
      }
    });
  }

  getChartData(req:any){
    console.log(req);
    this.showlbl = false;
    this.res = undefined;
    this.dashboardservice.getChartData(req).subscribe(res=>{
      if(res.length > 0){        
        this.res = res;
      }
      else
      {        
        this.showlbl = true;
      }      
    });
  }

  onAgentSelect(agentId: number){
   this.balance.agentId = agentId;
  }

}
