import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Http ,Headers} from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
  private agenturl = environment.domain + '/api/agent';
    constructor(private router:Router,private http: Http) {
    }

    canActivate(): boolean {
        if(localStorage.getItem("jwt") === '' || localStorage.getItem("jwt") === null) {
                return true;
        }
        else {  
            this.router.navigate(['dashboard']);
            return false;
        }
    }

    getLoggedInUserDetail() : Observable<any> {
        let token = "Bearer " + localStorage.getItem('jwt');
        let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization':token });
       return this.http.get(this.agenturl + '/loggedinuser', { headers: headers })
      .map(res => res.json());
    }


}