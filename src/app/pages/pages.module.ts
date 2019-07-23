import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ProfileComponent } from './profile/profile.component';
import { AgentFundhistoryComponent } from './agent/agent-fundhistory/agent-fundhistory.component';
import { DataTablesModule } from 'angular-datatables';
import { UiSwitchModule } from 'ngx-ui-switch';
import { CustomerLoanHistoryComponent } from './customer/customer-loan-history/customer-loan-history.component';
import { CustomerInstalmentHistoryComponent } from './customer/customer-instalment-history/customer-instalment-history.component';

const PAGES_COMPONENTS = [
  PagesComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    DataTablesModule,
    UiSwitchModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    ProfileComponent,
    AgentFundhistoryComponent,
    CustomerInstalmentHistoryComponent,
    CustomerLoanHistoryComponent

  ]
})
export class PagesModule {
}
