import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe/employe.service';

@Component({
  selector: 'app-manager-gestion-employe',
  templateUrl: './manager-gestion-employe.component.html',
  styleUrls: ['./manager-gestion-employe.component.css']
})
export class ManagerGestionEmployeComponent implements OnInit {

    fetching = false;
    empSearch = {
        nomEmp: '',
        prenomEmp: '',
        dateDeNaissance: '',
        sexe: '',
        page: 1
    };
    selectedEmp = {};
    employes: [];
    currentPage = 1;
    totalPage = 10;

    empForm: FormGroup = new FormGroup({
        photoDeProfil: new FormControl(''),
		nom: new FormControl(''),
        prenom: new FormControl(''),
		sexe: new FormControl('Homme'),
        dateDeNaissance: new FormControl(''),
        login: new FormControl(''),
        motdepasse: new FormControl('')
	});

    deleteMessage = "";
    empFormErrorMessage = "";
    empFormSubmitMessage = "";
    createEmpSubmitBtnText = "Ajouter employé";
    editEmpSubmitBtnText = "Modifier employé";
    submittingEmp = false;
	submittedEmp = false;

    constructor(private formBuilder: FormBuilder, private employeService: EmployeService) { }

    ngOnInit(): void {
        this.findEmp();
    }

    addEmp(event){
        if(this.empForm.valid){
            this.submittingEmp = true;
            this.createEmpSubmitBtnText = "";

            this.resetEmpMessage();

            let formData: any = new FormData();             
            formData.append("nom",  this.empForm.get("nom")!.value);
            formData.append("prenom",  this.empForm.get("prenom")!.value);
            formData.append("sexe",  this.empForm.get("sexe")!.value);
            formData.append("dateDeNaissance",  this.empForm.get("dateDeNaissance")!.value);
            formData.append("login",  this.empForm.get("login")!.value);
            formData.append("motdepasse",  this.empForm.get("motdepasse")!.value);

            Array.from(event.target[0].files).forEach( (file) => formData.append("photoDeProfil", file));

            this.employeService.createEmploye(formData)
            .subscribe({
                next: (response) => {
                    this.createEmpSubmitBtnText = "Ajouter employé";
                    this.findEmp();
                    this.empFormSubmitMessage = "Employé créée";
                },
                error: (error) => {
                    this.submittingEmp = false;
                    this.empFormErrorMessage = error.error.message;
                },
                complete: () => {
                    this.submittingEmp = false;
                }
            });
        }
    }

    editEmp(event){
        if(this.empForm.valid){
            this.submittingEmp = true;
            this.editEmpSubmitBtnText = "";

            this.resetEmpMessage();

            let formData: any = new FormData();             
            formData.append("nom",  this.empForm.get("nom")!.value);
            formData.append("prenom",  this.empForm.get("prenom")!.value);
            formData.append("sexe",  this.empForm.get("sexe")!.value);
            formData.append("dateDeNaissance",  this.empForm.get("dateDeNaissance")!.value);
            formData.append("login",  this.empForm.get("login")!.value);
            formData.append("motdepasse",  this.empForm.get("motdepasse")!.value);

            Array.from(event.target[0].files).forEach( (file) => formData.append("photoDeProfil", file));

            this.employeService.updateEmploye(this.selectedEmp["_id"], formData)
            .subscribe({
                next: (response) => {
                    this.findEmp();
                    this.empFormSubmitMessage = "Employé modifié";
                },
                error: (error) => {
                    console.log(error);
                    this.empFormErrorMessage = error.error.message;
                },
                complete: () => {
                    this.submittingEmp = false;
                    this.editEmpSubmitBtnText = "Modifier employé";
                }
            });
        }
    }

    paginate( page = 1 ){
        this.currentPage = page;
        this.findEmp(this.currentPage);
    }

    findEmp( page = 1 ){
        this.fetching = true;
        this.empSearch.page = page ;
        this.employeService.findEmp(this.empSearch)
        .subscribe({
            next: (response) => {
                var data = JSON.parse(JSON.stringify(response));
                this.employes = data.data;
                this.totalPage = data.totalPage;
                this.fetching = false;
            },
            error: (error) => {
                console.log(error)
                this.fetching = false;
            }
        });
    }

    deleteEmp(){
        this.employeService.deleteEmploye(this.selectedEmp["_id"])
        .subscribe({
            next: (response) => {
                var data = JSON.parse(JSON.stringify(response));
                this.deleteMessage = data.message;
                this.findEmp();
            },
            error: (error) => {
                console.log(error)
            }
        });
    }

    get f(): { [key: string]: AbstractControl } {
		return this.empForm.controls;
	}

    resetEmpMessage(){
        this.empFormErrorMessage = "";
        this.empFormSubmitMessage = "";
        this.createEmpSubmitBtnText = "Ajouter employé";
        this.editEmpSubmitBtnText = "Modifier employé";
    }

    resetEmpForm(){
        this.empForm = new FormGroup({
            nom: new FormControl(''),
            prenom: new FormControl(''),
            sexe: new FormControl('Homme'),
            dateDeNaissance: new FormControl(''),
            login: new FormControl(''),
            motdepasse: new FormControl('')
        });
    }

    selectEmp(emp){
        this.resetEmpMessage();

        this.employeService.getEmpCompte(emp._id)
        .subscribe({
            next: (response) => {
                this.selectedEmp = emp;

                this.selectedEmp["compte"] = JSON.parse(JSON.stringify(response)) || {};
                
                this.empForm = new FormGroup({
                    photoDeProfil: new FormControl(''),
                    nom: new FormControl(emp.nom),
                    prenom: new FormControl(emp.prenom),
                    sexe: new FormControl(emp.sexe),
                    dateDeNaissance: new FormControl(emp.dateDeNaissance.split('T')[0]),
                    login: new FormControl(this.selectedEmp["compte"].login),
                    motdepasse: new FormControl(this.selectedEmp["compte"].motdepasse)
                });
            }
        })
    }
}
