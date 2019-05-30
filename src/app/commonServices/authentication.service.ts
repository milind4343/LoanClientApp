import { Injectable } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthenticationService {
    
    constructor(private router:Router,private actvieRoute : ActivatedRoute) {

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