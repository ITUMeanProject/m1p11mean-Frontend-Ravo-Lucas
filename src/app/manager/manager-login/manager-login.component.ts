import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ManagerService } from 'src/app/services/manager/manager.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-manager-login',
  templateUrl: './manager-login.component.html',
  styleUrls: ['./manager-login.component.css']
})
export class ManagerLoginComponent implements OnInit {
    submitted: boolean = false;
    errorMessage: string = '';1
    loginForm: FormGroup;

    constructor(
        private fb: FormBuilder, 
        private userService: UserService, 
        private managerService: ManagerService, 
        private router: Router,
        private activatedRoute: ActivatedRoute) {
        this.mainForm();
    }

    ngOnInit(): void {
        this.activatedRoute.queryParams.subscribe(params => {
            if(params['error'] == "session") this.errorMessage = "Session expiré";
            if(params['error'] == "auth") this.errorMessage = "Accès pour manager seulement";
        });
    }

    mainForm() {
        this.loginForm = this.fb.group({
            login: ['jeanne', [Validators.required]],
            motdepasse: ['12345678', [Validators.required]],
        })
    }

    get getForm() {
        return this.loginForm.controls;
    }

    connect() {
        console.log(this.loginForm.value);
        this.managerService.login(this.loginForm.value)
        .subscribe({
            next: (response) => {
                var res = JSON.parse(JSON.stringify(response));
                console.log(res);
                this.userService.setUserToken(res.token.value, res.token.expires);
                this.router.navigate(['manager/gestionemploye']);
            },
            error: (error) => {
                this.errorMessage = error.error.message;
            }
        });
    }
}
