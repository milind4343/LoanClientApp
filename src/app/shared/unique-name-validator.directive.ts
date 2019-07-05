import { Directive, Input } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[uniqueEmail]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueNameValidatorDirective, multi: true }]
})
export class UniqueNameValidatorDirective implements AsyncValidator {

  @Input() uniqueEmail: string;

  constructor(private userservice: UserService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    debugger;
    return this.userservice.getUserByEmail(c.value, this.uniqueEmail).pipe(
      map(users => {
        debugger;
        return users != null ? { 'uniqueEmail': true } : null;
      })
    );
  }

}
