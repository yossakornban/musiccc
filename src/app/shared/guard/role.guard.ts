import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, CanLoad, Route } from '@angular/router';

import { UserService } from '../../@core/data/users.service';
import { AuthenService } from '../services/auth.service';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor(private authService: AuthenService, private userService: UserService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (this.authService.isLoggedIn) {
            const roles = route.data['roles'] as Array<string> || [];
            const checkRole = roles.filter((role) => {
                return role === this.userService.getRole();
            });
            if (checkRole.length > 0) {
                return true;
            } else {
                console.info('RoleGuard');
                this.router.navigate(['/unsign/forbidden']);
            }
        }
        return true;
    }
}
