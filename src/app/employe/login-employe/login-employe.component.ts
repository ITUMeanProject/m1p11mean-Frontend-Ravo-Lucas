import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { EmployeService } from 'src/app/services/employe/employe.service';

@Component({
  selector: 'app-login-employe',
  templateUrl: './login-employe.component.html',
  styleUrls: ['./login-employe.component.css']
})
export class LoginEmployeComponent implements OnInit {
    submitted: boolean = false;
    errorMessage: string = '';1
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder, 
        private cookieService: CookieService, 
        private employeService: EmployeService, 
        private router: Router,
        private activatedRoute: ActivatedRoute) {
        this.mainForm();
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            if(params['error'] == "auth") this.errorMessage = "Accès pour employé seulement";
        });
    }

    mainForm() {
        this.loginForm = this.fb.group({
            login: ['toky', [Validators.required]],
            motdepasse: ['12345678', [Validators.required]],
        })
    }

    get getForm() {
        return this.loginForm.controls;
    }

    connect() {
        console.log(this.loginForm.value);
        this.employeService.login(this.loginForm.value)
        .subscribe({
            next: (response) => {
                var res = JSON.parse(JSON.stringify(response));
                this.cookieService.set("token", res.token.value);
                this.router.navigate(['employe/rendezvous']);
            },
            error: (error) => {
                this.errorMessage = error.error.message;
                console.log(error);
            }
        });
    }

}
