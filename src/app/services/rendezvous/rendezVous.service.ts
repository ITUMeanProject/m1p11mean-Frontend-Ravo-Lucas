import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Envs from 'src/app/utils/Envs';
import { BaseService } from '../baseService.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class RendezVousService{
    constructor(private http: HttpClient) {}

    fetchRdv(id?: string){
        var url = (!id) ? `${Envs.API_BASEURL}rendezvousAPI/rendezVous` : `${Envs.API_BASEURL}rendezvousAPI/rendezVous/${id}`
        return this.http.get(url, { observe: 'response' });
    }

    findRdv(filter){
        var url = `${Envs.API_BASEURL}rendezvousAPI/findRendezVous?`;
        if(filter.empId != '' && filter.empId != undefined) url += `&empId=${filter.empId}`;
        if(filter.nomClient != '' && filter.nomClient != undefined) url += `&nomClient=${filter.nomClient}`;
        if(filter.prenomClient != '' && filter.prenomClient != undefined) url += `&prenomClient=${filter.prenomClient}`;
        if(filter._date != '' && filter._date != undefined) url += `&_date=${filter._date}`;
        if(filter.datedebut != '' && filter.datedebut != undefined) url += `&datedebut=${filter.datedebut}`;
        if(filter.datefin != '' && filter.datefin != undefined) url += `&datefin=${filter.datefin}`;

        return this.http.get(url);
    }

    suiviTacheResumeEmp(filter){
        var url = `${Envs.API_BASEURL}rendezvousAPI/suiviTacheEmp?`;
        if(filter.empId != '' && filter.empId != undefined) url += `&empId=${filter.empId}`;
        if(filter.datedebut != '' && filter.datedebut != undefined) url += `&datedebut=${filter.datedebut}`;
        if(filter.datefin != '' && filter.datefin != undefined) url += `&datefin=${filter.datefin}`;

        return this.http.get(url);
    }

    updateRdv(id: string, formData: any) {
        return this.http.put(`${Envs.API_BASEURL}rendezvousAPI/rendezvous/${id}`, formData, { observe: 'response' });
    }

    createRdv(formData: any) {
        return this.http.post(`${Envs.API_BASEURL}rendezvousAPI/rendezvous`, formData);
    }
}
