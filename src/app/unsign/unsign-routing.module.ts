import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { UnsignComponent } from './unsign.component';
import { SigninComponent } from './signin/signin.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { ANLDP01Component } from './ANLDP01/ANLDP01.component';

const routes: Routes = [{
  path: '',
  component: UnsignComponent,
  children: [{
    path: 'landing',
    component: ANLDP01Component
  },{
    path: 'signin',
    component: SigninComponent
  },{
    path: 'forbidden',
    component: ForbiddenComponent
  }, {
    path: ''
    , redirectTo: 'landing'
    , pathMatch: 'full'
}],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnsignRoutingModule {
}

export const QUESTION_COMPONENTS = [
  UnsignComponent,
  SigninComponent,
  ForbiddenComponent,
  ANLDP01Component,
];
