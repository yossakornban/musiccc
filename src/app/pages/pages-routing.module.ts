import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'officer',
    loadChildren: './officer/officer.module#OfficerModule',
    data: { breadcrumbs: 'Officer' }
  },{
    path: 'member',
    loadChildren: './member/member.module#MemberModule',
    data: { breadcrumbs: 'Member' }
  },{
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule',
    data: { breadcrumbs: 'Admin' }
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
