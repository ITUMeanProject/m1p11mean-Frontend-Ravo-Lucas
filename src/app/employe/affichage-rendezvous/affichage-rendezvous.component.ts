import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-affichage-rendezvous',
  templateUrl: './affichage-rendezvous.component.html',
  styleUrls: ['./affichage-rendezvous.component.css']
})
export class AffichageRendezvousComponent implements OnInit {
    
    rendezVous: any = [];
    calendarOptions: CalendarOptions = {
        locale: frLocale,
        initialView: 'dayGridMonth',
        plugins: [dayGridPlugin, timeGridPlugin],
        headerToolbar: {
            left: 'prev,next',
            center: 'title',
            right: 'today dayGridMonth,timeGridWeek'
        },
        themeSystem: 'bootstrap5'
    };

    constructor() { }

    ngOnInit(): void {
        this.rendezVous = [
            { title: 'event 1', date: '2024-02-01' },
            { title: 'event 2', date: '2024-02-02' }
        ];
        this.calendarOptions.events = this.rendezVous;
    }

}
