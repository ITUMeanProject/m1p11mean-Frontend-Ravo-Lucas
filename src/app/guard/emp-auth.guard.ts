import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class EmpAuthGuard implements CanActivate {

    constructor(private cookieService: CookieService, private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            
            if (this.cookieService.get("token") == "") this.router.navigate(['employe/login'], { queryParams: {error: "auth"} })

            var cookie = this.cookieService.get("token");
            var decode_token = jwtDecode(cookie);
            
            if(decode_token["typeUser"] != "Employe") this.router.navigate(['employe/login'], { queryParams: {error: "auth"} })

            return true;
    }
}
