import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
 import {
  NbAuthComponent,
} from '@nebular/auth';
import { LoginComponent } from './auth/login/login.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { AuthenticationService } from './commonServices/authentication.service';


const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        canActivate:[AuthenticationService]
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate:[AuthenticationService]
      },
      
      {
        path: 'forgotPassword',
        component: ForgotPasswordComponent,
      },
      {
        path: 'resetPassword',
        component: ResetPasswordComponent,
      }
    ],
  },
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
