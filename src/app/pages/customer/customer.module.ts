import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { CustomerComponent } from './customer.component';
import { DataTablesModule } from 'angular-datatables';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerLoanAddComponent } from './customer-loan-add/customer-loan-add.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { UiSwitchModule } from 'ngx-toggle-switch';


@NgModule({
  declarations: [CustomerListComponent, CustomerComponent, CustomerAddComponent, CustomerLoanAddComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    ThemeModule,
    Ng2SmartTableModule,
    DataTablesModule,
    SelectDropDownModule,
    UiSwitchModule
  ]
})
export class CustomerModule { }
