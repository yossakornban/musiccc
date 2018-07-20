import { NgModule } from '@angular/core';
import { HttpModule, JsonpModule, RequestOptions, Http, Headers } from '@angular/http';
import { CanDeactivateGuard } from './can-deactivate-guard.service';
import { CookieService, CookieModule } from 'ngx-cookie';
import { AuthHttp, AuthConfig } from 'angular2-jwt';

import * as context from '../../@core/interfaces/context-part.interface';
import { AuthenService } from './auth.service';
import { HttpService } from './http-service.service';
import { AuthHttpService } from './auth-http.service';

import { CheckPermissionService } from './check-permission.service';

const http_basic: string = context.http_basic;
const CSRF_TOKEN: string = context.CSRF_TOKEN;
const CSRF_TOKEN_HEADER: string = context.CSRF_TOKEN_HEADER;

export function authHttpServiceFactory(http: Http) {
  const headers = new Headers();
  headers.append('Authorization', `Basic ${http_basic}`);
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  const csrfToken = localStorage.getItem(CSRF_TOKEN);
  const csrfTokenHeader = localStorage.getItem(CSRF_TOKEN_HEADER);
  if (csrfTokenHeader && csrfToken) {
    headers.append(csrfTokenHeader, csrfToken);
  }
  const options = new RequestOptions({ headers: headers, withCredentials: true });

  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    tokenGetter: (() => localStorage.getItem('id_token')),
    globalHeaders: [{ 'Content-Type': 'application/json' }],
  }), http, options);
}

@NgModule({
  imports: [CookieModule.forRoot(), HttpModule, JsonpModule],
  providers: [CookieService, CanDeactivateGuard, AuthenService, HttpService, CheckPermissionService, AuthHttpService, {
    provide: AuthHttp,
    useFactory: authHttpServiceFactory,
    deps: [Http, RequestOptions]
  }]
})
export class ServiceModule { }
