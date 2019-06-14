import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
//import { PageAccessService } from '../../commonServices/getpageaccess.service';

@Component({
  selector: 'ngx-customer',
  template: '<router-outlet></router-outlet>'
})
export class CustomerComponent implements OnInit {
  constructor() { }
  
  ngOnInit() {
  }

}
