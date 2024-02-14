import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private cookieService: CookieService) { }


    setUserToken(token, expires = 30, expiresType = "mn")
    {
        var expiresTime = new Date();
        if(expiresType == "hr") expiresTime.setHours( expiresTime.getHours() + expires );
        if(expiresType == "mn") expiresTime.setMinutes( expiresTime.getMinutes() + expires );

        console.log(expiresTime);
        this.cookieService.set("token", token, expiresTime);
    }

    getUser(){
        var cookie = this.cookieService.get("token");
        var user = jwtDecode(cookie);
        return user;
    }

    logOut() {
        this.cookieService.delete("token");
    }
}
