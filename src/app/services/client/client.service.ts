import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import Envs from 'src/app/utils/Envs';

@Injectable({
    providedIn: 'root'
})
export class ClientService {

    constructor(private http: HttpClient, private cookieService: CookieService) {

    }

    setUserToken(token, expires = 30, expiresType = "mn")
    {
        var expiresTime = new Date();
        if(expiresType == "hr") expiresTime.setHours( expiresTime.getHours() + expires );
        if(expiresType == "mn") expiresTime.setMinutes( expiresTime.getMinutes() + expires );

        console.log(expiresTime);
        this.cookieService.set("token", token, expiresTime);
    }

    createClient(formData: any) {
        var client = this.http.post(`${Envs.API_BASEURL}clientAPI/client`, formData);
        return client;
    }

    login(formData: any) {
        return this.http.post(`${Envs.API_BASEURL}login/client`, formData);
    }

    clearAllCookies(): void {
        const cookies = document.cookie.split(';');
        for (const cookie of cookies) {
          const parts = cookie.split('=');
          const name = parts[0].trim();
          this.deleteCookie(name);
        }
    }

    deleteCookie(name: string): void {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }
}
