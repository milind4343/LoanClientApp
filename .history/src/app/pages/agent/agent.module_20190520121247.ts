import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';
import{AgentRoutingModule}from './agent-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { AgentComponent } from './agent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  NbRadioModule
} from '@nebular/theme';

import {
  HeaderComponent
} from '../../@theme/components';

@NgModule({
  declarations: [AgentComponent,AgentdashboardComponent, RegistrationComponent,HeaderComponent],
  imports: [
    CommonModule,
    AgentRoutingModule,
    NgbModule,
    NbRadioModule
  ]

  
})
export class AgentModule { }
