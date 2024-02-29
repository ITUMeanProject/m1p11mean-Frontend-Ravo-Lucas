import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client/client.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    submitted: boolean = false;
    loginForm: FormGroup;
    clientConnected : any;
    errorMessage : string = '';

    constructor(
        private fb: FormBuilder,
        private ngZone: NgZone,
        private router: Router,
        private clientService : ClientService,
        private cookieService : CookieService
    ) {
        this.mainForm();
    }

    ngOnInit(): void {
    }

    mainForm() {
        this.loginForm = this.fb.group({
            userName: ['', [Validators.required]],
            password: ['', [Validators.required]],
        })
    }

    get getForm() {
        return this.loginForm.controls;
    }

    connect() {
        this.submitted = true;
        if (!this.loginForm.valid) {
            return false;
        } else {
            let infoUser = {
                login : this.loginForm.controls['userName'].value,
                motdepasse : this.loginForm.controls['password'].value
            }

            this.clientService.login(infoUser)
            .subscribe({
                next: (response) => {
                    var res = JSON.parse(JSON.stringify(response));
                    this.clientService.setUserToken(res.token.value, res.token.expires);
                    this.cookieService.set("connect", "1");
                    var pathRedirection = this.cookieService.get('path') ? this.cookieService.get('path') : '/';
                    this.router.navigate([pathRedirection]);
                },
                error: (error) => {
                    this.errorMessage = error.error.message ?  error.error.message : "Login ou mot de passe incorrect" ;
                }
            });
            
        }
    }

}
