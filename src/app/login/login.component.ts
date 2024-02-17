import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientService } from '../services/client/client.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    submitted: boolean = false;
    loginForm: FormGroup;
    clientConnected : any;
    errorMessage : any;

    constructor(
        private fb: FormBuilder,
        private ngZone: NgZone,
        private router: Router,
        private clientService : ClientService
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
                pwd : this.loginForm.controls['password'].value
            }

            this.clientService.login(this.loginForm.value)
            .subscribe({
                next: (response) => {
                    var res = JSON.parse(JSON.stringify(response));
                    this.clientService.setUserToken(res.token.value, res.token.expires);
                    this.router.navigate(['home']);
                },
                error: (error) => {
                    this.errorMessage = error.error.message;
                    console.log(error);
                }
            });
            
        }
    }

}
