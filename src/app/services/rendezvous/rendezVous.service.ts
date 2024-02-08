import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Envs from 'src/app/utils/Envs';

@Injectable({
    providedIn: 'root'
})
export class RendezVousService {
    constructor(private http: HttpClient) {}

    fetchRdv(id?: string){
        return this.http.get(`${Envs.API_BASEURL}rendezvousAPI/rendezVous`);
    }
}
