import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { AgentService } from '../agent.service';
import { NbDialogService, NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../dialog-name-prompt/dialog-name-prompt.component';
import { PageAccessService } from '../../../commonServices/getpageaccess.service';
import { Router } from '@angular/router';

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
  
  //pageTitle : string = "Fund History";
  //pageView : string = "History";
  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT
  };
  fundHistorylist:any[];
  agentName:string;
  pageaccesscontrol:any={};
  constructor(private router : Router, private agentService: AgentService,private dialogService: NbDialogService,private toastrService: NbToastrService,private pageAccessService: PageAccessService) { }

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


    let IsAdmin = false;
    debugger;
    let routerurl = this.router.url;
    if(routerurl == "/pages/agent/history"){
      IsAdmin = true;
    }
    
    this.agentService.getAgentfund(this.userId, IsAdmin).subscribe(result =>{
      debugger;
     this.fundHistorylist=result.lstFundVM;
     this.agentName=result.agentName;
     this.dtTrigger.next();
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


  backtoagentlist()
  {
    this.onPageChange.emit('List');
  }


}
