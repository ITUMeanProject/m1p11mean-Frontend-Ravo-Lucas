import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ManagerAuthGuard implements CanActivate {
    constructor(private cookieService: CookieService, private router: Router){}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
            
            if (this.cookieService.get("token") == "") this.router.navigate(['manager/login'], { queryParams: {error: "session"} })

            var cookie = this.cookieService.get("token");
            var decode_token = jwtDecode(cookie);
            
            if(decode_token["typeUser"] != "Manager") this.router.navigate(['manager/login'], { queryParams: {error: "auth"} })

            return true;
    }
}
