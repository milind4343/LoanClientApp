import { Component, OnInit } from '@angular/core';
import { AuthService } from '../agent.service';

@Component({
  selector: 'ngx-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: any = {};

  constructor() { }
  ngOnInit() {
    
  }


  bindCity() {
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
