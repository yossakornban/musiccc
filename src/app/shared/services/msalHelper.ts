import { Component, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { getMsalConfigs } from '../../@core/socialloginConfig';
import { Observable } from 'rxjs/Observable';

declare var require;
const Msal = require('msal');
const CONFIG = getMsalConfigs().Settings;

@Injectable()
export class MsalHelper {
  public access_token = null;

  private app: any;
  public user;
  public isAuthenticated = false;

  constructor() {
    this.app = new Msal.UserAgentApplication(
      CONFIG.CLIENT_ID,
      null,
      (errorDesc, token, error, tokenType) => {
        // callback for login redirect
        if (error) {
          console.log(JSON.stringify(error));
          return;
        }
        console.log('Callback for login');
        this.access_token = token;
      });
    this.app.redirectUri = CONFIG.REDIRECT_URI;
  }

  public login() {
    return this.app.loginRedirect(CONFIG.SCOPES).then(
      idToken => {
        this.app.acquireTokenSilent(CONFIG.SCOPES).then(
          accessToken => {
            this.access_token = accessToken;
            console.log('ACCESS TOKEN: \n ' + this.access_token);
            this.user = this.app.getUser(); // AZURE AD
            this.isAuthenticated = true;
          },
          error => {
            this.app.acquireTokenPopup(CONFIG.SCOPES).then(accessToken => {
              console.log('Error acquiring the popup:\n' + error);
            });
          }
        );
      },
      error => {
        console.log('Error during login:\n' + error);
      }
    );
  }

  public logout() {
    this.app.logout();
  }

  public isOnline(): boolean {
    return this.app.getUser() != null;
  }

  public getCurrentLogin() {
    const user = this.app.getUser();
    return user;
  }

  public getToken() {
    return this.app.acquireTokenSilent(CONFIG.SCOPES).then(
      accessToken => {
        return accessToken;
      },
      error => {
        return this.app.acquireTokenSilent(CONFIG.SCOPES).then(
          accessToken => { 
            return accessToken;
          },
          err => {
            console.error(err);
          });
      }
    );
  }
  
}