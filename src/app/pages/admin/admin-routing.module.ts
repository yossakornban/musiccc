import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AuthGuard } from '../../shared/guard/auth.guard';
import { UnsavedChangesGuard } from '../../shared/guard/unsaved.changes.guard';

// -- For All Role
// Component.
import { Annw01Component } from '../all/annw01/annw01.component';

// Resolve.
import { Annw01Resolve } from '../all/annw01/annw01.resolve';

// Service.
import { Annw01Service } from '../all/annw01/annw01.service';

// -- For Admin Role
// Component.

// Resolve.

// Service.

const routes: Routes = [{
  path: '',
  component: AdminComponent,
  children: [
  {
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
}
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    UnsavedChangesGuard,
    Annw01Resolve, Annw01Service,
]
})
export class AdminRoutingModule { }

export const routedComponents = [
  AdminComponent,
];
