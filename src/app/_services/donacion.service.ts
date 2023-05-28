import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Donaciones } from "../_models/donaciones";


@Injectable({
    providedIn: 'root'
})
export class DonacionService {

    constructor(
        private http: HttpClient
    ) { }

    crearDonacion(donacion: Donaciones){
        return this.http.post<Donaciones>('http://localhost:8080/api/donacion', donacion);
    }

}