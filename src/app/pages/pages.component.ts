import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { ActiveLink } from '../auth/auth.model';
import { LoaderService } from '../commonServices/loader.service';
import { EncrDecrService } from '../commonServices/encrdecr.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { PageService } from './page.service';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit  {
  activeLinks : any;
  menu : NbMenuItem[];

  constructor(public loader: LoaderService, private router: Router, private EncrDecr: EncrDecrService, private pageService: PageService) {
  }

  // ngOnInit() {
  //   if(this.activeLinks === undefined || this.activeLinks.length === 0 ) {
  //     this.activeLinks = new Array<ActiveLink>();
  //     this.activeLinks.push({home:true,icon:'nb-home',link:'/pages/dashboard',title:'Dashboard'});
  //     // this.activeLinks.push({home:false,icon:'nb-star',link:'',title:'Extra Components',children:[{title: 'Calendar',link: '/pages/extra-components/calendar'},{title: 'Stepper',link: '/pages/extra-components/stepper'}]});
  //     this.activeLinks.push({home:true,icon:'nb-compose',link:'/pages/agent/register',title:'Agent Registration'});
  //     this.activeLinks.push({home:true,icon:'nb-person',link:'/pages/customer', title: 'Customers'});
  //     this.menu = this.activeLinks;
  //   }
  // }

  ngOnInit() {
    //this.menu = MENU_ITEMS;
    if(this.activeLinks === undefined || this.activeLinks.length === 0 ) {
      let item = localStorage.getItem("encryptkey");
      if (item == "" || item == null) {
        this.loader.loader = true;
        this.pageService.getMenuList().then((result) => {
          if (result !== null) {
      this.activeLinks = new Array<ActiveLink>();
            this.activeLinks.push({ home: true, icon: "nb-home", link: '/pages/dashboard', title: 'Dashboard' });
            for (let i = 0; i < result.length; i++) {
              debugger;
              if (result[i].home) {
                this.activeLinks.push({ home: result[i].home, icon: result[i].iconname, link: result[i].routelink, title: result[i].title, isadd:result[i].isadd,isedit:result[i].isedit, isdelete:result[i].isdelete, ischangestatus:result[i].ischangestatus });
              }
              else {
                let subActiveLinks = [];
                result[i].children.forEach(element => {
                  subActiveLinks.push({ link: element.routelink, title: element.title, isadd:result[i].isadd,isedit:result[i].isedit, isdelete:result[i].isdelete, ischangestatus:result[i].ischangestatus  });
                });
                this.activeLinks.push({ home: result[i].home, icon: result[i].iconname, link: result[i].routelink, title: result[i].title, children: subActiveLinks });
              }
            }

      //this.activeLinks.push({home:true,icon:'nb-person',link:'/pages/customer/loan', title: 'CustomerLoan'});
      
      this.menu = this.activeLinks;
            var encrypted = this.EncrDecr.set(environment.encryptkey, JSON.stringify(this.activeLinks));
            localStorage.setItem("encryptkey", encrypted);
            this.loader.loader = false;
            if (!this.checkAccessPage()) {
              this.router.navigate(['/pages/miscellaneous/401']);
    }
            this.loader.loader = false;
  }
        }).catch((error) => {
          this.loader.loader = false;
          if (error.status == 401) {
            localStorage.setItem("jwt", "");
            localStorage.setItem("encryptkey", "");
            this.router.navigate(['/auth/login']);
          }
        });
      }
      else {
        item = this.EncrDecr.get(environment.encryptkey, item);
        let menuitem = JSON.parse(item);
        this.menu = menuitem;
      }
    }
  }

  checkAccessPage(): Boolean {
    let routerurl = this.router.url;
    if (routerurl !== "/" && routerurl !== "/auth/login") {
      for (let i = 0; i < this.activeLinks.length; i++) {
        if (this.activeLinks[i].link === routerurl) {
          return true;
}
        else {
          if (this.activeLinks[i].children) {
            for (let j = 0; j < this.activeLinks[i].children.length; j++) {
              if (this.activeLinks[i].children[j].link == routerurl) {
                return true;
              }
            }
          }
        }
      }
      return false;
    }
    else
      return true;
  }

}
