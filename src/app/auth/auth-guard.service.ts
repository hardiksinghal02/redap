import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {
  isLoggedIn:boolean = false;
  constructor(private authService: AuthService, private router : Router){}

  canActivate( route: ActivatedRouteSnapshot , state: RouterStateSnapshot ):Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.user.pipe(map( user => {
        const authState = !!user;
      if(authState)
        return true;
      return this.router.createUrlTree(['/login']);
      }
    ));
    // this.authService.isLoggedIn.subscribe(authData => {
    //   this.isLoggedIn = authData;
    // });
    // console.log(this.isLoggedIn);
    // console.log('I worked last');
    // return this.isLoggedIn;
    //  return this.authService.isLoggedIn
    //  .subscribe(authData => {
    //   this.isLoggedIn = authData;
    //   console.log('Login = '+this.isLoggedIn);
    // });
    // if(this.isLoggedIn)
    //   return true;
    // else
    //   this.router.navigate(['/login']);
    //   return false;
  }

}

