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
        return this.http.get(`${Envs.API_BASEURL}employeAPI/employe/${id}`);
    }

    updateEmploye(id: string, formData: any) {
        return this.http.put(`${Envs.API_BASEURL}employeAPI/employe/${id}`, formData);
    }

    login(formData: any){
        return this.http.post(`${Envs.API_BASEURL}login/employe`, formData);
    }
}
