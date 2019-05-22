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
  state: any=[];
  city: any=[];
  area: any=[];
  

  constructor(private agentService: AgentService,router: Router) { }
  ngOnInit() {
    this.state=[];
    this.agentService.getState().then(result => {
      if (result != null) {
        this.state.push({id: 0,name: "--Select State--"});
        result.forEach(element => {
          this.state.push({id : element.stateId , name : element.stateName})
        });
        this.user.stateId=0;
      }
    }).catch(err => {
      console.log(err);
    })
  }

  onStateSelect(stateId) {
    this.city = [];
    this.agentService.getCity(+stateId).then(result => {
      if (result != null) {
        debugger
        this.city.push({id: 0,name: "--Select City--"});
        result.forEach(element => {
          this.city.push({id : element.id , name : element.name})
        });
        this.user.CityID=0;
      }
    }).catch(err => {
      console.log(err);
    })
  }

  onCitySelect(cityId) {
    this.area = [];
    this.agentService.getCity(+cityId).then(result => {
      if (result != null) {
        debugger
        this.area.push({id: 0,name: "--Select City--"});
        result.forEach(element => {
          this.area.push({id : element.id , name : element.name})
        });
        this.user.cityId=0;
      }
    }).catch(err => {
      console.log(err);
    })
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
