import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';



const routes: Routes = [{
  path: '',
  component: AgentdashboardComponent,
  children: [
  {
    path: 'dashboard',
    component: AgentdashboardComponent,
  },
  {
    path: 'agentregister',
    component: AgentdashboardComponent,
  },
],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentRoutingModule {
}