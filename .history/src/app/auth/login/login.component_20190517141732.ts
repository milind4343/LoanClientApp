import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@ Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent implements OnInit {

  //authService: any;
  user1: any = {};

constructor(private authService: AuthService, service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, cd: ChangeDetectorRef, router: Router) {
    super(service, options, cd, router);
  }

  ngOnInit() {
  }


  login() {
    this.authService.login(this.user).then(result => {
      if (result != null) {
          localStorage.setItem("jwt", result.AccessToken);
          this .router.navigate(['dashboard']);
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
