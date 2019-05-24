import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AgentdashboardComponent } from './agentdashboard/agentdashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { AgentComponent } from './agent.component';


const routes: Routes = [{
  path: '',
  component: AgentComponent,
  children: [
  {
    path: 'dashboard',
    component: AgentdashboardComponent,
  },
  {
    path: 'register',
    component: RegistrationComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentRoutingModule {
}