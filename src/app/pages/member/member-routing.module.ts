import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MemberComponent } from './member.component';
import { AuthGuard } from '../../shared/guard/auth.guard';
import { UnsavedChangesGuard } from '../../shared/guard/unsaved.changes.guard';

// -- For All Role
// Resolve.
import { Annw01Component } from '../all/annw01/annw01.component';

// Service.
import { Annw01Resolve } from '../all/annw01/annw01.resolve';

// Component.
import { Annw01Service } from '../all/annw01/annw01.service';

// -- For Member Role
// Resolve.

// Service.

// Component.

const routes: Routes = [{
  path: '',
  component: MemberComponent,
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
export class MemberRoutingModule { }

export const routedComponents = [
  MemberComponent,
];
