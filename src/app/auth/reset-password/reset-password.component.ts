import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';
import { AuthService } from '../auth.service';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent extends NbRegisterComponent implements OnInit {
  
  user:any = {};
  constructor(private authService: AuthService, service:NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, cd:ChangeDetectorRef, router:Router) {
    super(service, options, cd, router)

 }

  ngOnInit() {
  }

}
