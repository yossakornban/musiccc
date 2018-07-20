import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../@core/data/users.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { Router } from '@angular/router';
import { AuthenService } from '../../../shared/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs/operators/filter';
import { Subscription } from 'rxjs/Rx';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {


  @Input() position = 'normal';

  user: any;
  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  menuSubscription: Subscription;
  isLogOut: boolean;

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private router: Router,
    private authService: AuthenService,
    private translate: TranslateService,

  ) {
    this.menuSubscription = 
    this.menuService.onItemClick().subscribe((event) => {
      this.onContecxtItemSelection(event.item.title);
    });
    this.isLogOut = true;
  }

  onContecxtItemSelection(title) {
    if (title == 'Log out' && this.isLogOut) {
      this.logout();
    }
  }

  ngOnDestroy() {
    this.menuSubscription.unsubscribe();
  }

  ngOnInit() {
    this.userService.getUsers()
      .subscribe((users: any) => this.user = users.user);
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleActionbar(): boolean {
    this.sidebarService.toggle(false, 'actionbar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  changeLang(language: string) {
    localStorage.setItem('language', language);
    this.translate.use(language);
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/unsign');
  }
}
