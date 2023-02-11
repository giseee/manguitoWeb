import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment as env } from 'src/environments/environments';


import { Usuario } from '../_models/usuario';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    private currentUsuarioSubject: BehaviorSubject<Usuario>;

    public currentUsuario: Observable<Usuario>;

    constructor(private http: HttpClient) {
        this.currentUsuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUsuario') as string));
        this.currentUsuario = this.currentUsuarioSubject.asObservable();
    }

    public get currentUsuarioValue(): Usuario {
        return this.currentUsuarioSubject.value;
    }

    login(nombreUsuario: string, password: string) {
        return this.http.post<any>(`${env.url}/auth`, { nombreUsuario, password })
            .pipe(map(credentials => {

                if (credentials && credentials.token) {

                    localStorage.setItem('currentUsuario', JSON.stringify(credentials));
                    this.currentUsuarioSubject.next(credentials);
                }

                return credentials;
            }));
    }

    logout() {

        localStorage.removeItem('currentUsuario');
        this.currentUsuarioSubject.next(null as any);
    }
}
