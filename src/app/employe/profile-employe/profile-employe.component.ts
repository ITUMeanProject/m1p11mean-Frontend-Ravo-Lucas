import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeService } from 'src/app/services/employe/employe.service';
import { HoraireDeTravailService } from 'src/app/services/employe/horaire-de-travail.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile-employe.component.html',
  styleUrls: ['./profile-employe.component.css']
})
export class ProfileEmployeComponent implements OnInit {
    employe: any;
    horaire: any;
    user = {};

    profileForm: FormGroup = new FormGroup({
		pdp: new FormControl(''),
		nom: new FormControl(''),
        prenom: new FormControl(''),
		sexe: new FormControl(''),
        dateDeNaissance: new FormControl(''),
        login: new FormControl(''),
        motdepasse: new FormControl('')
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
    
    constructor(private formBuilder: FormBuilder, private employeService: EmployeService, private horaireDeTravailService: HoraireDeTravailService, private userService: UserService){}

    getEmploye(){
        this.employeService.fetchEmp(this.user["userId"])
        .subscribe( (response) => {
            this.employe = JSON.parse(JSON.stringify(response));

            this.employeService.getEmpCompte(this.employe._id)
            .subscribe({
                next: (response) => {
                    this.employe.compte = JSON.parse(JSON.stringify(response));
                    this.profileForm = this.formBuilder.group(
                        {
                            pdp: [],
                            nom: [this.employe.nom, [Validators.required]],
                            prenom: [this.employe.prenom, [Validators.required]],
                            sexe: [this.employe.sexe, [Validators.required, Validators.required]],
                            dateDeNaissance: [this.employe.dateDeNaissance.split("T")[0], [Validators.required]],
                            login: [this.employe.compte.login, [Validators.required, Validators.required]],
                            motdepasse: [this.employe.compte.motdepasse, [Validators.required, Validators.required]]
                        }
                    );
                }
            });
        })
    }

    getHoraire(){
        var isoDate = new Date().toISOString().split("T")[0];
        this.horaireDeTravailService.fetchAllHoraireByDate(this.user["userId"], isoDate)
        .subscribe( (response) => {
            this.horaire = JSON.parse(JSON.stringify(response));
            console.log(this.horaire);
        })
    }

    ngOnInit(): void {
        this.user = this.userService.getUser();
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
        this.profileFormErrorMessage = "";
        this.profileSubmitMessage = "";
        this.profileSubmitBtnText = "";
        this.submittedProfile = true;
        this.submittingProfile = true;

		if (!this.profileForm.invalid) {
            let formData: any = new FormData();             
            formData.append("nom",  this.profileForm.get("nom")!.value);
            formData.append("prenom",  this.profileForm.get("prenom")!.value);
            formData.append("sexe",  this.profileForm.get("sexe")!.value);
            formData.append("dateDeNaissance",  this.profileForm.get("dateDeNaissance")!.value);
            formData.append("login",  this.profileForm.get("login")!.value);
            formData.append("motdepasse",  this.profileForm.get("motdepasse")!.value);

            Array.from(event.target[0].files).forEach( (file) => formData.append("photoDeProfil", file));

            this.employeService.updateEmploye(this.user["userId"], formData)
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
    resetHoraireForm(){
        this.horaireSubmitBtnText = "Ajouter un nouvel Horaire";
        this.submittedHoraire = false;
        this.submittingHoraire = false;
    }
    onHoraireSubmit(event: any): void {
        this.horaireSubmitBtnText = "";
        this.submittedHoraire = true;
        this.submittingHoraire = true;
        this.horaireForm.value.employe = this.user["userId"];

        this.horaireDeTravailService.createOrUpdateHoraire(this.employe._id, this.horaireForm.value)
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
            () => {
                this.resetHoraireForm()
            }
        );
	}

}
