import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';
import{AgentRoutingModule}from './agent-routing.module';
import { RegistrationComponent } from './registration/registration.component';
import { AgentComponent } from './agent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from '../../@theme/theme.module';
import { ListAgentComponent } from './list-agent/list-agent.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [AgentComponent,AgentdashboardComponent, RegistrationComponent, ListAgentComponent],
  imports: [
    CommonModule,
    AgentRoutingModule,
    NgbModule,
    ThemeModule,
    DataTablesModule
  ]
})
export class AgentModule { }
