import { Component, OnInit } from '@angular/core';
import { RendezVousService } from 'src/app/services/rendezvous/rendezVous.service';

@Component({
  selector: 'app-suivi-des-taches',
  templateUrl: './suivi-des-taches.component.html',
  styleUrls: ['./suivi-des-taches.component.css']
})
export class SuiviDesTachesComponent implements OnInit {
    _date: any = new Date();
    resumeJournee: any = [];
    emp: any = "65c4e5eab08f1c68907534d7";
    rendezVous = [];

    constructor(private rendezVousService: RendezVousService) { }

    ngOnInit(): void {
        var search = {}
        if(this._date != '' && this._date != undefined) {
            search = {
                datedebut: `${this._date}T00:00`,
                datefin: `${this._date}T24:00`
            }
        }
        this.rendezVousService.findRdv(search)
        .subscribe({
            next: (response) => {
                var data = JSON.parse(JSON.stringify(response));
                this.rendezVous = data;
            },
            error: (error) => {
                console.log(error)
            }
        });

    }
    resetFilter(){
        this._date = '';
    }

    findRdv(){
        var search = {}
        if(this._date != '' && this._date != undefined) {
            search = {
                datedebut: `${this._date}T00:00`,
                datefin: `${this._date}T24:00`
            }
        }
        this.rendezVousService.findRdv(search)
        .subscribe({
            next: (response) => {
                var data = JSON.parse(JSON.stringify(response));
                this.rendezVous = data;
            },
            error: (error) => {
                console.log(error)
            }
        });
        search["emp"] = this.emp;
        this.rendezVousService.suiviTacheResumeEmp(search)
        .subscribe({
            next: (response) => {
                var data = JSON.parse(JSON.stringify(response));
                this.resumeJournee = data;
            },
            error: (error) => {
                console.log(error)
            }
        });
    }

}
