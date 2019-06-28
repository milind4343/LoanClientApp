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

  constructor(public loader: LoaderService, private customerservice: CustomerService, 
    private agentservice: AgentService, private toastrService: NbToastrService,private pageAccessService: PageAccessService) {
      
      debugger;
      console.log(this.editUserID);
      this.imgUrl = "assets/images/user-placeholder.png";
  }

  ngOnInit() {
    debugger;
    this.pageaccesscontrol = this.pageAccessService.getAccessData(); //used in future to disable add/delete/view button ad per role-rights 
    this.customer.cityId = "";
    this.customer.zipcode = "";
    let userId = this.editUserID;
    if (userId > 0) {
      this.getCustomer(userId);
    }
    this.getState();
  }

  getCustomer(userID: number) {
  
    this.customerservice.getCustomers(userID).subscribe(result => {
      this.formData = new FormData();
      this.customer = result[0];      
      debugger;
      if(result[0].profileImageURL != null){
        this.imgUrl = result[0].profileImageURL;
      }      
      this.onStateSelect(this.customer.stateId);
      this.onCitySelect(this.customer.cityId);
    })
  }

  fileProgress(fileInput: any) {
    //this.fileData = <File>fileInput.target.files[0];
    var reader = new FileReader();
    let fileToUpload = <File>fileInput[0];
    this.formData.append('file', fileToUpload, fileToUpload.name);
    reader.readAsDataURL(fileInput[0]);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;
    }
  }
  
  register(form: any) {
    debugger;
    if (form.valid) {
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
debugger;
      this.formData.append("customer", JSON.stringify(this.customer));

      //this.customerservice.registerCustomer(this.customer).then(result=>{
      this.customerservice.registerCustomer(this.formData).subscribe(result => {
        debugger;
        if (result.success) {

          this.editUserID = 0;
          this.callParent.emit('List');

          this.toastrService.show(
            "Customer Added Successfully",
            "Success",
            config);
        }
        else {
          config.status = NbToastStatus.DANGER;
          this.toastrService.show(
            "Something goes wrong!",
            "Error",
            config);
        }
        this.loadingMediumGroup = false;
        this.loader.loader = false;
      },err => {

        config.status = NbToastStatus.DANGER;

        this.toastrService.show(
          "Something goes wrong!",
          "Error",
          config);
        this.loader.loader = false;
        this.loadingMediumGroup = false;
      });
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
    debugger;
    this.agentservice.getCity(stateId).then(result => {

      if (result != null && result.length > 0) {

        result.forEach(element => {
          this.city.push({ id: element.id, name: element.name })
        });
        if (!(this.editUserID > 0))
          this.customer.cityId = "";
      }
      else {
        this.city = [];
      }
    });
  }

  onCitySelect(cityId: string) {
    this.agentservice.getArea(cityId).then(result => {
      if (result != null && result.length > 0) {
        result.forEach(e => {
          this.areacode.push({ id: e.id, name: e.name });
        })

        if (!(this.editUserID > 0))
          this.customer.zipcode = "";
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
