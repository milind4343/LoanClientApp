import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { LoaderService } from './loader.service';

@Injectable()
export class ExceptionHandler {
    
    constructor(private router : Router,private loader : LoaderService) {

    }

    handleExcption(error : any) {
        debugger;
        this.loader.loader = false;
        if(error.status == 401) {
            this.router.navigate(['/auth/login']);
            localStorage.removeItem('jwt');
        }
        else {
            this.router.navigate(['/pages/miscellaneous/404']);
            //will add new exception page.
        }
    }
}