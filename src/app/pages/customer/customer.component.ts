import { Component, OnInit } from '@angular/core';
import { PageAccessService } from '../../commonServices/getpageaccess.service';

@Component({
  selector: 'ngx-customer',
  template: '<router-outlet></router-outlet>'
})
export class CustomerComponent implements OnInit {
  constructor() { }

  ngOnInit() {
    
  }

}
