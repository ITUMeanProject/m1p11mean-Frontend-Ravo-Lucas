import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

    constructor(private cookieService: CookieService) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        
        var token = this.cookieService.get("token");
        const modifiedRequest = request.clone({
            setHeaders:{
                "Authorization": `Bearer ${token}`
            }
        })
        console.log(modifiedRequest)
        return next.handle(modifiedRequest);
    }
}
