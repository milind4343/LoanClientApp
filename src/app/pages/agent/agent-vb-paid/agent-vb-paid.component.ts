import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import { NbToastrService } from '@nebular/theme/components/toastr/toastr.service';
import { NbGlobalPhysicalPosition } from '@nebular/theme';
import { LoaderService } from '../../../commonServices/loader.service';

@Component({
  selector: 'ngx-agent-vb-paid',
  templateUrl: './agent-vb-paid.component.html',
  styleUrls: ['./agent-vb-paid.component.scss']
})
export class AgentVbPaidComponent implements OnInit {

  // @Input() userid : number;
  // @Output() callParent = new EventEmitter<string>();
  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT
  };
  vb:any={};
  pageView: string;
  submitted:boolean= false;

  constructor(private agentservice: AgentService, private toastrService: NbToastrService,
    private loader: LoaderService) 
    { }

  ngOnInit() {
    this.getVBDetail();
  }

  getVBDetail(){
    this.agentservice.getAgentVBDetail().subscribe(res=>{
      if(res!=null){
        console.log(res);
        this.vb.paidAmount = res.vb;
        this.vb.agentId = res.agentId;
      }
    });
  }

  markpaid(form:any){
    this.loader.loader = true;
    if(form.valid)
    {
      this.agentservice.markAgentVBPaid(this.vb).subscribe(res=>{
        if(res.success){
         this.vb.paidAmount=0;
          //this.cancelForm();
          this.loader.loader = false;
          this.toastrService.success('Mark As Paid Successfully !', 'Success', this.config);
        }
        else
        {
          this.loader.loader = false;
          this.toastrService.danger('Something went wrong !', 'Error', this.config);
        }
      });
    } 
    else
    {
      this.loader.loader = false;
    }   
  }  
 
  // cancelForm(){
  //   this.userid = 0;
  //   this.callParent.emit('List');
  // }
}
