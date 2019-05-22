import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import{MiscellaneousModule} from './miscellaneous/miscellaneous.module';
import{AgentModule} from './agent/agent.module';


const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    // AgentModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    
  ],
})
export class PagesModule {
}
