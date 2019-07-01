import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { AgentService } from '../agent.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

@Component({
  selector: 'ngx-agent-vb-paid',
  templateUrl: './agent-vb-paid.component.html',
  styleUrls: ['./agent-vb-paid.component.scss']
})
export class AgentVbPaidComponent implements OnInit {

  @Input() userid : number;
  @Output() callParent = new EventEmitter<string>();
  vb:any={};
  submitted: boolean = false;

  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT
  };

 

  constructor(private agentservice: AgentService, private toastrService: NbToastrService) { }

  ngOnInit() {
    console.log(this.userid);
    this.getVBDetail(this.userid);
  }

  getVBDetail(agentId:number){
    this.agentservice.getAgentVBDetail().subscribe(res=>{
      if(res!=null){
        console.log(res);
        this.vb.paidAmount = res;
        this.vb.agentId = agentId;
      }
    });
  }

  markpaid(form:any){
    debugger;
    if(form.valid){
      this.agentservice.markAgentVBPaid(this.vb).subscribe(res=>{
        if(res.success){
          this.cancelForm();
          this.toastrService.success('Mark As Paid Successfully !', 'Success', this.config);
        }
        else
        {
          this.toastrService.danger('Something went wrong !', 'Error', this.config);
        }
      });
    }    
  }  
 
  cancelForm(){
    this.userid = 0;
    this.callParent.emit('List');
  }
}
