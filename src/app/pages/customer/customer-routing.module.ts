import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';

const routes: Routes = [{
  path: '',
  component: CustomerComponent,
  children:[{
    path: 'list',
    component: CustomerListComponent
  },{
    path: 'add',
    component: CustomerAddComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
