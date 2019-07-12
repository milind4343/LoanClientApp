import { Directive } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationService } from '../commonServices/authentication.service';

@Directive({
  selector: '[maxLoan]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: MaxLoanValidatorDirective, multi: true }]
})

export class MaxLoanValidatorDirective implements AsyncValidator {

  constructor(private authservice: AuthenticationService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {    
    return this.authservice.getLoggedInUserDetail().pipe(
      map(users => {        
        return c.value >= users.lb ? {'maxLoan':true} : null;         
      })
    );
  }

}
