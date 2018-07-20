import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './shared/guard/auth.guard';
import { CanDeactivateGuard } from './shared/services/can-deactivate-guard.service';
import { RoleGuard } from './shared/guard/role.guard';
import { AppCustomPreloader } from './app-routing-loader';
import { McBreadcrumbsResolver } from 'ngx-breadcrumbs';

const routes: Routes = [
  { path: 'pages', 
    loadChildren: 'app/pages/pages.module#PagesModule',
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: ['admin', 'user'], preload: false }
  },
  { path: 'unsign', loadChildren: 'app/unsign/unsign.module#UnsignModule' },
  { path: '', redirectTo: 'unsign', pathMatch: 'full' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [CanDeactivateGuard, AppCustomPreloader]
})
export class AppRoutingModule {
}
