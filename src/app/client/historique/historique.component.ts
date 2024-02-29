import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { PaimentService } from 'src/app/services/paiement/paiment.service';
import { RendezVousService } from 'src/app/services/rendezvous/rendezVous.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-historique',
    templateUrl: './historique.component.html',
    styleUrls: ['./historique.component.css']
})
export class HistoriqueComponent implements OnInit {

    user: any;
    token: string = null;
    path: string = '/client/historique';
    errorMessage: string;
    rendezVousList: any;
    rendezVousApayer: any;
    paiementForm: FormGroup;
    submitted: boolean = false;

    constructor(
        private fb: FormBuilder,
        private userService: UserService,
        private router: Router,
        private cookieService: CookieService,
        private rendezvousService: RendezVousService,
        private paimentService: PaimentService
    ) {
        this.mainForm();
    }

    ngOnInit(): void {
        this.init();

    }

    checkInfo() {
        this.user = this.userService.getUser();
        if (!this.user.user._id) {
            this.router.navigate(['/client/login']);
        }
    }

    init() {
        if (!this.cookieService.get('connect')) {
            this.cookieService.set('path', this.path);
            this.router.navigate(['/client/login']);
        } else {
            this.checkInfo();
            this.getrendezVous();
        }
    }

    getrendezVous() {
        console.log(this.user.user._id);
        this.rendezvousService.fetchRdvByUserId(this.user.user._id)
            .subscribe(
                {
                    next: (response) => {
                        console.log(response);
                        this.rendezVousList = JSON.parse(JSON.stringify(response));
                        console.log(this.rendezVousList);
                    },
                    error: (error) => {
                        this.errorMessage = error.error.message;
                    }
                }
            )
    }

    isDatePassed(date: Date): Boolean {
        return (new Date(date) < new Date()) ? true : false;
    }

    annulerRendezVous(idRdv) {
        if (confirm("Voule-vous annuler le rendez-vous?")) {
            this.rendezvousService.deleteRdv(idRdv)
                .subscribe(
                    {
                        next: (response) => {
                            this.getrendezVous()
                        },
                        error: (error) => {
                            this.errorMessage = error.error.message;
                        }
                    }

                )
        }
    }


    mainForm() {
        this.paiementForm = this.fb.group({
            cardNumber: ['', [Validators.required]],
            expirationDate: ['', [Validators.required]],
            cvv: ['', [Validators.required]],
            cardHolderName: ['', [Validators.required]],
        })
    }

    get getForm() {
        return this.paiementForm.controls;
    }

    effectuerPaiement(rendeVousSelectionner) {
        this.rendezVousApayer = rendeVousSelectionner;
    }

    payer() {
        this.submitted = true;
        if (!this.paiementForm.valid) {

            return false;
        } else {
            this.paimentService.createPaiement(this.paiementForm.value)
                .subscribe({
                    next: (response) => {
                        alert(response);
                        this.miseAjourRdv();
                    },
                    error: (error) => {
                        this.errorMessage = error.error.message ? error.error.message : "Erreur sur le paiement";
                    }
                })
        }
    }

    miseAjourRdv() {
        alert(3);

        this.rendezVousApayer.dejaPaye = true;
        this.rendezvousService.updateRdv(this.rendezVousApayer._id, this.rendezVousApayer)
            .subscribe({
                next: (response) => {
                    this.getrendezVous();
                },
                error: (error) => {
                    this.errorMessage = error.error.message ? error.error.message : "Erreur sur la mis à jour";
                }
            });
    }

}
