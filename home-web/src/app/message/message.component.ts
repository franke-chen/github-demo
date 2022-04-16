import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message',
  template: `
  <a>token sync</a>
  `
})
export class MessageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    const target = this.route.snapshot.queryParamMap.get('target');
    const type = this.route.snapshot.queryParamMap.get('type');

    let payload: string | undefined;
    let origin: string | undefined;
    if (target && type) {
      switch (target) {
        case 'management-web':
          origin = environment.management_web;
          break;
        case 'super-web':
          origin = environment.super_web;
          break;
        default:
          break;
      }

      switch (type) {
        case 'token':
          const email = localStorage.getItem('email');
          const accessToken = localStorage.getItem('access_token');
          const refreshToken = localStorage.getItem('refresh_token');

          if (email && accessToken && refreshToken) {
            payload = JSON.stringify({
              email,
              access_token: accessToken,
              refresh_token: refreshToken
            });
          }
          break;

        case 'hello':
          payload = 'hello world';
          break;
        default:

          break;
      }

      if (payload && origin) {
        setTimeout(() => {
          window.parent.postMessage(payload, origin as string);
        }, 0);
      }
    }
  }

}
