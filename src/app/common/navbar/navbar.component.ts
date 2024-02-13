import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(
        private userService: UserService, 
        private router: Router
    ) { }

    ngOnInit(): void {
    }

    logOut(){
        this.userService.logOut();
        this.router.navigate(['employe/login']);
    }
}
