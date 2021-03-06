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
  state: any=[];
  city: City[];
  

  constructor(private agentService: AgentService,router: Router) { }
  ngOnInit() {
    debugger;
    this.agentService.getState().then(result => {
      if (result != null) {
        debugger
        this.state.push({id: 0,name: "--Select State--"});
        result.forEach(element => {
          this.state.push({businessUnitPk : element.businessUnitPk , description : element.description})
        });
          this.state=result;
      }
    }).catch(err => {
      console.log(err);
    })
  }

  onSelect(countryid) {
    // this.states = this.selectService.getStates().filter((item) => item.countryid == countryid);
  }

registration(){
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

  bindCity() {
 
  }
}
