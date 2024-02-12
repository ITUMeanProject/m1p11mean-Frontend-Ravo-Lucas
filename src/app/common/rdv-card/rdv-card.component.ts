import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-rdv-card',
    templateUrl: './rdv-card.component.html',
    styleUrls: ['./rdv-card.component.css']
})
export class RdvCardComponent implements OnInit {

    @Input() rdv: any;
    @Input() clt: any = undefined;
    @Input() suividetache: boolean = false;

    constructor() { }

    ngOnInit(): void {
    }

    dateDiff(time: string) {
        var date = new Date(time),
            diff = ((date.getTime() - (new Date()).getTime()) / 1000),
            daydiff = Math.floor(diff / 86400);

        if (isNaN(daydiff)) return '';
        
        return daydiff == 0 && "Aujourdh'ui" ||
            daydiff == -1 && `Hier` ||
            daydiff < -1 && `il y a ${daydiff*-1} jour(s)` ||
            daydiff == 1 && `Demain`||
            daydiff > 1 && `Dans ${daydiff} jour(s)`;
    }
}
