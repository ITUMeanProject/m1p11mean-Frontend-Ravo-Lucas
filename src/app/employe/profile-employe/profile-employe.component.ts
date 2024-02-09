import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { HoraireDeTravailService } from 'src/app/services/employe/horaire-de-travail.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-employe.component.html',
  styleUrls: ['./profile-employe.component.css']
})
export class ProfileEmployeComponent implements OnInit {
    employe: any;
    horaire: any;
    id = "65c4e5eab08f1c68907534d7";

    profileForm: FormGroup = new FormGroup({
		pdp: new FormControl(''),
		nom: new FormControl(''),
        prenom: new FormControl(''),
		sexe: new FormControl(''),
        dateDeNaissance: new FormControl('')
	});
    profileFormErrorMessage = "";
    profileSubmitMessage = "";
    profileSubmitBtnText = "Modifier le profile";
    submittingProfile = false;
	submittedProfile = false;

    horaireForm: FormGroup = new FormGroup({
		date: new FormControl(''),
		heure_debut: new FormControl(''),
        heure_fin: new FormControl('')
	});
    horaireFormErrorMessage = "";
    horaireSubmitMessage = "";
    horaireSubmitBtnText = "Ajouter un nouvel Horaire";
    submittingHoraire = false;
	submittedHoraire = false;

    get f(): { [key: string]: AbstractControl } {
		return this.profileForm.controls;
	}
    
    constructor(private formBuilder: FormBuilder, private employeService: EmployeService, private horaireDeTravailService: HoraireDeTravailService){}

    getEmploye(){
        this.employeService.fetchEmp(this.id)
        .subscribe( (response) => {
            this.employe = JSON.parse(JSON.stringify(response));
            console.log(this.employe);
            this.profileForm = this.formBuilder.group(
                {
                    pdp: [],
                    nom: [this.employe.nom, [Validators.required]],
                    prenom: [this.employe.prenom, [Validators.required]],
                    sexe: [this.employe.sexe, [Validators.required, Validators.required]],
                    dateDeNaissance: [this.employe.dateDeNaissance.split("T")[0], [Validators.required]]
                }
            );
        })
    }

    getHoraire(){
        var isoDate = new Date().toISOString().split("T")[0];
        this.horaireDeTravailService.fetchAllHoraireByDate(this.id, isoDate)
        .subscribe( (response) => {
            this.horaire = JSON.parse(JSON.stringify(response));
            console.log(this.horaire);
        })
    }

    ngOnInit(): void {
        this.getEmploye();
        this.getHoraire();

        var isoDate = new Date().toISOString().split("T")[0];
        this.horaireForm = this.formBuilder.group(
            {
                date: [isoDate, [Validators.required]],
                heure_debut: ["08:00", [Validators.required]],
                heure_fin: ["17:00", [Validators.required]]
            }
        );
	}

    resetProfileForm(){
        this.profileSubmitBtnText = "Modifier le profile";
        this.submittingProfile = false;
        this.submittedProfile = false;
    }

    onProfileFormSubmit(event: any): void {
        this.profileSubmitBtnText = "";
        this.submittedProfile = true;
        this.submittingProfile = true;

		if (!this.profileForm.invalid) {
            let formData: any = new FormData();             
            formData.append("nom",  this.profileForm.get("nom")!.value);
            formData.append("prenom",  this.profileForm.get("prenom")!.value);
            formData.append("sexe",  this.profileForm.get("sexe")!.value);
            formData.append("dateDeNaissance",  this.profileForm.get("dateDeNaissance")!.value);

            Array.from(event.target[0].files).forEach( (file) => formData.append("photoDeProfil", file));

            this.employeService.updateEmploye(this.id, formData)
            .subscribe(
                response => {
                    this.profileSubmitMessage = "Profile modifié";
                    this.getEmploye();
                },
                error => {
                    console.log(error);
                    this.profileFormErrorMessage = error.error.message || "Erreur de connexion";
                },
                () => {
                    this.resetProfileForm()
                }
            );
        }
	}

    onHoraireSubmit(event: any): void {
        this.horaireSubmitBtnText = "";
        this.submittedProfile = true;
        this.submittingHoraire = true;
        this.horaireForm.value.employe = this.id;

        this.horaireDeTravailService.createHoraire(this.horaireForm.value)
        .subscribe(
            response => {
                this.submittedHoraire = true;
                this.horaireSubmitMessage = "Horaire créée";
                this.getHoraire();
            },
            error => {
                console.log(error);
                this.horaireFormErrorMessage = error.error.message || "Erreur de connexion";
            },
        );
	}

}
