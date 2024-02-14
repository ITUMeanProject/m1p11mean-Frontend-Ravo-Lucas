import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Envs from 'src/app/utils/Envs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
    constructor(private http: HttpClient) {}

    findService(filter){
        var url = `${Envs.API_BASEURL}serviceAPI/findService?`;
        if(filter.nom != '' && filter.nom != undefined) url += `&nom=${filter.nom}`;
        if(filter.duree != '' && filter.duree != undefined) url += `&duree=${filter.duree}`;
        if(filter.commission != '' && filter.commission != undefined) url += `&commission=${filter.commission}`;
        if(filter.prixMin != '' && filter.prixMin != undefined) url += `&prixMin=${filter.prixMin}`;
        if(filter.prixMax != '' && filter.prixMax != undefined) url += `&prixMax=${filter.prixMax}`;

        return this.http.get(url);
    }

    fetchService(id?: string){
        var url = (!id) ? `${Envs.API_BASEURL}serviceAPI/service` : `${Envs.API_BASEURL}serviceAPI/service/${id}`
        return this.http.get(url);
    }

    deleteService(id: string){
        return this.http.delete(`${Envs.API_BASEURL}serviceAPI/service/${id}`);
    }

    createService(formData: any){
        return this.http.post(`${Envs.API_BASEURL}serviceAPI/service`, formData);
    }
    
    updateService(id: string, formData: any) {
        return this.http.put(`${Envs.API_BASEURL}serviceAPI/service/${id}`, formData);
    }
}
