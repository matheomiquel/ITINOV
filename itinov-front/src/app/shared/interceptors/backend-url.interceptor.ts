import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { DOCUMENT } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
  constructor(@Inject(DOCUMENT) private document: Document) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const localStorage = this.document?.defaultView?.localStorage;
    const bearerToken = localStorage ? `Bearer ${localStorage.getItem("token")}` : "";
    const baseUrl = environment.apiUrl;
    const apiReq = req.clone({
      url: `${baseUrl}/${req.url}`,
      headers: req.headers.append('authorization', bearerToken)
    });
    return next.handle(apiReq);
  }
}
