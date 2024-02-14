import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Envs from 'src/app/utils/Envs';

@Injectable({
  providedIn: 'root'
})
export class ManagerService {

    constructor(private http: HttpClient) { }

    fetchMng(id?: string){
        return this.http.get(`${Envs.API_BASEURL}managerAPI/manager/${id}`);
    }

    updateManager(id: string, formData: any) {
        return this.http.put(`${Envs.API_BASEURL}managerAPI/manager/${id}`, formData);
    }

    login(formData: any){
        return this.http.post(`${Envs.API_BASEURL}login/manager`, formData);
    }
}
