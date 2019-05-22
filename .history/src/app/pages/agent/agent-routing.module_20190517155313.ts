import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';



const routes: Routes = [{
  path: 'agentdashboard',
  component: AgentdashboardComponent,
  children: [
  {
    path: 'agentdashboard',
    component: AgentdashboardComponent,
  },
  // {
  //   path: 'agent',
  //   loadChildren: './agent/agent.module#AgentModule',
  // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentRoutingModule {
}