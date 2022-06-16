import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppCommonService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class APIKeyGuard implements CanActivate {

  constructor(private service: AppCommonService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkAPIKey();
  }

  private async checkAPIKey(): Promise<boolean> {
    const key = sessionStorage.getItem('apikey');
    if (key)  {
      return true;
    } else {
      const res = await this.service.getAPIKey();
      sessionStorage.setItem('apikey', res.apikey);
      return true;
    }
  }
}
