import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { ExceptionHandler } from '../../../commonServices/exceptionhandler.service';
import {Router} from "@angular/router"

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  profilename: any;
  profileImage:any;
  userRole:string;
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private analyticsService: AnalyticsService,
              private router: Router,
              private layoutService: LayoutService,private authenticationService:AuthenticationService,private exceptionHandler:ExceptionHandler) {
  }

  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe((users: any) => this.user = users.nick);
   
    this.authenticationService.getLoggedInUserDetail().subscribe((result)=> {     
      debugger; 
      this.profileImage = result.profileImageURL==null ? "assets/images/user-placeholder.png" :result.profileImageURL; 
      this.profilename = result.firstname +' '+ result.middlename+' '+result.lastname;
      this.userRole=(result.roleId==1)?"Welcome Admin":((result.roleId==2)?"Welcome Agent":"Welcome Customer");
    },error => {  
        this.exceptionHandler.handleExcption(error);
    })

  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }


  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
}
