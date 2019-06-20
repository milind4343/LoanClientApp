import { Component, OnInit,Input,Output,EventEmitter, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { AgentService } from '../agent.service';
import { NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../dialog-name-prompt/dialog-name-prompt.component';
import { PageAccessService } from '../../../commonServices/getpageaccess.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { NbAuthService } from '@nebular/auth';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { DataTableDirective } from 'angular-datatables';
import { Agent } from '../agent';

@Component({
  selector: 'ngx-agent-fundhistory',
  templateUrl: './agent-fundhistory.component.html',
  styleUrls: ['./agent-fundhistory.component.scss']
})

export class AgentFundhistoryComponent implements OnInit {
  @Input() userId : number;
  @Output() onPageChange = new EventEmitter<string>();
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  pageTitle : string = "Agent List";
  pageView : string = "List";
  IsAgent = false;

  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT
  };
  fundHistorylist:any[];
  agentName:string;
  pageaccesscontrol:any={};
  roleId:number;

  agentlist : Agent[] = [];
  agentId: string;

  constructor(private router : Router, private agentService: AgentService,private dialogService: NbDialogService,private toastrService: NbToastrService,private pageAccessService: PageAccessService,private authservice:AuthenticationService) { }

  ngOnInit(): void {
    this.pageaccesscontrol = this.pageAccessService.getAccessData(); //used in future to disable add/delete/view button ad per role-rights 
    debugger;
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
   
    // this.pageView='List';
    // this.pageTitle='Agent List';

    // this.pageView='History';
    // this.pageTitle='Fund History';
    debugger;
    let routerurl = this.router.url;
    if(routerurl == "/pages/agent/history"){
      this.IsAgent = true;
    }

    this.authservice.getLoggedInUserDetail().subscribe(res=>{
      debugger;
      if(res!= null){
        debugger;
        this.roleId = res.roleId;
        if(this.roleId ==1){
           this.IsAgent = false;
           this.getAllAgents();
          
        }
        else{
          this.IsAgent = true;
        }

        this.bindFundHistoryListByAgentId(this.IsAgent,0)
        // this.agentService.getAgentfund(this.userId, this.IsAgent).subscribe(result =>{
    
  }
});
}


bindFundHistoryListByAgentId(isagent:boolean,agentid:number)
{
  this.agentService.getAgentfund(isagent,agentid).subscribe(result =>{
    debugger;
    this.fundHistorylist = result.lstFundVM;
    this.agentName = result.agentName;
    this.dtTrigger.next();
  });
}

getAllAgents(){
  this.agentService.getAgent().subscribe(res=>{
    if(res !== null){
      debugger;
      this.agentlist = res;
      this.agentId= '0';
    }
  });
}

  isreceive(fund : any){
    debugger;
    this.dialogService.open(DialogNamePromptComponent, {
      context: {
        title: 'Confirmation',
        description: fund.isreceive == true ? '' : 'Are you sure, you received fund?',
      },
    }).onClose.subscribe(result => result && result == 'Yes' ? this.activeinactive(fund): fund.isreceive = !fund.isreceive);
  }

  activeinactive(fund : any) {
      this.agentService.isreceivefund(fund.agentfundid,fund.isreceive).subscribe(result => {
        this.toastrService.success('Fund receive success !','Success',this.config);
      },error=>{
        this.toastrService.danger('Something went wrong !','Failed',this.config);
      });
  }

  onAgentSelect(agentId){
    debugger;
    agentId=+agentId;
    this.rerender();
    this.fundHistorylist = [];
    this.agentService.getAgentfund(false,agentId).subscribe(res=>{
      if(res!== null){       
        this.fundHistorylist = res.lstFundVM;
        this.dtTrigger.next();
      }
    });
  }

  backtoagentlist()
  {
    this.onPageChange.emit('List');
  }

  rerender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
