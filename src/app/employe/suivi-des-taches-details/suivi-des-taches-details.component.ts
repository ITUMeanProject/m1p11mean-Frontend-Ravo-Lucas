import { Component, NgModule, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RendezVousService } from 'src/app/services/rendezvous/rendezVous.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-suivi-des-taches-details',
    templateUrl: './suivi-des-taches-details.component.html',
    styleUrls: ['./suivi-des-taches-details.component.css'],
})
export class SuiviDesTachesDetailsComponent implements OnInit {

    rendezVousId: any = '';
    rendezVousData: any = {};
    updateMsg: string = '';
    updateError: string = '';
    tacheToDo = [];
    tacheDone = [];

    constructor(private route: ActivatedRoute, private rendezVousService: RendezVousService) { }

    getRdv(){
        this.rendezVousService.fetchRdv(this.rendezVousId).subscribe({
            next: (response) => {
                var data = JSON.parse(JSON.stringify(response.body));
                this.rendezVousData = data;

                this.tacheToDo = [];
                this.tacheDone = [];

                data.services.forEach( el => {
                    this.tacheToDo.push(el);
                });
                data.tachesEffectue.forEach( el => {
                    this.tacheDone.push(el);
                });
            },
            error: (error) => {
                console.log(error)
            }
        });
    }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.rendezVousId = params['rdvId'];
            this.getRdv();
        });
    }

    updateRdv(){
        var tacheToDoId = [];
        this.tacheToDo.forEach(tache => {
            tacheToDoId.push(tache._id);
        })
        this.rendezVousData.services = tacheToDoId;

        var tacheDoneId = [];
        this.tacheDone.forEach(tache => {
            tacheDoneId.push(tache._id);
        })
        this.rendezVousData.tachesEffectue = tacheDoneId;

        this.rendezVousService.updateRdv(this.rendezVousData._id, this.rendezVousData).subscribe({
            next: (response) => {
                this.getRdv();
                this.updateMsg = "Rdv mise à jour";
            },
            error: (error) => {
                this.updateError = error.error.message;
            }
        });
    }

    drop(event: CdkDragDrop<string[]>) {
        if (event.previousContainer === event.container) {
            moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        } else {
            transferArrayItem(
                event.previousContainer.data,
                event.container.data,
                event.previousIndex,
                event.currentIndex,
            );
        }
    }
}
