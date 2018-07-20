import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { AuthenService } from './../../shared/services/auth.service';
import * as context from '../interfaces/context-part.interface';

@Injectable()
export class RestServerService {

  constructor(private authService: AuthenService, public router: Router) { }

  public getAPI(postFix: string, pathName: String): string {
    if (!this.authService.isLoggedIn) {
      this.router.navigate(['/unsign/signin']);
    }
    return context.base_restserver_url + `${pathName}` + '/' + `${postFix}`;
  }
}
