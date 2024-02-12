import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import frLocale from '@fullcalendar/core/locales/fr';
import { RendezVousService } from 'src/app/services/rendezvous/rendezVous.service';

@Component({
  selector: 'app-affichage-rendezvous',
  templateUrl: './affichage-rendezvous.component.html',
  styleUrls: ['./affichage-rendezvous.component.css']
})
export class AffichageRendezvousComponent implements OnInit {
    
    rendezVousSearch = {
        nomClient: '',
        prenomClient: '',
        _date: '',
        datedebut: '',
        datefin: '',
    };
    rendezVous: any = [];
    rendezVousCalendrier: any = [];
    calendarOptions: CalendarOptions = {
        locale: frLocale,
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, timeGridPlugin],
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'today dayGridMonth,timeGridWeek'
        },
        themeSystem: 'bootstrap5',
        eventClick: this.handleEventClick.bind(this),
    };

    constructor(private rendezVousService: RendezVousService) { }

    showModal = "";
    selectedRdv: any;
    handleEventClick(arg: any) {
        this.showModal = "show";
        this.selectedRdv = arg.event.extendedProps.rdv_data;
        console.log(arg.event.extendedProps.rdv_data);
    }
    closeModal(){
        this.showModal = "";
    }
    
    ngOnInit(): void {

        this.rendezVousService.fetchRdv()
        .subscribe({
            next: (response) => {
                var data = JSON.parse(JSON.stringify(response.body));
                this.rendezVous = data;
                data.forEach( (rdv : any) => {
                    this.rendezVousCalendrier.push(
                        {
                            title: rdv.client.nom,
                            date: rdv.date,
                            rdv_data: rdv
                        }
                    );
                });
                this.calendarOptions.events = this.rendezVousCalendrier;
            },
            error: (error) => {
                console.log(error)
            }
        });

    }

    resetFilter(){
        this.rendezVousSearch = {
            nomClient: '',
            prenomClient: '',
            _date: '',
            datedebut: '',
            datefin: '',
        };
    }

    findRdv(){
        this.rendezVousService.findRdv(this.rendezVousSearch)
        .subscribe({
            next: (response) => {
                var data = JSON.parse(JSON.stringify(response));
                this.rendezVous = data;
                data.forEach( (rdv : any) => {
                    this.rendezVousCalendrier.push(
                        {
                            title: rdv.client.nom,
                            date: rdv.date,
                            rdv_data: rdv
                        }
                    );
                });
                this.calendarOptions.events = this.rendezVousCalendrier;
            },
            error: (error) => {
                console.log(error)
            }
        });
    }

}
