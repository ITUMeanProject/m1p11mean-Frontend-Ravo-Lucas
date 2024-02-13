import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private cookieService: CookieService) { }

    getUser(){
        var cookie = this.cookieService.get("token");
        var user = jwtDecode(cookie);
        return user;
    }

    logOut() {
        var cookie = this.cookieService.delete("token");
    }
}
