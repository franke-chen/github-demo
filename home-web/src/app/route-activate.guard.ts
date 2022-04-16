import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class TokenGuard implements CanActivate {

  constructor(
    private router: Router,
    private service: BackendService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.checkToken();
  }

  private async checkToken(): Promise<boolean> {
    const token = localStorage.getItem('access_token');

    if (token) {
      const account = await this.service.tokenCheck();

      if (account) {
        sessionStorage.setItem('email', account.email);
        sessionStorage.setItem('name', account.name);
        sessionStorage.setItem('role', account.role);
        sessionStorage.setItem('userId', account.userId.toString());

        return true;
      }
    }

    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({
  providedIn: 'root'
})
export class APIKeyGuard implements CanActivate {

  constructor(private service: BackendService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAPIKey();
  }

  private async checkAPIKey(): Promise<boolean> {
    const key = localStorage.getItem('apikey');
    if (key)  {
      return true;
    } else {
      const res = await this.service.getAPIKey();
      return true;
    }
  }
}
