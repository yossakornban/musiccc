import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OfficerComponent } from './officer.component';
import { AuthGuard } from '../../shared/guard/auth.guard';
import { UnsavedChangesGuard } from '../../shared/guard/unsaved.changes.guard';

// -- For All Role

// Component.
import { Annw01Component } from '../all/annw01/annw01.component';
import { Anum01Component } from '../all/anum01/anum01.component';
import { DashBoardComponent } from '../all/dashboard/dashboard.component';
import { ActivitiesComponent } from '../all/dashboard/activities-dashboard/activities-dashboard.component';
import { NewsComponent } from '../all/dashboard/news-dashboard/news-dashboard.component';
import { BlogComponent } from '../all/dashboard/blog/blog.component';

// Resolve.
import { Annw01Resolve } from '../all/annw01/annw01.resolve';
import { Anum01Resolve } from '../all/anum01/anum01.resolve';
import { DashBoardResolve } from '../all/dashboard/dashboard.resolve';
import { ActivitiesResolve } from '../all/dashboard/activities-dashboard/activities-dashboard.resolve';
import { NewsResolve } from '../all/dashboard/news-dashboard/news-dashboard.resolve';
import { BlogResolve } from '../all/dashboard/blog/blog.resolve';

// Service.
import { Annw01Service } from '../all/annw01/annw01.service';
import { Anum01Service } from '../all/anum01/anum01.service';
import { DashBoardService } from '../all/dashboard/dashboard.service';
import { ActivitiesService } from '../all/dashboard/activities-dashboard/activities-dashboard.service';
import { NewsService } from '../all/dashboard/news-dashboard/news-dashboard.service';
import { BlogService } from '../all/dashboard/blog/blog.service';

// -- For Office Role
// Resolve.

// Service.

// Component.

const routes: Routes = [{
  path: '',
  component: OfficerComponent,
  children: [
    {
      path: 'anum01',
      component: Anum01Component,
      // canActivateChild: [AuthGuard],
      canDeactivate: [UnsavedChangesGuard],
      resolve: { fromLoadObject: Anum01Resolve },
      data: { breadcrumbs: 'User Manage' }
    }, {
      path: 'annw01',
      component: Annw01Component,
      // canActivateChild: [AuthGuard],
      canDeactivate: [UnsavedChangesGuard],
      resolve: { fromLoadObject: Annw01Resolve },
      data: { breadcrumbs: 'News Manage' }
    }, {
      path: ''
      , redirectTo: 'annw01'
      , pathMatch: 'full'
    }, {
      path: 'dashboard/all',
      component: DashBoardComponent,
      // canActivateChild: [AuthGuard],
      canDeactivate: [UnsavedChangesGuard],
      resolve: { fromLoadObject: DashBoardResolve },
      data: { breadcrumbs: 'DashBoard' }
    }, {
      path: 'dashboard/activities',
      component: ActivitiesComponent,
      // canActivateChild: [AuthGuard],
      canDeactivate: [UnsavedChangesGuard],
      resolve: { fromLoadObject: ActivitiesResolve },
      data: { breadcrumbs: 'DashBoard' }
    }, {
      path: 'dashboard/news',
      component: NewsComponent,
      // canActivateChild: [AuthGuard],
      canDeactivate: [UnsavedChangesGuard],
      resolve: { fromLoadObject: NewsResolve },
      data: { breadcrumbs: 'DashBoard' }
    },{
      path: 'dashboard/blog/:id',
      component: BlogComponent,
      // canActivateChild: [AuthGuard],
      canDeactivate: [UnsavedChangesGuard],
      resolve: { fromLoadObject: BlogResolve },
      data: { breadcrumbs: 'DashBoard' }
    }

  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    UnsavedChangesGuard,
    Annw01Resolve, Annw01Service, Anum01Service, Anum01Resolve, DashBoardResolve,
    DashBoardService, ActivitiesResolve, ActivitiesService, NewsResolve, NewsService,
    BlogResolve, BlogService
  ]
})
export class OfficerRoutingModule { }

export const routedComponents = [
  OfficerComponent
];
