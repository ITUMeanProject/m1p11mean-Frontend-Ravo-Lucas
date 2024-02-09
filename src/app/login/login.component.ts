import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    submitted: boolean = false;
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private ngZone: NgZone,
        private router: Router
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
            this.ngZone.run(() => this.router.navigateByUrl('/home'))
        }
    }

}
