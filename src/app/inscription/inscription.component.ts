import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../services/client/client.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-inscription',
    templateUrl: './inscription.component.html',
    styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

    submitted: boolean = false;
    inscriptionForm: FormGroup;
    erreurPwd : boolean = false;
    router: Router;
    constructor(
        private fb: FormBuilder, private clientService : ClientService
    ) {
        this.mainForm();
    }

    ngOnInit(): void {
    }

    mainForm() {
        this.inscriptionForm = this.fb.group({

            nom: ['', [Validators.required]],
            prenom: ['', []],
            dateDeNaissance: ['', [Validators.required]],
            sexe: ['', [Validators.required]],
            email: ['',
                [
                    Validators.required,
                    Validators.pattern('[a-z0-9._%+1]+@[a-z0-9.-]+.[a-z]{2,3}$')
                ]
            ],
            motdepasse: ['', [Validators.required]],
            confirmMotDePass: ['', [Validators.required]],
        })
    }

    get getForm() {
        return this.inscriptionForm.controls;
    }

    register() {
        this.submitted = true;
        if(this.inscriptionForm.controls['motdepasse'].value != this.inscriptionForm.controls['confirmMotDePass'].value) {
            this.erreurPwd = true;
            return false;
        } else {
            let infoPersoData = {
                nom : this.inscriptionForm.controls['nom'].value,
                prenom : this.inscriptionForm.controls['prenom'].value,
                dateDeNaissance : this.inscriptionForm.controls['dateDeNaissance'].value,
                sexe : this.inscriptionForm.controls['sexe'].value,
            }


            let dataCompte = {
                login : this.inscriptionForm.controls['email'].value,
                motdepasse : this.inscriptionForm.controls['motdepasse'].value,
                typeUser : "Client"
            }

            var formData = {
                "clientInfo" : infoPersoData,
                "compteInfo" : dataCompte,
            };

            this.clientService.createClient(formData)
            .subscribe(
                response =>  {
                    this.router.navigate(['login']);
                },
                error => {
                    console.log(error);
                    alert("erreur")
                }
            );
        }
    }
}
