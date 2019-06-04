import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
import { AgentService } from '../agent.service';
import { NbDialogService } from '@nebular/theme';
import { DialogNamePromptComponent } from '../../dialog-name-prompt/dialog-name-prompt.component';

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
  
  pageTitle : string = "Agent List";
  pageView : string = "List";
 
  fundHistorylist:any[];
  agentName:string;
  constructor(private agentService: AgentService,private dialogService: NbDialogService) { }

  ngOnInit(): void {
    debugger;
    this.dtOptions = {
      pagingType: 'full_numbers'
    };

    this.pageView='List';
    this.pageTitle='Agent List';

    this.agentService.getAgentfund(this.userId).subscribe(result =>{
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
        debugger;
      },error=>{
        debugger;
      });
  }


  backtoagentlist()
  {
    this.onPageChange.emit('List');
  }


}
