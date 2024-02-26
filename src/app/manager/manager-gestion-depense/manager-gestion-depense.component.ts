import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { DepenseService } from 'src/app/services/depense/depense.service';

@Component({
  selector: 'app-manager-gestion-depense',
  templateUrl: './manager-gestion-depense.component.html',
  styleUrls: ['./manager-gestion-depense.component.css']
})
export class ManagerGestionDepenseComponent implements OnInit {

    depenseSearch = {
        type: '',
        date: '',
        prix: 0,
        desc: '',
        page: 1
    };
    selectedDepense = {};
    depenses: [];
    currentPage = 1;
    totalPage = 10;

    depenseForm: FormGroup;

    deleteMessage = "";
    depenseFormErrorMessage = "";
    depenseFormSubmitMessage = "";
    createDepenseSubmitBtnText = "Ajouter depense";
    editDepenseSubmitBtnText = "Modifier depense";
    submittingDepense = false;
	submittedDepense = false;

    constructor(private formBuilder: FormBuilder, private depenseService: DepenseService) { }

    ngOnInit(): void {
        this.resetDepenseForm();
        this.findDepense();
    }

    createDepense(event){
        if(this.depenseForm.valid){
            this.submittingDepense = true;
            this.createDepenseSubmitBtnText = "";

            this.resetDepenseMessage();

            console.log(this.depenseForm.value);

            this.depenseService.createDepense(this.depenseForm.value)
            .subscribe({
                next: (response) => {
                    this.createDepenseSubmitBtnText = "Ajouter depense";
                    this.findDepense();
                    this.depenseFormSubmitMessage = "Dépense créée";
                },
                error: (error) => {
                    this.submittingDepense = false;
                    console.log(error);
                    this.depenseFormErrorMessage = error.error.message;
                },
                complete: () => {
                    this.submittingDepense = false;
                }
            });
        }
    }


    paginate( page = 1 ){
        this.currentPage = page;
        this.findDepense(this.currentPage);
    }

    findDepense( page = 1 ){

        this.depenseSearch.page = page ;
        this.depenseService.findDepense(this.depenseSearch)
        .subscribe({
            next: (response) => {
                var data = JSON.parse(JSON.stringify(response));
                this.depenses = data.data;
                this.totalPage = data.totalPage;
            },
            error: (error) => {
                console.log(error)
            }
        });
    }

    deleteDepense(){
        this.depenseService.deleteDepense(this.selectedDepense["_id"])
        .subscribe({
            next: (response) => {
                var data = JSON.parse(JSON.stringify(response));
                this.deleteMessage = data.message;
                this.findDepense();
            },
            error: (error) => {
                console.log(error)
            }
        });
    }

    get f(): { [key: string]: AbstractControl } {
		return this.depenseForm.controls;
	}

    resetDepenseMessage(){
        this.depenseFormErrorMessage = "";
        this.depenseFormSubmitMessage = "";
        this.createDepenseSubmitBtnText = "Ajouter depenseloyé";
        this.editDepenseSubmitBtnText = "Modifier depenseloyé";
    }

    resetDepenseForm(){
        this.depenseForm = new FormGroup({
            type: new FormControl('Autres dépenses'),
            description: new FormControl(''),
            prix: new FormControl(''),
            date: new FormControl(new Date().toISOString()),
        });
    }

    selectDepense(depense){
        this.resetDepenseMessage();
        this.selectedDepense = depense;
        this.depenseForm = new FormGroup({
            photoDeProfil: new FormControl(''),
            nom: new FormControl(depense.nom),
            prenom: new FormControl(depense.prenom),
            sexe: new FormControl(depense.sexe),
            dateDeNaissance: new FormControl(depense.dateDeNaissance.split('T')[0])
        });
    }
}
