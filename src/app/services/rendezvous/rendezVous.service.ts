import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Envs from 'src/app/utils/Envs';

@Injectable({
    providedIn: 'root'
})
export class RendezVousService {
    constructor(private http: HttpClient) {}

    fetchRdv(id?: string){
        var url = (!id) ? `${Envs.API_BASEURL}rendezvousAPI/rendezVous` : `${Envs.API_BASEURL}rendezvousAPI/rendezVous/${id}`
        return this.http.get(url);
    }

    findRdv(filter){
        var url = `${Envs.API_BASEURL}rendezvousAPI/findRendezVous?`;
        if(filter.nomClient != '' && filter.nomClient != undefined) url += `&nomClient=${filter.nomClient}`;
        if(filter.prenomClient != '' && filter.prenomClient != undefined) url += `&prenomClient=${filter.prenomClient}`;
        if(filter._date != '' && filter._date != undefined) url += `&_date=${filter._date}`;
        if(filter.datedebut != '' && filter.datedebut != undefined) url += `&datedebut=${filter.datedebut}`;
        if(filter.datefin != '' && filter.datefin != undefined) url += `&datefin=${filter.datefin}`;

        return this.http.get(url);
    }

    suiviTacheResumeEmp(filter){
        var url = `${Envs.API_BASEURL}rendezvousAPI/suiviTacheEmp?`;
        if(filter.emp != '' && filter.emp != undefined) url += `&emp=${filter.emp}`;
        if(filter.datedebut != '' && filter.datedebut != undefined) url += `&datedebut=${filter.datedebut}`;
        if(filter.datefin != '' && filter.datefin != undefined) url += `&datefin=${filter.datefin}`;

        return this.http.get(url);
    }
}
