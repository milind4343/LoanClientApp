import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../customer';
import { CustomerService } from '../customer.service';
import { AgentService } from '../../agent/agent.service';

@Component({
  selector: 'ngx-customer-add',
  templateUrl: './customer-add.component.html',
  styleUrls: ['./customer-add.component.scss']
})
export class CustomerAddComponent implements OnInit {

  customer:Customer = new Customer();
  state: any;

  constructor(private customerservice: CustomerService, private agentservice: AgentService) {
  }

  ngOnInit() {
   
    this.state=[];
    this.agentservice.getState().then(result=>{
      if(result!=null){
        console.log(result);
       // this.state.push({id:'0', name:'--- Select State ---'});
        result.forEach(element => {
          this.state.push({id: element.stateId, name:element.stateName})
        });
        this.customer.stateId= '';
      }
    })


  }

  register(){
    debugger;
    this.customerservice.registerCustomer(this.customer).then(result=>{
      if(result.status != null){
        console.log(result);
      }
    });
  }

}
