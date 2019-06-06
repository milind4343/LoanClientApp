import { Component, OnInit, OnDestroy } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import{ Agent  }from './agent';
import { AgentService } from '../agent.service';
import { NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../dialog-name-prompt/dialog-name-prompt.component';
import { PageAccessService } from '../../../commonServices/getpageaccess.service';

@Component({
  selector: 'ngx-agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})

export class ListAgentComponent implements OnInit, OnDestroy {
 
  dtOptions: DataTables.Settings = {};
  agentlist: Agent[] = [];
  dtTrigger: any = new Subject();
  isSelect:boolean;
  
  pageTitle : string = "Agent List";
  pageView : string = "List";
  userid: number;
  pageaccesscontrol:any={};
  // fundtransfer:any;
  fundHistorylist:any[];
  agent: any=[];
  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT
  };
  
  constructor(private pageaccess:PageAccessService,private agentService: AgentService,private dialogService: NbDialogService,private toastrService: NbToastrService) { }

  ngOnInit(): void {
    this.pageaccesscontrol = this.pageaccess.getAccessData();
    debugger;
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    this.pageView='List';
    this.pageTitle='Agent List';

    this.agentService.getAgent().subscribe(result =>{
      debugger;
      this.agentlist =result;    
      this.dtTrigger.next();
    });
  }

  onPageChanged(eventValue :string) {
    this.pageView = eventValue;
    this.pageTitle='Agent List';
    this.dtTrigger = new Subject();
    this.ngOnInit();
  }

  registration(){
    this.pageView='Edit';
    this.pageTitle='Add Agent';
    this.userid=0;
  }

  agentIsActive(cust : any){
    debugger;
    this.dialogService.open(DialogNamePromptComponent, {
      context: {
        title: 'Confirmation',
        description: cust.isactive == true ? 'Are you sure, you want to deactive?' : 'Are you sure, you want to active?',
      },
    }).onClose.subscribe(result => result && result == 'Yes' ? this.activeinactive(cust): cust.isactive = !cust.isactive);
  }

  activeinactive(cust : any) {
      this.agentService.changeStatus(cust.userId,cust.isactive).subscribe(result => {
        debugger;
      },error=>{
        debugger;
      });
  }

  editAgent(userId){
    debugger;
    this.userid=userId;
    this.pageView='Edit';
    this.pageTitle='Edit Agent';
  }

  fetchFundHistory(userId){
    debugger;
    this.userid=userId;
    this.pageView='History';
    this.pageTitle='Fund History';
    // this.agentService.getAgentfund(userId).subscribe(result =>{
    //   debugger;
    //  this.fundHistorylist=result;
    // });
    
  }

  popupFund(){
    this.agentService.getAgent().subscribe(result => {
      debugger;
      if (result != null) {
        this.agent=[];
        this.agent.push({id:'',name: "--Select Agent--"});
        result.forEach(element => {
          this.agent.push({id : element.userId , name : element.firstname+' '+element.lastname+' '+element.middlename})
        });
    }
      
    this.dialogService.open(DialogNamePromptComponent, {
      context: {
        title: 'Fund Transfer',
        description: '',
        agentlist:this.agent
      },})
    .onClose.subscribe(result => result && this.resultfun(result));
    })
  }

  resultfun(result:any) {
    result=JSON.parse(result);
    this.agentService.addAgentfund(result).then(resultagent => {
      debugger;
      if (resultagent.status==200) {
        this.dtTrigger = new Subject();
        this.toastrService.success('Fund update success !','Success',this.config);
        this.ngOnInit();
      }
      else
      {
        this.ngOnInit();
      }
  }).catch(err => {
    console.log(err);
  })
}
  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
