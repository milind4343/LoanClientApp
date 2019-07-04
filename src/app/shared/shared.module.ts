import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UniqueNameValidatorDirective } from './unique-name-validator.directive';

@NgModule({
  declarations: [
    UniqueNameValidatorDirective
  ],
  imports: [
    CommonModule
  ],
  exports:[
    UniqueNameValidatorDirective
  ]
})
export class SharedModule { }
