import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service/service.service';
import { EmployeService } from '../services/employe/employe.service';
import { UserService } from '../services/user.service';
import { RendezVousService } from '../services/rendezvous/rendezVous.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    serviceList = [];
    selectedService: any;
    errorMessage: string;
    employeDispo: any;
    employeDispoSelected : any;
    user: any;
    dateRendezvous : string = '2024-02-19';
    heureRendezvous : string = '08:00:00';
    rdvContact : any;


    constructor(
        private serviceService : ServiceService, 
        private employeService : EmployeService,
        private userService: UserService,
        private rdvService : RendezVousService) { 

    }

    ngOnInit(): void {
        this.getServiceList();
        this.getEmployeDispo();
        this.checkInfo();
    }
    
    getServiceList() {
        this.serviceService.fetchService(null)
        .subscribe(
            {
                next: (response) => {
                    this.serviceList = JSON.parse(JSON.stringify(response));
                },
                error: (error) => {
                    this.errorMessage = error.error.message;
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
                    this.errorMessage = error.error.message;
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
            return false;
        } else {
            let rendezVousData = {
                date : new Date(this.dateRendezvous+" "+this.heureRendezvous),
                employe : this.employeDispoSelected._id,
                client : this.user._id,
                services : [this.selectedService._id],
                tachesEffectue : [this.selectedService._id],
                contact : this.rdvContact
            }

            this.rdvService.createRdv(rendezVousData)
            .subscribe(
                response =>  {
                    alert("ok");
                },
                error => {
                    console.log(error);
                    alert("erreur")
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
}
