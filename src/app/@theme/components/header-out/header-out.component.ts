import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-header-out',
  styleUrls: ['./header-out.component.scss'],
  templateUrl: './header-out.component.html',
})
export class HeaderOutComponent implements OnInit {


  @Input() position = 'normal';

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private router: Router) {
  }

  ngOnInit() {
  }

  goToHome() {
    // this.router.navigateByUrl('/unsign/question');
  }
  loginAdmin() {
    // this.router.navigateByUrl('/unsign/signin_admin');
  }
  loginLawyer() {
    // this.router.navigateByUrl('/unsign/signin_lawyer');
  }

  login() {
    this.router.navigateByUrl('/unsign/signin');
  }

}
