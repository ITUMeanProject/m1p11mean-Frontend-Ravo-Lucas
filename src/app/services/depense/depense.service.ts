import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Envs from 'src/app/utils/Envs';

@Injectable({
  providedIn: 'root'
})
export class DepenseService {

    constructor(private http: HttpClient) { }

    findDepense(filter){
        
        var url = `${Envs.API_BASEURL}managerAPI/findDepense?`;
        if(filter.type != '' && filter.type != undefined) url += `&type=${filter.type}`;
        if(filter.desc != '' && filter.desc != undefined) url += `&desc=${filter.desc}`;
        if(filter.date != '' && filter.date != undefined) url += `&date=${filter.date}`;
        if(filter.page != '' && filter.page != undefined) url += `&page=${filter.page}`;

        return this.http.get(url);
    }

    createDepense(formData: any) {
        return this.http.post(`${Envs.API_BASEURL}managerAPI/depense`, formData);
    }

    deleteDepense(id){
        return this.http.delete(`${Envs.API_BASEURL}managerAPI/depense/${id}`);
    }
}
