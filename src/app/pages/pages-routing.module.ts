import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { AgentFundhistoryComponent } from './agent/agent-fundhistory/agent-fundhistory.component';
import { CustomerLoanHistoryComponent } from './customer/customer-loan-history/customer-loan-history.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
  {
    path: 'dashboard',
    component: DashboardComponent,
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
    path: 'fundhistory',
    component: AgentFundhistoryComponent
  },
  {
    path: 'loanhistory',
    component: CustomerLoanHistoryComponent
  },
  {
    path: 'customer',
    loadChildren: './customer/customer.module#CustomerModule',    
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
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
export class PagesRoutingModule {
}
