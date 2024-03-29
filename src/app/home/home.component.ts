import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service/service.service';
import { EmployeService } from '../services/employe/employe.service';
import { UserService } from '../services/user.service';
import { RendezVousService } from '../services/rendezvous/rendezVous.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    serviceList = [];
    selectedService: any;
    errorMessage: string  = "";
    employeDispo: any;
    employeDispoSelected : any;
    user: any = {};
    dateRendezvous : string;
    heureRendezvous : string;
    rdvContact : any;
    path : string = 'client/prise-rende-vous';
    currentDate : Date = new Date();

    constructor(
        private serviceService : ServiceService, 
        private employeService : EmployeService,
        private userService: UserService,
        private rdvService : RendezVousService,
        private cookieService : CookieService,
        private router: Router) { 

    }

    ngOnInit(): void {
       this.init();
    }

    init() {
        if(!this.cookieService.get('connect')) {
            this.cookieService.set('path', this.path);
            this.router.navigate(['/client/login']);
        } else {
            this.checkInfo();
            this.getServiceList();
        }
    }
    
    getServiceList() {
        this.serviceService.fetchService(null)
        .subscribe(
            {
                next: (response) => {
                    this.serviceList = JSON.parse(JSON.stringify(response));
                },
                error: (error) => {
                    //this.errorMessage = error.error.message;
                }
            }
        )
    }

    getEmployeDispo() {
        this.employeService.finEmplByHoraireDeTravail(this.dateRendezvous, this.heureRendezvous)
        .subscribe(
            {
                next: (response) => {
                    this.employeDispo = JSON.parse(JSON.stringify(response));
                    console.log(this.employeDispo);
                },
                error: (error) => {
                    //this.errorMessage = error.error.message;
                }
            }
        )
    }

    checkInfo() {
        this.user = this.userService.getUser();
        console.log(this.user.user._id);
    }

    enregistrerRendezvous() {
        if(!this.dateRendezvous || !this.heureRendezvous || !this.employeDispoSelected) {
            this.errorMessage = "Veuillez remplir les champs ou/et selectionner une liste";
            return false;
        } else {
            let rendezVousData = {
                date : new Date(this.dateRendezvous+" "+this.heureRendezvous),
                employe : this.employeDispoSelected._id,
                client : this.user.user._id,
                services : [this.selectedService._id],
                tachesEffectue : [this.selectedService._id],
                contact : this.rdvContact
            }

            this.rdvService.createRdv(rendezVousData)
            .subscribe(
                response =>  {
                    this.router.navigate(['client/historique']);
                },
                error => {
                    alert("Il y a une erreur lors de l'enregistrement")
                }
            )
        }
    }

    checkEmploye(employe) {
        this.employeDispoSelected = employe;
    }

    checkService(service) {
        this.selectedService = service;
    }

    changeDateRdv() {
        this.employeDispo = [];
        this.getEmployeDispo();
    }
}
