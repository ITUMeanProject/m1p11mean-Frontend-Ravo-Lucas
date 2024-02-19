import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service/service.service';
import { EmployeService } from '../services/employe/employe.service';

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
    dateRendezvous : string = '2024-02-19';
    heureRendezvous : string = '08:00:00';
    constructor(private serviceService : ServiceService, private employeService : EmployeService) { }

    ngOnInit(): void {
        this.getServiceList();
        this.getEmployeDispo();
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
}
