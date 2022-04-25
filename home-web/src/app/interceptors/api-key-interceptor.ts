import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

export class ApiKeyInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let clone = req.clone();

    const apikey = sessionStorage.getItem('apikey');
    if (apikey)
    {
      clone = clone.clone({ headers: clone.headers.set('x-api-key', apikey)});
    }

    const token = sessionStorage.getItem('access_token');
    if (token)
    {
      clone = clone.clone({ headers: clone.headers.set('Authorization', 'Bearer ' + token)});
    }

    return next.handle(clone);
  }

}
