import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ApiKeyInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clone = req.clone();

    const apikey = sessionStorage.getItem('apikey');
    if (apikey)
    {
      clone = clone.clone({ headers: clone.headers.set('X-API-Key', apikey)});
    }

    const email = sessionStorage.getItem('email');
    if (email)
    {
      clone = clone.clone({ headers: clone.headers.set('X-User-Email', email)});
    }

    clone = clone.clone({ headers: clone.headers.set('X-API-Version', 'v0')});

    const token = sessionStorage.getItem('access_token');
    if (token)
    {
      clone = clone.clone({ headers: clone.headers.set('Authorization', 'Bearer ' + token)});
    }

    return next.handle(clone);
  }

}
