import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { environment  } from '../../environments/environment';
import { EncrDecrService } from '../commonServices/encrdecr.service';

@Injectable()
export class PageAccessService {
    
    constructor(private EncrDecr: EncrDecrService,private router : Router) {

    }

    /*This function used for check page access or not*
     * 
     */
    getAccessData() : any{
        let routerurl = this.router.url;
        let item = localStorage.getItem("encryptkey");
        item = this.EncrDecr.get(environment.encryptkey,item);
        let menulist = JSON.parse(item);
        if(routerurl !== "/" && routerurl !== "/auth/login" && menulist.length > 0) { 
          for(let i=0; i< menulist.length; i++) {
              if(menulist[i].link === routerurl) {
                  return menulist[i];
              }
              else {
                if(menulist[i].children) {
                  for(let j=0; j < menulist[i].children.length; j++) {
                    if(menulist[i].children[j].link == routerurl) {
                        return menulist[i].children[j];
                    }
                  }   
                }
              }
          } 
          this.router.navigate(['/pages/miscellaneous/401']);
        }
    }

}