import { Component, OnInit } from '@angular/core';
import { NbMenuItem } from '@nebular/theme';
import { ActiveLink } from '../auth/auth.model';
import { MENU_ITEMS } from './pages-menu';

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

  constructor() {
  }

  ngOnInit() {
    //this.menu = MENU_ITEMS;
    if(this.activeLinks === undefined || this.activeLinks.length === 0 ) {
      this.activeLinks = new Array<ActiveLink>();
      this.activeLinks.push({home:true,icon:'nb-home',link:'/pages/dashboard',title:'Dashboard'});
      // this.activeLinks.push({home:false,icon:'nb-star',link:'',title:'Extra Components',children:[{title: 'Calendar',link: '/pages/extra-components/calendar'},{title: 'Stepper',link: '/pages/extra-components/stepper'}]});
      // this.activeLinks.push({home:true,icon:'nb-compose',link:'/pages/agent/register',title:'Agent Registration'});
      this.activeLinks.push({home:true,icon:'nb-person',link:'/pages/agent/list',title:'Agents'});
      this.activeLinks.push({home:true,icon:'nb-person',link:'/pages/customer/list', title: 'Customers'});

      this.activeLinks.push({home:true,icon:'nb-person',link:'/pages/customer/loan', title: 'CustomerLoan'});
      
      this.menu = this.activeLinks;
    }
  }

}
