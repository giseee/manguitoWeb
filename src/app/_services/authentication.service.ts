import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment as env } from 'src/environments/environments';
import { Usuario } from '../_models/usuario';
import { Router } from '@angular/router';
import { LoginCredentials } from '../_models/login-credentials.interface';
import { UsuarioService } from './usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private static USER_KEY_LOCALSTORE = 'User';
  private readonly TOKEN_KEY = 'access_token';
  private currentUsuarioSubject = new BehaviorSubject<Usuario | null>(null);
  currentUsuario$ = this.currentUsuarioSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.currentUsuario$.pipe(map(Boolean));
  id!:number;
  constructor(private http: HttpClient, private router: Router) {
    this.loadUserFromSessionStorage();
  }

  get currentUsuarioValue(): Usuario | null {
    return this.currentUsuarioSubject.value;
  }

  setToken(token: string): void {
    if (token) {
      localStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  login(credentials: LoginCredentials): Observable<void> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, DELETE, PUT, OPTIONS',
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, X-Custom-header',
      'Access-Control-Expose-Headers': 'Authorization'
    });

    return this.http
      .post<any>(`${env.url}/api/public/authenticate`, credentials, { 'headers':headers, observe: 'response' })
      .pipe(
        map((response) => {
          let token = response.headers.get("Authorization") as string;
          var usuario = JSON.parse(JSON.stringify(response.body)) as Usuario;
          this.id=usuario.id;
          sessionStorage.setItem(this.TOKEN_KEY, token);
          sessionStorage.setItem(AuthenticationService.USER_KEY_LOCALSTORE, JSON.stringify(response.body));
          this.currentUsuarioSubject.next(usuario);
          this.redirectToDashboard();
        })
      );
  }


  logout() {
    this.removeUserFromSessionStorage();
    this.currentUsuarioSubject.next(null as any);
    this.router.navigateByUrl('/');
  }
  isLoggedIn(): boolean {
    return sessionStorage.getItem(this.TOKEN_KEY) !== null;
  }
  private redirectToDashboard(): void {
    this.router.navigateByUrl('/dashboard');
  }

  private loadUserFromSessionStorage(): void {
    const userFromSession = sessionStorage.getItem(AuthenticationService.USER_KEY_LOCALSTORE) as string;
    var usuario = JSON.parse(JSON.stringify(userFromSession)) as Usuario;

    //userFromSession puede ser null -> cortocircuito como guarda para el next
    userFromSession && this.currentUsuarioSubject.next(usuario);
  }

  private removeUserFromSessionStorage(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(AuthenticationService.USER_KEY_LOCALSTORE);
  }

  public getToken(): string | null{
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUsuario(): Usuario | null {
    return this.currentUsuarioSubject.value;
  }
  getCurrentUser(): Usuario | null {
    const userFromSession = sessionStorage.getItem(AuthenticationService.USER_KEY_LOCALSTORE);
    if (userFromSession) {
      return JSON.parse(JSON.stringify(userFromSession)) as Usuario;
    } else {
      return null;
    }
  }
  getCurrentUserId(): number {
    return this.id
  }
}
