import { Component, OnInit } from '@angular/core';
import { AgentService } from '../agent.service';
import { Router } from '@angular/router';
import 'style-loader!angular2-toaster/toaster.css';
import {NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';


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
  submitted:boolean=false;
  validate:boolean=false;
  min: Date;
  max: Date;
  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT
  };


  constructor(private agentService: AgentService,router: Router,private toastrService: NbToastrService) { 
    this.max = new Date();
   
  }


  ngOnInit() {
    this.state=[];
    this.agentService.getState().then(result => {
      if (result != null) {
        this.state.push({id:'',name: "--Select State--"});
        result.forEach(element => {
          this.state.push({id : element.stateId , name : element.stateName})
        });
        this.user.stateId='';
        // this.user.cityId='';
        // this.user.areaId='';
         this.user.Gender="Male";
      }
    }).catch(err => {
      console.log(err);
    })
  }

  onStateSelect(stateId) {
    this.city = [];
    this.agentService.getCity(+stateId).then(result => {
      if (result != null && result.length>0) {
        debugger
        this.city.push({id: '',name: "--Select City--"});
        result.forEach(element => {
          this.city.push({id : element.id , name : element.name})
        });
        this.user.cityId='';
      }
      else
      {
        this.city=[];
        this.user.cityId='';
        this.area=[];
        this.user.areaId='';
      }
    }).catch(err => {
      console.log(err);
    })
  }

  onCitySelect(cityId) {
    debugger;
    this.area = [];
    this.agentService.getArea(+cityId).then(result => {
      if (result != null) {
        debugger
        this.area.push({id:'',name: "--Select Area--"});
        result.forEach(element => {
          this.area.push({id : element.id , name : element.name})
        });
        this.user.areaId='';
      }
    }).catch(err => {
      console.log(err);
    })
  }

registration(){
  debugger;
  if(this.submitted && this.validate)
    {
      this.agentService.register(this.user).then(result => {
      if (result != null) {
        //localStorage.setItem("jwt", result.AccessToken);
        //this .router.navigate(['dashboard']);
        this.toastrService.success('Registration success !','Success',this.config);
      }
      else
      {
        this.toastrService.success('Registration failed !','Failed',this.config);
      }
  
  }).catch(err => {
    console.log(err);
    this.toastrService.danger('Something went wrong !','Failed',this.config);
  })
  }
}

makeToast() {
  
}
  
}
