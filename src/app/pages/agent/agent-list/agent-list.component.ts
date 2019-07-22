import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
//import { Http, Response } from '@angular/http';
import { Subject } from 'rxjs';
import{ Agent  }from '../agent';
import { AgentService } from '../agent.service';
import { NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../dialog-name-prompt/dialog-name-prompt.component';
import { PageAccessService } from '../../../commonServices/getpageaccess.service';
import { DataTableDirective } from 'angular-datatables';

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
  
  pageTitle : string = "All Agents";
  pageView : string = "List";
  userid: number;s
  pageaccesscontrol:any={};
  // fundtransfer:any;
  fundHistorylist:any[];
  agent: any=[];
  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT
  };

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  
  constructor(private pageaccess:PageAccessService,
    private agentService: AgentService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService) 
  { }

  ngOnInit(): void {
    this.pageaccesscontrol = this.pageaccess.getAccessData();
   
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order:[0,'asc'],        
      columnDefs:[{orderable: false,targets:[5,6]}]
    };

    this.agentService.getAgentList().subscribe(result =>{     
      this.agentlist = result;    
      this.dtTrigger.next();
    });
  }

  onPageChanged(eventValue :string) {
    this.pageView = eventValue;   
    this.pageTitle='All Agents';
    this.dtTrigger = new Subject();
    this.ngOnInit();
  }

  registration(){
    this.pageView='Add';
    this.pageTitle='Fill Agent Detail';
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
        this.toastrService.success('Status updated successfully !','Success',this.config);
      },error=>{
        this.toastrService.danger('Something went wrong !','Failed',this.config);
      });
  }

  editAgent(userId){    
    this.userid=userId;
    this.pageView='Edit';
    this.pageTitle='Edit Agent Detail';
  }

  fetchFundHistory(userId){    
    this.userid=userId;
    this.pageView='History';
  }

  popupFund(){
    this.agentService.getAgent().subscribe(result => {
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
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          this.toastrService.success('Fund Transferred successfully !','Success',this.config);
          //this.agentlist = [];  
          dtInstance.destroy();
          this.ngOnInit();
        });      
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

  // gotoVB(agentId:number){
  //   debugger;
  //   this.userid = agentId;
  //   this.pageView='VB';
  // }

  callParent(event: any) {
    this.pageView = event;
    this.dtTrigger = new Subject();
    this.ngOnInit();
  }

}
