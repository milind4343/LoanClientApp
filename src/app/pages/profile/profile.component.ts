import { Component, OnInit } from '@angular/core';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { AgentService } from '../agent/agent.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { PasswordValidation } from './PasswordValidation';
import { UserValidators } from './validator/user.validator';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

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
  isdrpbind:Boolean=false;

  constructor(private agentService: AgentService, private toastrService: NbToastrService, 
    private fb: FormBuilder, private service: UserValidators, private router : Router) 
    {    
      this.max = new Date();
      this.agentService.editProfile().subscribe(result =>{                
        this.createForm(result);
        this.onStateSelect(result.stateId, this.isdrpbind);
        this.onCitySelect(result.cityId, this.isdrpbind);
    });
  }

  
  ngOnInit() {
    
    this.state=[];
    this.agentService.getState().then(result => {
      if (result != null) {       
        result.forEach(element => {
          this.state.push({id : element.stateId , name : element.stateName})
        });
         this.user.Gender="Male";
      }
    }).catch(err => {
      //console.log(err);
    })    
  }

  createForm(user)
  {
    debugger;
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
    return this.registerForm.controls; 
  }
 
  onSubmit() {  
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.valid) {
      this.agentService.updateprofile(this.registerForm.value).then(result => {
        if (result != null) {
          if(this.user.userId>0)
          {
            //this.router.navigate(['/pages/dashboard']);           
            this.toastrService.success('Profile Updated Successfully !','Success',this.config);          
          }
          else{          
            //this.router.navigate(['/pages/dashboard']);
            this.toastrService.success('Profile Updated Successfully !','Success',this.config);           
          }
        }
        else
        {
          this.toastrService.success('Profile Updated failed !','Failed',this.config);
        }
    }).catch(err => {
      //console.log(err);
      this.toastrService.danger('Something went wrong !','Failed',this.config);
    })
    }
  }

  onStateSelect(stateId,ischange) {
    debugger;
    this.isdrpbind=ischange;
    this.city = [];
    this.agentService.getCity(+stateId).then(result => {
      if (result != null && result.length>0) {       
        result.forEach(element => {
          this.city.push({id : element.id , name : element.name})
        });
        if(this.isdrpbind)
        this.registerForm.get('cityId').setValue("");
      }
      else
      {
        this.city=[];
        this.user.cityId='';
        this.area=[];
        this.user.areaId='';
      }
    }).catch(err => {
      //console.log(err);
    })
  }

  onCitySelect(cityId,ischange) {
    this.isdrpbind=ischange;
    debugger
    this.area = [];
    this.user.cityId="";
    this.agentService.getArea(+cityId).then(result => {
      if (result != null && result.length > 0) {       
        result.forEach(element => {
          this.area.push({id : element.id , name : element.name})
        });
        if(this.isdrpbind)
        this.registerForm.get('zipcode').setValue("");
      }
      else{
        this.area = [];
      }
    }).catch(err => {
      //console.log(err);
    })
  }

  cancle()
  {
    this.user={};
  }
}
