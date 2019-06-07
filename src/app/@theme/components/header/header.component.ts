import { Component, Input, OnInit } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { AnalyticsService } from '../../../@core/utils';
import { LayoutService } from '../../../@core/utils';
import { AuthenticationService } from '../../../commonServices/authentication.service';
import { ExceptionHandler } from '../../../commonServices/exceptionhandler.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  profilename: any;
  profileImage:any;
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService,private authenticationService:AuthenticationService,private exceptionHandler:ExceptionHandler) {
  }

  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe((users: any) => this.user = users.nick);
   
    this.authenticationService.getLoggedInUserDetail().subscribe((result)=> {
      debugger;
      //result.picture = 'assets/images/nick.png';
      if(result.profileImageURL==null)
      {
        this.profileImage='assets/images/user-placeholder.png';
      }
      else{
      this.profileImage = result.profileImageURL;
      }
      this.profilename = result.firstname +' '+ result.middlename+' '+result.lastname;
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
