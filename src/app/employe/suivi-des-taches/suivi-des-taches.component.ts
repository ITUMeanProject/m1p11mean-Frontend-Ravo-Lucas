import { Component, OnInit } from '@angular/core';
import { RendezVousService } from 'src/app/services/rendezvous/rendezVous.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-suivi-des-taches',
  templateUrl: './suivi-des-taches.component.html',
  styleUrls: ['./suivi-des-taches.component.css']
})
export class SuiviDesTachesComponent implements OnInit {
    _date: any = '';
    resumeJournee: any = [];
    user: any = {};
    rendezVous = [];

    constructor(private rendezVousService: RendezVousService, private userService: UserService) { }

    ngOnInit(): void {
        this._date = new Date();
        var search = {
            datedebut: `${this._date.toISOString().split('T')[0]}T00:00`,
            datefin: `${this._date.toISOString().split('T')[0]}T24:00`
        }
        this.user = this.userService.getUser();
        this.findRdv(search);
    }

    findRdv(search){
        search["empId"] = this.user["userId"];
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

    clickFindRdv(){
        var search = {}
        console.log(this._date);
        if(this._date != '' && this._date != undefined) {
            if( typeof this._date == 'string') {
                search = {
                    datedebut: `${this._date}T00:00`,
                    datefin: `${this._date}T24:00`
                }
            } else {
                search = {
                    datedebut: `${this._date.toISOString().split('T')[0]}T00:00`,
                    datefin: `${this._date.toISOString().split('T')[0]}T24:00`
                }
            }
        }
        this.findRdv(search);
    }

}
