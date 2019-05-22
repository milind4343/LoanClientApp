import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NbRegisterComponent } from '@nebular/auth';
import { AuthService } from '../auth.service';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent implements OnInit {
  logincredential: any = {};
  constructor(private authService: AuthService, service:NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, cd:ChangeDetectorRef, router:Router) {
      super(service, options, cd, router)

   }

  ngOnInit() {
  }

  register() {
    this.authService.login(this.logincredential).then(result => {
      if (result != null) {
          localStorage.setItem("jwt", result.AccessToken);
          this .router.navigate(['dashboard']);
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
