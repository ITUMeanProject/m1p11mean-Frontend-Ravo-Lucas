import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ClientService } from 'src/app/services/client/client.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    tokenExpire: boolean = true;
    user : any;
    constructor(
        private cookieService: CookieService,
        private userService: UserService,
        private router : Router) { }

    ngOnInit(): void {
        this.getToken();    }

    getToken() {
        if (this.cookieService.get('token')) {
            this.tokenExpire = false;
            this.user = this.userService.getUser();
        }
    }

    Deconnect() {
        this.userService.logOut();
        this.tokenExpire = true;
        this.router.navigate(['/']);
    }
}
