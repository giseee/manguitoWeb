import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../_models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loginUrl = 'http://localhost:8080/api/public/authenticate';
  private readonly TOKEN_KEY = 'access_token';

  private currentUsuarioSubject: BehaviorSubject<Usuario>;

  public currentUsuario: Observable<Usuario>;
  constructor(private http: HttpClient) {
      this.currentUsuarioSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUsuario') as string));
      this.currentUsuario = this.currentUsuarioSubject.asObservable();
  }
  public get currentUsuarioValue(): Usuario {
    return this.currentUsuarioSubject.value;
  }

  setToken(token: string): void {
    if (token) {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

login(nombreUser: string, password: string): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  const credentials = { nombre: nombreUser, password: password };

  return this.http
    .post<{ token: string }>(this.loginUrl, credentials, { headers })
    .pipe(
      map((response) => {
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('currentUsuario', JSON.stringify(credentials));
        this.currentUsuarioSubject.next(credentials);
      })
    );
}

  logout() {

    localStorage.removeItem('currentUsuario');
    localStorage.clear();
    this.currentUsuarioSubject.next(null as any);
    //window.location.href = './';
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
