import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { Observable, timer } from 'rxjs';
import { map, switchMap  } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserValidators {
  private URL = environment.domain + '/api/common';
  private header = new HttpHeaders({ 'Content-Type': 'application/json' });
  constructor(private http: HttpClient) {}

  searchUser(email,userid) {
    return timer(1000)
      .pipe(
        switchMap(() => {
          // Check if username is available
          // return this.http.get<any>(`${URL}/users?username=${emailId}`)
           return this.http.get<any>( this.URL+ '/isuniquemail/' + email + '/' + userid, { headers: this.header });
        })
      );
  }

    userValidator(userid): AsyncValidatorFn {      
      return (control: AbstractControl): Observable<{ [key: string]: any } | null> => {
        let emailId = control.value; // to get value in input tag
        //let userId = control.get("userId").value; // to get value in input tag
        
        return this.searchUser(emailId,userid)
          .pipe(
            map(res => {
              // if username is already taken
              if (res!=null) {
                // return error
                return { 'emailExists': true};
              }
            })
          );
      };

    }

}
