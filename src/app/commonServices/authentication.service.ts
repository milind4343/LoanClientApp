import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Http, Headers } from "@angular/http";
import { environment } from '../../environments/environment';

@Injectable()
export class AuthenticationService {
    
    private staticDataUrl  = environment.domain + '/api/staticdata';    
    private  token = 'Bearer'+' '+localStorage.getItem('jwt');
    private headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': this.token });

    constructor(private router:Router, private http : Http) {

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
        debugger;
        return this.http.get(this.staticDataUrl + '/loggedinuser', { headers: this.headers })
        .map(res => res.json());
    }

}