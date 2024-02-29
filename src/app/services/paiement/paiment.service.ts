import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Envs from 'src/app/utils/Envs';

@Injectable({
    providedIn: 'root'
})
export class PaimentService {

    constructor(private http: HttpClient) { }
    createPaiement(formData: any) {
        return this.http.post(`${Envs.API_BASEURL}paiementAPI/paiement`, formData);
    }
}
