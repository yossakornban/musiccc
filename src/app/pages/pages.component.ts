import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { OFFICER, ADMIN, MEMBER } from './pages-menu';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent {

  public menu : NbMenuItem[];

  constructor(translate: TranslateService) {
    let role = 'officer';

    switch (role) {
      case 'officer':
        this.menu = OFFICER;
        return
      case 'admin':
        this.menu = ADMIN;
        return
      case 'member':
        this.menu = MEMBER;
        return
      default:
        this.menu = OFFICER;
        return
    }
  }

}
