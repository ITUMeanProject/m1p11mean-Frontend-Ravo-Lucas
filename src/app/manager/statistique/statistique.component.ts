import { Component, OnInit } from '@angular/core';
import { StatistiqueService } from 'src/app/services/statistique/statistique.service';

import { Chart, ChartConfiguration, ChartType } from 'chart.js';

@Component({
  selector: 'app-statistique',
  templateUrl: './statistique.component.html',
  styleUrls: ['./statistique.component.css']
})
export class StatistiqueComponent implements OnInit {

    tempsMoyenneDeTravail = [];
    nbReservation = [];
    chiffreDaffaire = [];
    benefice = [];
    
    filter: any;

    chartOptions: any;
    chartType: string;

    tempsMoyenneDeTravailChartData = [];
    tempsMoyenneDeTravailChartLabels = [];
    
    nbReservationChartData = [];
    nbReservationChartLabels = [];

    beneficeChartData = [];
    beneficeChartLabels = [];

    chiffreDaffaireChartData = [];
    chiffreDaffaireChartLabels = [];

    constructor(private statistiqueService: StatistiqueService) { 
        this.filter = {
            time: "jour",
            interval: ""
        }
        this.chartOptions = {
            responsive: true,
            scales: {
                yAxes: [
                    {
                        ticks: {
                            beginAtZero: true
                        }
                    }
                ]
            }
        };
        this.chartType = "bar";
    }

    ngOnInit(): void {
        this.filter = {
            time: "jour",
            interval: `${new Date().getFullYear()}-${new Date().getMonth()+1}`
        }
        this.setChartData();
    }

    setChartData(){
        this.getTempsMoyenneDeTravail();
        this.getNbReservation(this.filter);
        this.getChiffreDaffaire(this.filter);
        this.getBenefice(this.filter);
    }

    changeChartType(type){
        this.chartType = type;
    }

    toChartLabel(data, targetIndex, properties){
        var labels = [];
        data.forEach( (element) => {
            var label = ''
            properties.forEach( (property) => {
                label += `${element[targetIndex][property]} `;
            })
            labels.push(label);
        })
        return labels;
    }

    toChartData(data, datakey, datalabel){
        var chartData = []

        var array = []
        data.forEach( (element) => {
            array.push(element[datakey]);
        })

        chartData.push(
            {
                data: array,
                label: datalabel,
                color: "red"
            }
        );

        return chartData;
    }

    getTempsMoyenneDeTravail(){
        this.statistiqueService.getTempsMoyenneDeTravail()
        .subscribe({
            next: (response) => {
                this.tempsMoyenneDeTravail = JSON.parse(JSON.stringify(response));

                this.tempsMoyenneDeTravailChartData = this.toChartData(this.tempsMoyenneDeTravail, "tempsMoyenneDeTravail", "Temps moyenne de travail");
                this.tempsMoyenneDeTravailChartLabels = this.toChartLabel(this.tempsMoyenneDeTravail, "employe", ["nom", "prenom"]);
            },
            error: (error) => {}
        })
    }

    getNbReservation(filter){
        this.statistiqueService.getNombreReservation(filter)
        .subscribe({
            next: (response) => {
                this.nbReservation = JSON.parse(JSON.stringify(response));

                this.nbReservationChartData = this.toChartData(this.nbReservation["data"], "count", "Nombre de reservation");
                this.nbReservationChartLabels = this.toChartLabel(this.nbReservation["data"], "_id", ["day"]).map( (label) => {
                    return label.split("T")[0];
                });
            },
            error: (error) => {}
        })
    }

    getChiffreDaffaire(filter){
        this.statistiqueService.getChiffreDaffaire(filter)
        .subscribe({
            next: (response) => {
                this.chiffreDaffaire = JSON.parse(JSON.stringify(response));

                this.chiffreDaffaireChartData = this.toChartData(this.chiffreDaffaire["data"], "montant", "Chiffre d'affaire");
                this.chiffreDaffaireChartLabels = this.toChartLabel(this.chiffreDaffaire["data"], "_id", ["day"]).map( (label) => {
                    return label.split("T")[0];
                });
            },
            error: (error) => {}
        })
    }
    
    getBenefice(filter){
        this.statistiqueService.getBenefice(filter)
        .subscribe({
            next: (response) => {
                this.benefice = JSON.parse(JSON.stringify(response));

                this.beneficeChartData = this.toChartData(this.benefice["data"], "benefices", "Benefices")
                .map( (data) => {
                    var color = [];
                    var fill = [];
                    data.data.forEach( (item) => {
                        if(item < 0) color.push("rgba(225,0,0,0.5)");
                        if(item > 0) color.push("rgba(0,225,0,0.5)");
                    })
                    data["backgroundColor"] = color;
                    return data;
                });

                this.beneficeChartLabels = this.toChartLabel(this.benefice["data"], "_id", ["day"])
                .map( (label) => {
                    return label.split("T")[0];
                });
            },
            error: (error) => {}
        })
    }
}
