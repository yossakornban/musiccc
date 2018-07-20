import { Injectable, Component } from '@angular/core';
import { Http, RequestOptions, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { CookieService } from 'ngx-cookie';
import { JwtHelper } from 'angular2-jwt';
import { MsalHelper } from './msalHelper';
// import { AuthService, GoogleLoginProvider } from "angular5-social-login";
import { NgBlockUI, BlockUI } from 'ng-block-ui';
import { Router } from '@angular/router';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

import { UserService } from '../../@core/data/users.service'
import * as context from '../../@core/interfaces/context-part.interface';

const http_basic: string = context.http_basic;
const base_authserver_url = context.base_authserver_url;
const csrf_token_uri: string = context.csrf_token_uri;
const login_uri: string = context.login_uri;
const logout_uri: string = context.logout_uri;
const refresh_uri: string = context.refresh_uri;
const ACCESS_TOKEN_KEY: string = context.ACCESS_TOKEN_KEY;
const CSRF_TOKEN_HEADER: string = context.CSRF_TOKEN_HEADER;
const REFRESH_TOKEN_KEY: string = context.REFRESH_TOKEN_KEY;
const CSRF_TOKEN: string = context.CSRF_TOKEN;
const msal_uri: string = context.msal_uri;

@Injectable()
export class AuthenService {
  @BlockUI() BlockUI: NgBlockUI;
  private jwt: any;
  private csrfToken: any;
  private jwtHelper: JwtHelper = new JwtHelper();
  private _loginAnnounceSource = new Subject<any>();
  tokenIsBeingRefreshed = new Subject<any>();
  redirectUrl: string;
  isLoggedIn: boolean = false;
  isAuthened = this._loginAnnounceSource.asObservable();

  constructor(private http: Http, private cookieService: CookieService, private userService: UserService,
              // private authService: AuthService,
              private msalHelper: MsalHelper,
              private router: Router
  ) { 

  }

  getCsrfToken() {
    this.BlockUI.start();
    const body = '';
    const options = new RequestOptions({ withCredentials: true });
    this.http.get(csrf_token_uri, options).map((res, err) => res.json()).subscribe((csrf) => {
        if (csrf.delegate) {
          this.csrfToken = csrf.delegate;
        } else {
          this.csrfToken = csrf;
        }
        this.cookieService.put('XSRF-TOKEN', this.csrfToken.token);
        localStorage.setItem(CSRF_TOKEN_HEADER, this.csrfToken.headerName);
        localStorage.setItem(CSRF_TOKEN, this.csrfToken.token);
        if (this.msalHelper.isOnline()) {
          this.checkMicrosoftAuthen().subscribe(() => {
            this.checkAuthen();
          })
        }
        this.BlockUI.stop();
      }, (error) => {
        console.log('error: ' + error);
        this.BlockUI.stop();
      });

  }

  login(u: string, p: string): Observable<any> {
    this.BlockUI.start();
    if (this.isLoggedIn) {
      console.log('already authenticated');
      this._loginAnnounceSource.next(this.isLoggedIn);
      this.BlockUI.stop();
      return
    }
    const body = `username=${u}&password=${p}`;
    return this.oauthApi(login_uri, body);
  }

  oauthApi(uri, body) : Observable<any> {
    const headers = new Headers();
    headers.append('Authorization', `Basic ${http_basic}`);
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append(CSRF_TOKEN, localStorage.getItem(CSRF_TOKEN));
    const options = new RequestOptions({ headers: headers, withCredentials: true });

    return this.http.post(uri, body, options).map(response => {
      const result = response.json();
      if (result.access_token) {
        this.setToken(result.access_token, result.refresh_token);
        this.jwt = this.jwtHelper.decodeToken(result.access_token);
        this.isLoggedIn = true;
        this.userService.setRole(this.jwt.authorities[0]);
        this.userService.setUserName(this.jwt.user_name);
        this.BlockUI.stop();
        return result;
      } else {
        console.log('Login error, access_token is null')
        this.BlockUI.stop();
        throw Observable.throw(result.error_description);
      }
    }).catch(error => {
      this.isLoggedIn = false;
      console.log('Login error, ', error)
      this.BlockUI.stop();
      return Observable.throw(error);
    });
  }

  logout() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
    this.signoutWithMicrosoft();
    this.isLoggedIn = false;
  }

  checkAuthen() {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (token) {
      this.jwt = this.jwtHelper.decodeToken(token);
      if(this.tokenRequiresRefresh){
        const body = `refresh=${localStorage.getItem(REFRESH_TOKEN_KEY)}`;
        this.oauthApi(refresh_uri, body).subscribe(() => {
          this.isLoggedIn = true;
          this.userService.setRole(this.jwt.authorities[0]);
          this.userService.setUserName(this.jwt.user_name);
          this._loginAnnounceSource.next(this.isLoggedIn);
        })
      } else {
        this.isLoggedIn = true;
        this.userService.setRole(this.jwt.authorities[0]);
        this.userService.setUserName(this.jwt.user_name);
        this._loginAnnounceSource.next(this.isLoggedIn);
      }
    } else {
      this.isLoggedIn = false;
      this._loginAnnounceSource.next(this.isLoggedIn);
    }
  }

  signinWithMicrosoft() : Observable<any> {
    if (this.msalHelper.isOnline()) {
      return this.checkMicrosoftAuthen();
    } else {
      this.msalHelper.login();
    }
  }

  signoutWithMicrosoft() {
    if (this.msalHelper.isOnline()) {
      this.msalHelper.logout();
    } else {
      console.info('not login with microsoft');
    }
  }

  checkMicrosoftAuthen() : Observable<any> {
    this.BlockUI.start();
    if(this.msalHelper.isOnline()){
      const user = this.msalHelper.getCurrentLogin();
      const body = `token=${JSON.stringify(user.idToken)}`;
      return this.oauthApi(msal_uri, body);
    }
    this.BlockUI.stop();
    return Observable.empty();
  }

  // signinWithGoogle () {
  //   let socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
  
  //   this.authService.signIn(socialPlatformProvider).then(
  //     (userData) => { //on success
  //        //this will return user data from google. What you need is a user token which you will send it to the server
  //       console.info(userData);
  //       // this.http.post('', { token: userData.idToken }).subscribe(
  //       //   onSuccess => {
  //       //   //login was successful
  //       //   //save the token that you got from your REST API in your preferred location i.e. as a Cookie or LocalStorage as you do with normal login
  //       //   }, onFail => {
  //       //     //login was unsuccessful
  //       //     //show an error message
  //       //   }
  //       // );
  //     }
  //   );
  // }

  tokenRequiresRefresh(): boolean {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (this.jwtHelper.isTokenExpired(token)) {
      console.log("Token refresh is required");
    }
    return this.jwtHelper.isTokenExpired(token);
  }

  refreshToken() {
    const body = `refresh=${localStorage.getItem(REFRESH_TOKEN_KEY)}`;
    return this.oauthApi(refresh_uri, body)
  }

  refreshTokenErrorHandler(error) {
    this._loginAnnounceSource.next(false);
    this.logout();
    this.tokenIsBeingRefreshed.next(false);
    this.router.navigate(['/unsign/forbidden']);
    console.log(error);
  }

  refreshTokenSuccessHandler(data) {
    if (data.error) {
        console.log("Removing tokens.");
        this.logout();
        this._loginAnnounceSource.next(false);
        this.tokenIsBeingRefreshed.next(false);
        this.router.navigate(['/unsign/forbidden']);
        return false;
    } else {
        this.setToken(data.access_token, data.refresh_token);
        this.isLoggedIn = true;
        this._loginAnnounceSource.next(true);
        this.tokenIsBeingRefreshed.next(false);
        console.log("Refreshed user token");
    }
  }

  setToken(access, refresh) {
    localStorage.setItem(ACCESS_TOKEN_KEY, access);
    localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  }

}
