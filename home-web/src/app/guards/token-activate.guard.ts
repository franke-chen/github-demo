import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppCommonService } from '../services';


@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  constructor(
    private router: Router,
    private service: AppCommonService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkToken();
  }

  private async checkToken(): Promise<boolean> {
    const token = sessionStorage.getItem('access_token');

    if (token) {

      if (this.service.tokenIsValid) {
        return true;
      } else {
        const account = await this.service.tokenCheck();

        if (account) {
          sessionStorage.setItem('email', account.email);
          sessionStorage.setItem('name', account.name);
          sessionStorage.setItem('role', account.role);
          sessionStorage.setItem('userId', account.userId.toString());

          return true;
        }
      }
    }

    this.router.navigate(['']);
    return false;
  }
}


