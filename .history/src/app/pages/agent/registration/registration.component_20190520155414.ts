import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: any = {};

  constructor(private agentService: AgentService,router: Router) { }
  ngOnInit() {
    
  }


  bindCity() {
    this.agentService.register(this.user).then(result => {
      if (result != null) {
          localStorage.setItem("jwt", result.AccessToken);
          //this .router.navigate(['dashboard']);
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
