import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class BaseService {
    headers = new HttpHeaders();

    httpOptions = {
        headers: this.headers
    };

    constructor(private cookieService: CookieService) {
        this.setHeaders();
    }

    setHeaders(){
        var token = this.cookieService.get("token");
        // this.headers.append('Content-Type', 'application/json');
        this.headers.set("Authorization", `Bearer ${token}`);
    }
}
