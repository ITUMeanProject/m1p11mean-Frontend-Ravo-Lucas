import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Envs from 'src/app/utils/Envs';
import { BaseService } from '../baseService.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HoraireDeTravailService{
    constructor(private http: HttpClient) { }

    fetchAllHoraire(id?: string){
        return this.http.get(`${Envs.API_BASEURL}employeAPI/horaire/${id}`);
    }

    fetchAllHoraireByDate(id: string, date: string){
        return this.http.get(`${Envs.API_BASEURL}employeAPI/horaire?emp=${id}&_date=${date}`);
    }

    createHoraire(formData: any){
        return this.http.post(`${Envs.API_BASEURL}employeAPI/horaire`, formData);
    }

    createOrUpdateHoraire(id: string, formData: any){
        return this.http.put(`${Envs.API_BASEURL}employeAPI/horaire/${id}`, formData);
    }
}
