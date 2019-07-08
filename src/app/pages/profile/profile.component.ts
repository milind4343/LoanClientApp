import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { AgentService } from '../agent/agent.service';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { PasswordValidation } from './PasswordValidation';
import { UserValidators } from './validator/user.validator';
import { control } from 'leaflet';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  // registrationForm: FormGroup;
  registerForm: FormGroup;
  
  passwordvalid:boolean=true;
  user: any = {};
  state: any=[];
  city: any=[];
  area: any=[];
  submitted:boolean=false;
  validate:boolean=false;
  max: Date;
  config = {
    position: NbGlobalPhysicalPosition.TOP_RIGHT
  };
  iscomparepassword:boolean=true;

  constructor(private agentService: AgentService,router: Router,private toastrService: NbToastrService,private fb: FormBuilder,private service: UserValidators) { 
    this.max = new Date();
    this.agentService.editProfile().subscribe(result =>{
      this.createForm(result)
      //this.registerForm = this.createFormGroup();
      //this.createFormGroup(result);
      this.onStateSelect(result.stateId);
      this.onCitySelect(result.cityId);
      //this.user = result;
      // this.registerForm.controls.firstname.setValue(result.firstname);
      // this.registerForm.controls.lastname.setValue(result.lastname);
      // this.registerForm.controls.middlename.setValue(result.middlename);
      //this.user.dob=new Date(result.dob);
      //this.user.password="";
    });
  }

  
  ngOnInit() {
    this.state=[];
    this.agentService.getState().then(result => {
      if (result != null) {
        this.state.push({id:'',name: "--Select State--"});
        result.forEach(element => {
          this.state.push({id : element.stateId , name : element.stateName})
        });
         this.user.Gender="Male";
      }
    }).catch(err => {
      console.log(err);
    })

    
  }

  createForm(user)
  {
    this.registerForm = this.fb.group({
      firstname: [user.firstname, Validators.required],
      middlename: [user.middlename, Validators.required],
      lastname: [user.lastname, Validators.required],
      dob: [new Date(user.dob), Validators.required],
      emailId: [user.emailId, [Validators.required, Validators.email],[this.service.userValidator(user.userId)]],
      password: [''],
      confirmPassword: [''],
      mobile:[user.mobile,Validators.required],
      phone:[user.phone,Validators.required],
      address:[user.address,Validators.required],
      stateId:[user.stateId,Validators.required],
      cityId:[user.cityId,Validators.required],
      zipcode:[user.zipcode,Validators.required],
      gender:[user.gender,Validators.required],
      userId:[user.userId],
      roleid:[user.roleid],
  },
  {
    validator: PasswordValidation.MatchPassword // your validation method
  });
}

  get f() {
    debugger;
    return this.registerForm.controls; 
  }
 
  onSubmit() {
    debugger;
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.valid) {
      this.agentService.updateprofile(this.registerForm.value).then(result => {
        if (result != null) {
          if(this.user.userId>0)
          {
            this.registerForm.reset();
            this.toastrService.success('Profile update success !','Success',this.config);
          }
          else{
            this.registerForm.reset();
            this.toastrService.success('Profile update success !','Success',this.config);
          }
        }
        else
        {
          this.toastrService.success('Profile update failed !','Failed',this.config);
        }
    }).catch(err => {
      console.log(err);
      this.toastrService.danger('Something went wrong !','Failed',this.config);
    })
    }

    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
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
    this.area = [];
    this.agentService.getArea(+cityId).then(result => {
      if (result != null) {
        debugger
        this.area.push({id:'',name: "--Select Area--"});
        result.forEach(element => {
          this.area.push({id : element.id , name : element.name})
        });
      }
    }).catch(err => {
      console.log(err);
    })
  }

  registration(form:any){
    debugger;
    if(form.valid)
      {
        this.agentService.register(this.user).then(result => {
        if (result != null) {
          if(this.user.userId>0)
          {
            this.toastrService.success('Profile update success !','Success',this.config);
          }
          else{
            this.toastrService.success('Profile update success !','Success',this.config);
          }
        }
        else
        {
          this.toastrService.success('Profile update failed !','Failed',this.config);
        }
    }).catch(err => {
      console.log(err);
      this.toastrService.danger('Something went wrong !','Failed',this.config);
    })
  }
}

  cancle()
  {
    debugger;
    this.user={};
  }
}
