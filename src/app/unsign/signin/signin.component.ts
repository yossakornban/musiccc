import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router} from '@angular/router';
import { AuthenService } from '../../shared/services/auth.service';
import { UserService } from '../../@core/data/users.service';
import { Subscription } from 'rxjs/Subscription';
import { NbSpinnerService } from '@nebular/theme';

@Component({
  selector: 'ngx-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit, AfterViewInit, OnDestroy {
  message: string;
  username: string = 'admin';
  password: string = 'admin';
  csrfToken: string;
  projectName = 'projectName';
  subscription: Subscription;

  constructor(
    public authService: AuthenService, 
    public router: Router, 
    private userService: UserService,
    private spinner: NbSpinnerService,
  ) {
    this.subscription = this.authService.isAuthened.subscribe(() => {
      console.log('is LoggedIn? ' + this.authService.isLoggedIn);
      if (this.authService.isLoggedIn) {
        this.redirectPage();
      }
    });
  }

  ngOnInit() {
    console.log('ngOnInit()');
    this.authService.checkAuthen();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit() {
    this.authService.getCsrfToken();    
  }


  onLoggedin() {
    this.message = 'Trying to log in ...';

    if (!this.username && !this.password) {
      this.message = 'blank credentials';
      return;
    }

    this.authService.login(this.username, this.password).subscribe((result) => {
      if (this.authService.isLoggedIn) {
        this.redirectPage()
      }
    }, err => {
      console.log('Loggedin error, ', err);
      this.message = err.error;
    });
  }

  signinWithMicrosoft() {
    this.authService.signinWithMicrosoft().subscribe((result) => {
      if (this.authService.isLoggedIn) {
        this.redirectPage()
      }
    }, err => {
      console.log('Loggedin error, ', err);
      this.message = err.error;
    });
  }

  redirectPage() {
    // get the redirect URL from our auth service
    // if no redirect has been set, use the default
    // const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : 'pages/admin/ad01';

    // set our navigation extras object
    // that passes on our global query params and fragment
    // const navigationExtras: NavigationExtras = {
    //   preserveQueryParams: true,
    //   preserveFragment: true
    // };
    // redirect the user
    if(this.userService.getRole() == 'admin'){
      this.router.navigateByUrl('/pages/admin/annw01');
    }
    if(this.userService.getRole() == 'user'){
      this.router.navigateByUrl('/pages/officer/annw01');
    }
    // this.router.navigateByUrl('/pages/officer/dashboard/all');
  }

  // signinWithGoogle() {
  //   this.authService.signinWithGoogle();
  // }

}
