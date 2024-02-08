import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

    submitted: boolean = false;
    inscriptionForm: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {
        this.mainForm();
    }

    ngOnInit(): void {
    }

    mainForm() {
        this.inscriptionForm = this.fb.group({
            name: ['', [Validators.required]],
            email: ['',
                [
                    Validators.required,
                    Validators.pattern('[a-z0-9._%+1]+@[a-z0-9.-]+.[a-z]{2,3}$')
                ]
            ],
            password: ['', [Validators.required]],
        })
    }

    get getForm() {
        return this.inscriptionForm.controls;
    }

    register() {
        this.submitted = true;
    }
}
