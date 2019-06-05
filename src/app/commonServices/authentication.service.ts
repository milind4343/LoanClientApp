import { Injectable } from "@angular/core";
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationService {
    
    constructor(private router:Router) {

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

}