import { Directive, Input } from '@angular/core';
import { AsyncValidator, AbstractControl, ValidationErrors, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Directive({
  selector: '[uniqueUid]',
  providers: [{ provide: NG_ASYNC_VALIDATORS, useExisting: UniqueUidValidatorDirective, multi: true }]
})
export class UniqueUidValidatorDirective implements AsyncValidator {

  @Input() uniqueUid: string;

  constructor(private userservice: UserService) { }

  validate(c: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    debugger;
    return this.userservice.getUserByUid(c.value, this.uniqueUid).pipe(
      map(users => {
        debugger;
        return users != null ? { 'uniqueUid': true } : null;
      })
    );
  }

}
