import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniqueNameValidatorDirective } from './unique-name-validator.directive';
import { MaxLoanValidatorDirective } from './max-loan-validator.directive';
import { UniqueUidValidatorDirective } from './unique-uid-validator.directive';

@NgModule({
  declarations: [
    UniqueNameValidatorDirective,
    MaxLoanValidatorDirective,
    UniqueUidValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    UniqueNameValidatorDirective,
    MaxLoanValidatorDirective,
    UniqueUidValidatorDirective
  ]
})
export class SharedModule { }
