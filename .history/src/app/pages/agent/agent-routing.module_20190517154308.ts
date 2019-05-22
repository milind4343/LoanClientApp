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
  } ,
  {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  },
  {
    path: 'agent',
    loadChildren: './agent/agent.module#AgentModule',
  },
  {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentRoutingModule {
}