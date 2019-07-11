import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { NbLoginComponent, NbAuthService, NB_AUTH_OPTIONS } from '@nebular/auth';
import { Router } from '@angular/router';
import{AuthService} from '../auth.service'
import { NbToastrService, NbGlobalPhysicalPosition } from '@nebular/theme';
import { LoaderService } from '../../commonServices/loader.service';
@Component({
  selector: 'ngx-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent extends NbLoginComponent implements OnInit {

   user:any={};
   constructor(service: NbAuthService, @Inject(NB_AUTH_OPTIONS) protected options = {}, cd: ChangeDetectorRef, router: Router,private authservice:AuthService,private toastrService: NbToastrService,public loader: LoaderService) {
    super(service, options, cd, router);
  }
  
  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT,
  };
  ngOnInit() {
  }


  forgotpwd(email:string)
  {
    this.loader.loader = true;
    setTimeout(()=>{
      debugger;
      this.authservice.forgotpassword(email).subscribe(res=>{
        if(res)
        {
          if(res.status == 200)
          {
          this.toastrService.success('Mail send successfully !', 'Success', this.config);
          }
          else if(res.status == 400)
          {
            this.toastrService.danger('Mail sending failed !', 'Error', this.config);
          }
          else
          {
            this.toastrService.danger('Email not registered !', 'Error', this.config);
          }
       }
       else
       {
        if(res.status == 400)
          this.toastrService.danger('Something went wrong !', 'Error', this.config);
       }
       this.user.email="";
      });
      this.loader.loader = false;
    },500);
   
  }
}
