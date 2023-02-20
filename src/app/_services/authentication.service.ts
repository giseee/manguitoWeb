import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private loginUrl = 'http://localhost:8080/api/public/authenticate';
  private readonly TOKEN_KEY = 'access_token';
  constructor(private http: HttpClient) {}

  setToken(token: string): void {
    if (token) {
      sessionStorage.setItem(this.TOKEN_KEY, token);
    }
  }

  removeToken(): void {
    sessionStorage.removeItem(this.TOKEN_KEY);
  }

  login(username: string, password: string): Observable<void> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const credentials = { username: username, password: password };

    return this.http
      .post<{ token: string }>(this.loginUrl, credentials, { headers })
      .pipe(
        map((response) => {
          localStorage.setItem('access_token', response.token);
        })
      );
  }

  logout() {
    localStorage.removeItem('access_token');
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access_token') !== null;
  }
}
