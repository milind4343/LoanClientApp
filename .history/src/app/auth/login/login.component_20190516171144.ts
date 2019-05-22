import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AuthModel ,ActiveLink} from '../auth.model';
import { NbMenuItem } from '@nebular/theme';
import { NbAclService } from '@nebular/security';

@ Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent implements OnInit {
  user: any = {};
  authModel: AuthModel;
  menuList : NbMenuItem[];
  constructor(private authService: AuthService, service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, cd: ChangeDetectorRef, router: Router) {
    super(service, options, cd, router);
      this.authModel = new AuthModel();
  }

  ngOnInit() {

  }


  login() {
    this.authService.login(this.user).then(result => {
      if (result != null) {
          this.authModel = result;
          localStorage.setItem("jwt", this.authModel.accesstoken);
          this .router.navigate(['dashboard']);
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
