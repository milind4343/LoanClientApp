import { AsyncValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import { UserService } from '../../shared/user.service';

export function emailExistValidator(userService: UserService): AsyncValidatorFn {
  return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {
    return userService.getUserByEmail(control.value,'3').map(
      users => {
        return (users && users.length > 0) ? {"emailExists": true} : null;
      }
    );
  };
} 