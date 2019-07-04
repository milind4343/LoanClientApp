import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AgentService } from '../agent.service';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-registration',
  templateUrl: './agent-registration.component.html',
  styleUrls: ['./agent-registration.component.scss'],
  //styles:['input.ng-invalid {border-color: red}']
})

export class RegistrationComponent {
  @Input() userId: number;
  @Output() onPageChange = new EventEmitter<string>();
  user: any = {};
  state: any = [];
  city: any = [];
  area: any = [];
  submitted: boolean = false;
  validate: boolean = false;
  max: Date;
  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT
  };

  constructor(private agentService: AgentService, router: Router, private toastrService: NbToastrService) {
    this.max = new Date();
  }

  ngOnInit() {   
    this.state = [];
    this.agentService.getState().then(result => {
      if (result != null) {
        this.state.push({ id: '', name: "--Select State--" });
        result.forEach(element => {
          this.state.push({ id: element.stateId, name: element.stateName })
        });
        this.user.Gender = "Male";
      }
    }).catch(err => {
      console.log(err);
    })

    if (this.userId > 0 || this.userId == undefined) {
      this.agentService.editAgent(this.userId).subscribe(result => {
        this.onStateSelect(result.stateId);
        this.onCitySelect(result.cityId);
        this.user = result;
      });
    }
    else {
      this.user.userId = 0;
      this.user.stateId = '';
      this.user.gender = "Male";
    }
  }

  onStateSelect(stateId) {
    this.city = [];
    this.agentService.getCity(+stateId).then(result => {
      if (result != null && result.length > 0) {
        this.city.push({ id: '', name: "--Select City--" });
        result.forEach(element => {
          this.city.push({ id: element.id, name: element.name })
        });
      }
      else {
        this.city = [];
        this.user.cityId = '';
        this.area = [];
        this.user.areaId = '';
      }
    }).catch(err => {
      console.log(err);
    })
  }

  onCitySelect(cityId) {   
    this.area = [];
    this.agentService.getArea(+cityId).then(result => {
      if (result != null) {
        this.area.push({ id: '', name: "--Select Area--" });
        result.forEach(element => {
          this.area.push({ id: element.id, name: element.name })
        });
      }
    }).catch(err => {
      console.log(err);
    })
  }

  registration(form: any) {
    if (form.valid) {
      this.agentService.register(this.user).then(result => {
        if (result != null) {
          if (this.user.userId > 0) {
            this.toastrService.success('Data update success !', 'Success', this.config);
            this.onPageChange.emit('List');
          }
          else {
            this.toastrService.success('Registration success !', 'Success', this.config);
            this.onPageChange.emit('List');
          }
        }
        else {
          this.toastrService.success('Registration failed !', 'Failed', this.config);
        }
      }).catch(err => {
        console.log(err);
        this.toastrService.danger('Something went wrong !', 'Failed', this.config);
      })
    }
  }

  cancle() {
    this.user = {};
    this.userId = 0;
    this.onPageChange.emit('List');
  }

}
