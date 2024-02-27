import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login-employe',
  templateUrl: './login-employe.component.html',
  styleUrls: ['./login-employe.component.css']
})
export class LoginEmployeComponent implements OnInit {
    submitted: boolean = false;
    errorMessage: string = '';
    loginForm: FormGroup;
    loginBtn: String = "Se connecter";
    loginIn: boolean;

    constructor(
        private fb: FormBuilder, 
        private userService: UserService, 
        private employeService: EmployeService, 
        private router: Router,
        private activatedRoute: ActivatedRoute) {
        this.mainForm();
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            if(params['error'] == "session") this.errorMessage = "Session expiré";
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
        this.loginBtn = "";
        this.loginIn = true;
        this.employeService.login(this.loginForm.value)
        .subscribe({
            next: (response) => {
                var res = JSON.parse(JSON.stringify(response));
                this.userService.setUserToken(res.token.value, res.token.expires);
                this.loginIn = false;
                this.loginBtn = "Se connecter";
                this.router.navigate(['employe/rendezvous']);
            },
            error: (error) => {
                this.errorMessage = error.error.message;
                this.loginIn = false;
                this.loginBtn = "Se connecter";
            }
        });
    }

}
