import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Envs from 'src/app/utils/Envs';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {
    constructor(private http: HttpClient) {}

    getTempsMoyenneDeTravail(){
        var url = `${Envs.API_BASEURL}managerAPI/statsemployehoraire`;

        return this.http.get(url);
    }

    getNombreReservation(filter){
        var url = `${Envs.API_BASEURL}managerAPI/nombreDeRendezVous?`;
        if(filter.time != '' && filter.time != undefined) url += `&time=${filter.time}`;
        if(filter.interval != '' && filter.interval != undefined) url += `&interval=${filter.interval}`;

        return this.http.get(url);
    }
    
    getChiffreDaffaire(filter){
        var url = `${Envs.API_BASEURL}managerAPI/chiffreDaffaires?`;
        if(filter.time != '' && filter.time != undefined) url += `&time=${filter.time}`;
        if(filter.interval != '' && filter.interval != undefined) url += `&interval=${filter.interval}`;

        return this.http.get(url);
    }

    getDepense(filter){
        var url = `${Envs.API_BASEURL}managerAPI/depenseTotal?`;
        if(filter.time != '' && filter.time != undefined) url += `&time=${filter.time}`;
        if(filter.interval != '' && filter.interval != undefined) url += `&interval=${filter.interval}`;

        return this.http.get(url);
    }

    getBenefice(filter){
        var url = `${Envs.API_BASEURL}managerAPI/benefice?`;
        if(filter.time != '' && filter.time != undefined) url += `&time=${filter.time}`;
        if(filter.interval != '' && filter.interval != undefined) url += `&interval=${filter.interval}`;

        return this.http.get(url);
    }
}
