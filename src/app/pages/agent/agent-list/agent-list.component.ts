import { Component, OnInit, OnDestroy , TemplateRef  } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import{ Agent  }from './agent';
import { AgentService } from '../agent.service';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../dialog-name-prompt/dialog-name-prompt.component';

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

  fundtransfer:any;
  agent: any=[];
  constructor(private agentService: AgentService,private dialogService: NbDialogService) { }

  

  ngOnInit(): void {
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

  fundHistory(userId)
  {
  
  }

  popupFund(){
    this.agentService.getAgent().subscribe(result => {
      debugger;
      if (result != null) {
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

  resultfun(result:any){
    debugger;
    result=JSON.parse(result);
    this.agentService.addAgentfund(result).then(resultagent => {
      if (result != null) {
        debugger;
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
