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

  imgUrl: any;
  formData: FormData = new FormData();

  alphaonly = "[a-zA-Z]*";

  constructor(private agentService: AgentService, router: Router, private toastrService: NbToastrService) {
    this.max = new Date();
    this.imgUrl = "assets/images/user-placeholder.png";
  }

  ngOnInit() {  
    this.user.userId = 0; 
    this.state = [];
    this.agentService.getState().then(result => {
      if (result != null) {
        this.state.push({ id: '', name: "--Select State--" });
        result.forEach(element => {
          this.state.push({ id: element.stateId, name: element.stateName })
        });
      }
    }).catch(err => {
      console.log(err);
    })
    
    debugger;
    if(this.userId>0 || this.userId==undefined){
      this.agentService.editAgent(this.userId).subscribe(result =>{
      debugger;
      this.onStateSelect(result.stateId);
      this.onCitySelect(result.cityId);
      debugger;
      this.user = result;
      this.user.dob=new Date(result.dob);
      if(result.profileImageURL != null){
        this.imgUrl = result.profileImageURL;
      }    
      });
    }
    else {
      this.user.userId = 0;
      this.user.stateId = '';
    }
  }

  fileProgress(fileInput: any) {
    var reader = new FileReader();
    let fileToUpload = <File>fileInput[0];
    if(fileToUpload.type == 'image/jpeg' || fileToUpload.type == 'image/jpg' || fileToUpload.type == 'image/png')
    {
      this.formData.append('file', fileToUpload, fileToUpload.name);
      reader.readAsDataURL(fileInput[0]);
      reader.onload = (_event) => {
        this.imgUrl = reader.result;
      }
    }
    else
    {
      this.toastrService.danger('choose image in jpg/png format !', 'Failed', this.config);
      this.imgUrl = "assets/images/user-placeholder.png";
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

      this.formData.append("agent", JSON.stringify(this.user));

      this.agentService.register(this.formData).then(result => {
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
