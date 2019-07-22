import { Component, Input,OnInit, OnDestroy  } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent implements OnInit, OnDestroy {
  dtOptions: DataTables.Settings = {};
  dtTrigger: any = new Subject();

  @Input() title: string;
  @Input() description: string;
  @Input() agentlist: any=[];
  @Input() fundHistory:any=[];
  agent:any={};
  submitted:boolean=false;

  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>) {
    this.agent.userId='';
  }

  ngOnInit() {
    this.dtOptions = {
      pagingType: 'full_numbers'
    };
    
    this.agent={};
    this.agent.agentid='';
  }

  cancel(result) {
    this.ref.close(result);
  }

  submit(result) {
    this.ref.close(result);
  }

  addFundDtl(result,fundform){
    if(fundform.valid && this.agent.fundamount > 0)
    {
      result=JSON.stringify(result);
      this.ref.close(result);
    }
  }

  ngOnDestroy(): void {
    // Do not forget to unsubscribe the event
    this.dtTrigger.unsubscribe();
  }
}
