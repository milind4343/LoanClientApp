import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniqueNameValidatorDirective } from './unique-name-validator.directive';
import { MaxLoanValidatorDirective } from './max-loan-validator.directive';

@NgModule({
  declarations: [
    UniqueNameValidatorDirective,
    MaxLoanValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    UniqueNameValidatorDirective,
    MaxLoanValidatorDirective
  ]
})
export class SharedModule { }
