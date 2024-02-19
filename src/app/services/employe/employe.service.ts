import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Envs from 'src/app/utils/Envs';
import { BaseService } from '../baseService.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class EmployeService{
    
    constructor(private http: HttpClient) { }

    fetchEmp(id?: string){
        var url = (!id) ? `${Envs.API_BASEURL}employeAPI/employe` : `${Envs.API_BASEURL}employeAPI/employe/${id}`
        return this.http.get(url);
    }

    findEmp(filter){
        var url = `${Envs.API_BASEURL}employeAPI/findEmploye?`;
        if(filter.nomEmp != '' && filter.nomEmp != undefined) url += `&nomEmp=${filter.nomEmp}`;
        if(filter.prenomEmp != '' && filter.prenomEmp != undefined) url += `&prenomEmp=${filter.prenomEmp}`;
        if(filter.sexe != '' && filter.sexe != undefined) url += `&sexe=${filter.sexe}`;
        if(filter.dateDeNaissance != '' && filter.dateDeNaissance != undefined) url += `&dateDeNaissance=${filter.dateDeNaissance}`;

        return this.http.get(url);
    }

    finEmplByHoraireDeTravail(_date: string, _time: string) {
        var url = `${Envs.API_BASEURL}employeAPI/employeDispo?_date=${_date}&_date=${_time}`;
        return this.http.get(url); 
    }

    createEmploye(formData: any){
        return this.http.post(`${Envs.API_BASEURL}employeAPI/employe`, formData);
    }
    
    updateEmploye(id: string, formData: any) {
        return this.http.put(`${Envs.API_BASEURL}employeAPI/employe/${id}`, formData);
    }    
    
    deleteEmploye(id: string){
        return this.http.delete(`${Envs.API_BASEURL}employeAPI/employe/${id}`);
    }

    login(formData: any){
        return this.http.post(`${Envs.API_BASEURL}login/employe`, formData);
    }
}
