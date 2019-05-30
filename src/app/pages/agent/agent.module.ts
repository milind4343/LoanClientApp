import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentdashboardComponent } from './agent-dashboard/agent-dashboard.component';
import{AgentRoutingModule}from './agent-routing.module';
import { RegistrationComponent } from './agent-registration/agent-registration.component';
import { AgentComponent } from './agent.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ThemeModule } from '../../@theme/theme.module';
import { ListAgentComponent } from './agent-list/agent-list.component';
import { DataTablesModule } from 'angular-datatables';
import { UiSwitchModule } from 'ngx-toggle-switch';


@NgModule({
  declarations: [AgentComponent,AgentdashboardComponent, RegistrationComponent, ListAgentComponent],
  imports: [
    CommonModule,
    AgentRoutingModule,
    NgbModule,
    ThemeModule,
    DataTablesModule,
    UiSwitchModule
  ],
})
export class AgentModule { }
