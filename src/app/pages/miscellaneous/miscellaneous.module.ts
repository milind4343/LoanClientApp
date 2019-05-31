import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { MiscellaneousRoutingModule, routedComponents } from './miscellaneous-routing.module';
import { NotAuthorizedComponent } from './not-authorized/not-authorized.component';

@NgModule({
  imports: [
    ThemeModule,
    MiscellaneousRoutingModule,
  ],
  declarations: [
    ...routedComponents,
    NotAuthorizedComponent,
  ],
})
export class MiscellaneousModule { }
