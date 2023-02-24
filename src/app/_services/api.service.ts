import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly apiUrl = 'http://localhost:8080/api';

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

 /* getHeaders(): HttpHeaders {
   // const token = this.authService.getToken();
    return new HttpHeaders({ Authorization: `Bearer ${token}` });
  }

  getData(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get(`${this.apiUrl}/data`, { headers });
  }

  postData(data: any): Observable<any> {
    const headers = this.getHeaders();
    return this.http.post(`${this.apiUrl}/data`, data, { headers });
  }*/
}
