import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';
import { RegistrationComponent } from '../agent/registration/registration.component';
import { AgentComponent } from './agent.component';
import { ListAgentComponent } from '../agent/list-agent/list-agent.component';

const routes: Routes = [{
  path: '',
  component: AgentComponent,
  children: [
  {
    path: 'dashboard',
    component: AgentdashboardComponent,
  },
  {
    // path: 'register',
    // component: RegistrationComponent,
    path: 'register',
    component:ListAgentComponent ,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentRoutingModule {
}