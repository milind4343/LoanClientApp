import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';


@Component({
  selector: 'ngx-dialog-name-prompt',
  templateUrl: 'dialog-name-prompt.component.html',
  styleUrls: ['dialog-name-prompt.component.scss'],
})
export class DialogNamePromptComponent {
  @Input() title: string;
  @Input() description: string;
  @Input() agentlist: any=[];
  agent:any={};
  submitted:boolean=false;

  constructor(protected ref: NbDialogRef<DialogNamePromptComponent>) {
    this.agent.userId='';
  }

  ngOnInit() {
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
    if(fundform.valid)
    {
      result=JSON.stringify(result);
      this.ref.close(result);
    }
  }
}
