import { Component, OnInit, ChangeDetectorRef, Inject ,AfterViewChecked } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoaderService } from '../../commonServices/loader.service';
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';

@ Component({
  selector: 'ngx-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends NbLoginComponent implements OnInit , AfterViewChecked {

  //authService: any;
  loginCounter:number=0;
  user: any = {};
  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT
  };

  constructor(private authService: AuthService, service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, cd: ChangeDetectorRef, 
  router: Router, public loader: LoaderService, private toastrService : NbToastrService) {
    super(service, options, cd, router);
  }

  ngAfterViewChecked() {
    if(this.loginCounter == 0) {
        // let nbCard =  (<HTMLCollection>document.getElementsByTagName("nb-card"));
        let bodyelem =  (<HTMLCollection>document.getElementsByTagName("body"));
        bodyelem[0].classList.add("login_page");
        // nbCard[0].setAttribute("class","login_page");
        this.loginCounter = 1;
        debugger;
    }
  }

  ngOnInit() {
  
  }


  // login() {
  //   this .router.navigate(['pages/agent']);
  //   this.authService.login(this.user).then(result => {
  //     if (result != null) {
  //         localStorage.setItem("jwt", result.AccessToken);
  //         this .router.navigate(['dashboard']);
  //     }
  //   }).catch(err => {
  //     console.log(err);
  //   })
  // }


  login() {
    debugger;
    this.loader.loader = true;
    this.authService.login(this.user).then(result => {
      debugger
      if (result !== null) {
         if(result.statuscode == 1) {
          localStorage.setItem("jwt","");               
          localStorage.setItem("encryptkey","");
          setTimeout(()=>{
            debugger;
            localStorage.setItem("jwt", result.token);
            this.router.navigate(['dashboard']);
            this.loader.loader = false;
          },500);
         }
         else if(result.statuscode == 2){
            this.loader.loader = false;
            this.toastrService.danger(result.message,"Inactive User",this.config);
         }
         else{
          this.loader.loader = false;
          this.toastrService.danger(result.message,"Error",this.config);
         }
      }
    }).catch(err => {
      this.loader.loader = false;
      console.log(err);
    })
  }

}
