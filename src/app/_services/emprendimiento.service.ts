import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprendimiento,Usuario,Categoria } from '../_interfaces/emprendimiento';

import { environment as env } from 'src/environments/environments';
import { Categorias } from '../_models/categorias';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class EmprendimientoService {

  constructor(private http: HttpClient, private authService: AuthenticationService) { }


  getAll() {
      return this.http.get<Emprendimiento[]>(`${env.url}/api/emprendimientos`);
  }

  getPorID(id: String) {
      return this.http.get<Emprendimiento[]>(`${env.url}/api/emprendimientos/` + id);
  }

  public crearEmprendimiento({ emprendimiento }: { emprendimiento: Emprendimiento; }): any {
    return this.http.post<Emprendimiento>(`${env.url}/api/emprendimientos`, emprendimiento)
}

  public delEmprendimientoById(id: Number) {
      return this.http.delete(`${env.url}/api/delete/` + id, { observe: 'response' })
  }

  putEmprendimiento( emprendimiento: Emprendimiento) {
      return this.http.put<Emprendimiento>(`${env.url}/api/emprendimiento/`, emprendimiento)
  }

  getEmprendimientoId(id: String) {
      return this.http.get<Emprendimiento>(`${env.url}/api/emprendimientos/` + id);
  }
  getCategoria(id: Number) {
    return this.http.get<Categorias>(`${env.url}/api/categorias/` + id);
}
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${env.url}/usuarios`);
  }
  updateEmprendimiento(id: number, emprendimiento: Emprendimiento): Observable<Emprendimiento> {
    return this.http.put<Emprendimiento>(`${env.url}/emprendimientos/${id}`, emprendimiento);

  }

  getEmprendimientoById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(`${env.url}/api/emprendimientos/${id}`, { headers });
  }
}
