import { Component, OnDestroy } from '@angular/core';
import {
  NbMediaBreakpoint,
  NbMediaBreakpointsService,
  NbThemeService,
} from '@nebular/theme';

import { StateService } from '../../../@core/data/state.service';

import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/operator/delay';

// TODO: move layouts into the framework
@Component({
  selector: 'unsign-layout',
  styleUrls: ['./unsign.layout.scss'],
  template: `
    <nb-layout [center]="layout.id === 'center-column'" windowMode>

      <nb-layout-header fixed>
        <ngx-header-out [position]="sidebar.id === 'left' ? 'normal': 'inverse'"></ngx-header-out>
      </nb-layout-header>

      <nb-layout-column class="main-content">
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        <ngx-footer></ngx-footer>
      </nb-layout-footer>

    </nb-layout>
  `,
})
export class UnSignLayoutComponent  implements OnDestroy {

  layout: any = {};
  sidebar: any = {};

  protected layoutState$: Subscription;
  protected sidebarState$: Subscription;

  constructor(protected stateService: StateService,
              protected themeService: NbThemeService,
              protected bpService: NbMediaBreakpointsService,) {
    this.layoutState$ = this.stateService.onLayoutState()
      .subscribe((layout: string) => this.layout = layout);

    this.sidebarState$ = this.stateService.onSidebarState()
      .subscribe((sidebar: string) => {
        this.sidebar = sidebar;
      });

    const isBp = this.bpService.getByName('is');
  }

  ngOnDestroy() {
    this.layoutState$.unsubscribe();
    this.sidebarState$.unsubscribe();
  }
}
