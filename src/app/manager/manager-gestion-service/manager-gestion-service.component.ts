import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from 'src/app/services/service/service.service';

@Component({
  selector: 'app-manager-gestion-service',
  templateUrl: './manager-gestion-service.component.html',
  styleUrls: ['./manager-gestion-service.component.css']
})
export class ManagerGestionServiceComponent implements OnInit {

    serviceSearch = {
        nom: '',
        duree: '',
        commission: '',
        prixMin: '',
        prixMax: '',
        page: 1
    };
    selectedService = {};
    services: [];
    currentPage = 1;
    totalPage = 10;

    deleteMessage = "";
    serviceFormSubmitMessage = "";
    serviceFormErrorMessage = "";
    submittingService = false;
    submittedService = false;
    createServiceSubmitBtnText = "Ajouter service";
    editServiceSubmitBtnText = "Modifier service";

    serviceForm: FormGroup = new FormGroup({
		nom: new FormControl(''),
        duree: new FormControl(''),
		prix: new FormControl(''),
        commission: new FormControl('')
	});

    constructor(private formBuilder: FormBuilder, private serviceService: ServiceService) { }

    ngOnInit(): void {
        this.findService();
    }

    addService(event){
        if(this.serviceForm.valid){

            this.createServiceSubmitBtnText = "";
            this.submittingService = true;
            this.resetEmpMessage();

            this.serviceService.createService(this.serviceForm.value)
            .subscribe({
                next: (response) => {
                    this.findService();
                },
                error: (error) => {
                    this.createServiceSubmitBtnText = "Ajouter service";
                    this.submittingService = false;
                    this.serviceFormErrorMessage = error.error.message;
                },
                complete: () => {
                    this.createServiceSubmitBtnText = "Ajouter service";
                    this.serviceFormSubmitMessage = "Service créée";
                    this.submittingService = false;
                }
            });
        }
    }

    editService(event){
        if(this.serviceForm.valid){

            this.editServiceSubmitBtnText = "";
            this.submittingService = true;
            this.resetEmpMessage();

            this.serviceService.updateService(this.selectedService["_id"], this.serviceForm.value)
            .subscribe({
                next: (response) => {
                    this.findService();
                },
                error: (error) => {
                    this.editServiceSubmitBtnText = "Modifier service";
                    this.submittingService = false;
                    this.serviceFormErrorMessage = error.error.message;
                },
                complete: () => {
                    this.editServiceSubmitBtnText = "Modifier service";
                    this.serviceFormSubmitMessage = "Service modifié";
                    this.submittingService = false;
                }
            });
        }
    }

    paginate(page = 1){
        this.currentPage = page;
        this.findService(this.currentPage);
    }

    findService( page = 1){
        this.serviceSearch.page = page;
        this.serviceService.findService(this.serviceSearch)
        .subscribe({
            next: (response) => {
                var data = JSON.parse(JSON.stringify(response));
                this.services = data.data;
                this.totalPage = data.totalPage;
                console.log(data);
            },
            error: (error) => {
                console.log(error)
            }
        });
    }

    deleteEmp(){
        this.serviceService.deleteService(this.selectedService["_id"])
        .subscribe({
            next: (response) => {
                var data = JSON.parse(JSON.stringify(response));
                this.deleteMessage = data.message;
                this.findService();
            },
            error: (error) => {
                console.log(error)
            }
        });
    }

    get f(): { [key: string]: AbstractControl } {
		return this.serviceForm.controls;
	}

    resetEmpMessage(){
        this.serviceFormErrorMessage = "";
        this.serviceFormSubmitMessage = "";
        this.createServiceSubmitBtnText = "Ajouter service";
        this.editServiceSubmitBtnText = "Modifier service";
    }

    resetEmpForm(){
        this.serviceForm = new FormGroup({
            nom: new FormControl(''),
            duree: new FormControl(''),
            prix: new FormControl(''),
            commission: new FormControl('')
        });
    }

    selectService(service){
        this.resetEmpMessage();
        this.selectedService = service;
        this.serviceForm = new FormGroup({
            nom: new FormControl(service.nom),
            duree: new FormControl(service.duree),
            prix: new FormControl(service.prix),
            commission: new FormControl(service.commission),
        });
    }
}
