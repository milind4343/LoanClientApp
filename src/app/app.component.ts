/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { LoaderService } from './commonServices/loader.service';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(public loader:LoaderService, private menuService: NbMenuService, private route: Router) {
    this.menuService.onItemClick()
    .subscribe((event) => {
      this.onContecxtItemSelection(event.item.title);
  });
  }

  ngOnInit(): void {
   this.loader.loader = false;
  }

  onContecxtItemSelection(title : string){
    debugger;
    if(title == 'Log out'){
      this.loader.loader = true;
      setTimeout(()=>{
        localStorage.removeItem('jwt');
        localStorage.removeItem('encryptkey');
        this.route.navigate(['/auth/login']);
        this.loader.loader = false;
      },500);
     
    }
    else if(title=="Profile")
    {
      this.loader.loader = true;
      setTimeout(()=>{
        this.route.navigate(['pages/profile']);
        this.loader.loader = false;
      },500);
    }

  }

  

}
