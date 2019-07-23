import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { AgentService } from '../../agent/agent.service';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { ToasterConfig } from 'angular2-toaster';
import { LoaderService } from '../../../commonServices/loader.service';
import { PageAccessService } from '../../../commonServices/getpageaccess.service';


@Component({
  selector: 'ngx-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})

export class CustomerAddComponent implements OnInit {
  @Input() editUserID: number;
  @Output() callParent = new EventEmitter<string>();
  submitted: boolean = false;
  //fileData: File = null;
  imgUrl: any;
  formData: FormData = new FormData();

  customer: Customer = new Customer();
  customerlist: Customer[] = [];
  state: any = [];
  city: any = [];
  areacode: any = [];
  pageaccesscontrol:any={};
  loadingMediumGroup = false;

  config: ToasterConfig;
  status = NbToastStatus.SUCCESS;
  destroyByClick = true;
  duration = 3000;
  hasIcon = true;
  position = NbGlobalPhysicalPosition.TOP_RIGHT;
  preventDuplicates = true;
  max: Date;

  alphaonly = "[a-zA-Z]*";
  numonly = "[0-9]*";
  //emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

  constructor(public loader: LoaderService, private customerservice: CustomerService, 
    private agentservice: AgentService, private toastrService: NbToastrService,
    private pageAccessService: PageAccessService) {            
      
      this.imgUrl = "assets/images/user-placeholder.png";
      this.max = new Date();
  }

  ngOnInit() {   
    this.customer.userID = 0;
    this.pageaccesscontrol = this.pageAccessService.getAccessData(); //used in future to disable add/delete/view button ad per role-rights 
    this.customer.cityId = '';
    this.customer.zipcode = '';
    let userId = this.editUserID;
    this.getState();
    if (userId > 0) {
      this.getCustomer(userId);
    }
    else{
      this.customer.cityId = '';
      this.customer.zipcode = '';
    }
  }

  getCustomer(userID: number) {  
    this.customerservice.getCustomers(userID).subscribe(result => {
      this.formData = new FormData();
      if(result[0].profileImageURL != null){
        this.imgUrl = result[0].profileImageURL;
      }  
      this.onStateSelect(result[0].stateId);
      this.onCitySelect(result[0].cityId);
      this.customer = result[0];  
      this.customer.dob=new Date(result[0].dob);    
      this.customer.gender = result[0].gender.toUpperCase();
    })
  }

  fileProgress(fileInput: any) {
    //this.fileData = <File>fileInput.target.files[0];
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
      return false;
      //this.imgUrl = "assets/images/user-placeholder.png";
    }    
  }
  
  register(form: any) {   
    this.loader.loader = true;
    if (form.valid) 
    {
      this.loader.loader = true;
      this.loadingMediumGroup = true;

      const config = {
        status: this.status,
        destroyByClick: this.destroyByClick,
        duration: this.duration,
        hasIcon: this.hasIcon,
        position: this.position,
        preventDuplicates: this.preventDuplicates
      };
      //let ddt = JSON.stringify(this.customer.dob);
      //JSON.parse(ddt);
      //console.log(JSON.parse(this.customer.dob));
      this.customer.dob = new Date(this.customer.dob.toISOString());
      this.formData.append("customer", JSON.stringify(this.customer));

      //this.customerservice.registerCustomer(this.customer).then(result=>{
      this.customerservice.registerCustomer(this.formData).subscribe(result => {        
        if (result.success) {
          this.editUserID = 0;
          this.callParent.emit('List');
          this.loader.loader = false;
          this.toastrService.show(
            "Customer Added Successfully",
            "Success",
            config);
        }
        else {
          this.loader.loader = false;
          config.status = NbToastStatus.DANGER;
          this.toastrService.show(
            "Something goes wrong!",
            "Error",
            config);
        }
        this.loadingMediumGroup = false;        
      },err => {
        this.loader.loader = false;
        config.status = NbToastStatus.DANGER;
        this.toastrService.show(
          "Something goes wrong!",
          "Error",
          config);
        
        this.loadingMediumGroup = false;
      });
    }
    else
    {
      this.loader.loader = false;
    }
  }

  getState() {
    this.agentservice.getState().then(result => {
      if (result != null) {
        result.forEach(element => {
          this.state.push({ id: element.stateId, name: element.stateName })
        });
        if (!(this.editUserID > 0))
          this.customer.stateId = "";
      }
    })
  }

  onStateSelect(stateId: string) {
    this.city = [];
    this.customer.cityId = "";
    this.customer.zipcode = '';
    this.agentservice.getCity(stateId).then(result => {
      if (result != null && result.length > 0) {
        debugger;
        result.forEach(element => {
          this.city.push({ id: element.id, name: element.name })
        });
      }
      else {
        this.city = [];
        this.areacode = [];
      }
    });
  }

  onCitySelect(cityId: string) {
    this.areacode = [];  
    this.customer.zipcode = '';  
    this.agentservice.getArea(cityId).then(result => {
      if (result != null && result.length > 0) {
        debugger
        result.forEach(e => {
          this.areacode.push({ id: e.id, name: e.name });
        })
      }
      else {
        this.areacode = [];
      }
    });
  }

  cancelForm() {
    this.editUserID = 0;
    this.callParent.emit('List');
  }
}
