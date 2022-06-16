import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-message',
  template: `
  <a>message sync</a>
  `
})
export class MessageComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {

    const target = this.route.snapshot.queryParamMap.get('target');

    let payload: string | undefined;
    let origin: string | undefined;
    if (target) {
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

      payload = JSON.stringify({
        message: 'message from cloud77 web',
        timestamp: new Date().toString()
      });

      if (payload && origin) {
        setTimeout(() => {
          window.parent.postMessage(payload, origin as string);
        }, 0);
      }
    }
  }

}
