import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    activiterList = [
        'Soins du corps',
        'Soins du visage',
        'Épilation des parties du corps',
        'Coiffures et coupes pour les adeptes de nouvelles tendances',
        'Microblading'
    ];
    selectedOption: string;
    
    constructor() { }

    ngOnInit(): void {
    }
    

}
