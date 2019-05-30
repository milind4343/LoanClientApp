import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AgentService } from '../../../app/pages/agent/agent.service';  

@Component({
  selector: 'ngx-modal',
  template: `
    <div class="modal-header">
      <span>{{ modalHeader }}</span>
      <span style="display:none">{{ modalIsactive }}</span>
      <span style="display:none">{{ modalId }}</span>
      <button class="close" aria-label="Close" (click)="closeModal()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      {{ modalContent }}
    </div>
    <div class="modal-footer">
      <button class="btn btn-md btn-primary" (click)="agentIsActive(modalId,modalIsactive)">Delete</button>
    </div>
  `,
})
export class ModalComponent {

  modalHeader: string;
  modalContent:string;
  modalId:number;
  modalIsactive:boolean;

  constructor(private activeModal: NgbActiveModal,private agentService: AgentService) { }

  closeModal() {
    this.activeModal.close();
  }

  agentIsActive(id,isActive)
  {
    debugger;
    this.agentService.changeStatus(id,(!isActive)).subscribe(result =>{
     if(result.status)
     {
      this.activeModal.close();
     }
    });
  }
}
