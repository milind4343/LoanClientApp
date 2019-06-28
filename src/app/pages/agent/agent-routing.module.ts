import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AgentdashboardComponent } from './agent-dashboard/agent-dashboard.component';
import { RegistrationComponent } from '../agent/agent-registration/agent-registration.component';
import { AgentComponent } from './agent.component';
import { ListAgentComponent } from './agent-list/agent-list.component';
import { AgentFundhistoryComponent } from './agent-fundhistory/agent-fundhistory.component';
import { AgentVbPaidComponent } from './agent-vb-paid/agent-vb-paid.component';

const routes: Routes = [{
  path: '',
  component: AgentComponent,
  children: [
  {
    path: 'dashboard',
    component: AgentdashboardComponent,
  },
  {
    path: '',
    component:ListAgentComponent ,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  },
  {
    path: 'history',
    component: AgentFundhistoryComponent
  },
  {
    path:'vb',
    component: AgentVbPaidComponent
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentRoutingModule {
}