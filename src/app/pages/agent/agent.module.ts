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
import { UiSwitchModule } from 'ngx-ui-switch';
import { AgentFundhistoryComponent } from './agent-fundhistory/agent-fundhistory.component';
import { AgentVbPaidComponent } from './agent-vb-paid/agent-vb-paid.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    AgentComponent,
    AgentdashboardComponent,
    RegistrationComponent,
    ListAgentComponent,
    AgentFundhistoryComponent,
    AgentVbPaidComponent,
  ],
  imports: [
    CommonModule,
    AgentRoutingModule,
    NgbModule,
    ThemeModule,
    DataTablesModule,
    UiSwitchModule,
    SharedModule
  ],
})
export class AgentModule { }
