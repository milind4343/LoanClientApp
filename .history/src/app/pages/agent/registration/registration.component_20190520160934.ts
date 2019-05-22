import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import { Router } from '@angular/router';
import{ City } from '../City';
import{ State } from '../State';


@Component({
  selector: 'ngx-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  user: any = {};
  selectedState: State = new State(1,'Brazil',true);
  city: City[];

  constructor(private agentService: AgentService,router: Router) { }
  ngOnInit() {
    
  }


  bindCity() {
    debugger;
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
