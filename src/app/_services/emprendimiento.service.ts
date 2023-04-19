import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario,Categoria, EmprendimientoDto } from '../_interfaces/emprendimiento';
import { Emprendimiento } from '../_models/emprendimiento';
import { environment as env } from 'src/environments/environments';
//import { Categorias } from '../_models/categorias';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class EmprendimientoService {
  private emprendimientoId!: number;
  constructor(private http: HttpClient, private authService: AuthenticationService) { }


  getAll() {
      return this.http.get<Emprendimiento[]>(`${env.url}/api/emprendimientos`);
  }

  getPorID(id: number) {
      return this.http.get<Emprendimiento>(`${env.url}/api/emprendimientos/${id}`);
  }
  crearEmprendimiento(emprendimiento: Emprendimiento) {
    return this.http.post<Emprendimiento>(`${env.url}/api/emprendimientos`,emprendimiento);
  }
  create(emprendimiento:EmprendimientoDto){
    return this.http.post<Emprendimiento>(`${env.url}/api/emprendimientos`,emprendimiento);
  }

  public delEmprendimientoById(id: Number) {
      return this.http.delete(`${env.url}/api/delete/` + id, { observe: 'response' })
  }

  putEmprendimiento( emprendimiento: Emprendimiento) {
      return this.http.put<Emprendimiento>(`${env.url}/api/emprendimientos/${emprendimiento.id}`, emprendimiento)
  }

  getEmprendimientoId(id: Number) {
      return this.http.get<Emprendimiento>(`${env.url}/api/usuarios/${id}/emprendimiento`);
  }
  getCategoria(id: Number) {
    return this.http.get<Categoria[]>(`${env.url}/api/categorias/` + id);
}
getUsuarios(): Observable<Usuario[]> {
  return this.http.get<Usuario[]>(`${env.url}/api/usuarios`);
}
  updateEmprendimiento(emprendimiento: Emprendimiento): Observable<Emprendimiento> {
    return this.http.put<Emprendimiento>(`${env.url}/emprendimientos/`+ emprendimiento.id, emprendimiento);

  }

  getEmprendimientoById(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(`${env.url}/api/emprendimientos/${id}`, { headers });
  }
  getEmprendimientos(): Observable<Emprendimiento[]> {
    return this.http.get<Emprendimiento[]>(`${env.url}/api/emprendimientos`);
  }

  getEmprendimiento(id: number): Observable<Emprendimiento> {
    return this.http.get<Emprendimiento>(`${env.url}/api/emprendimientos/${id}`);
  }
  getEmprendimientosPorUsuario(userId: number): Observable<Emprendimiento> {
    return this.http.get<Emprendimiento>(`${env.url}/api/usuarios/${userId}/emprendimiento`);
  }

  setEmprendimientoId(emprendimientoId: number) {
    this.emprendimientoId = emprendimientoId;
  }

  getEmprendimientoIdValue(): number {
    return this.emprendimientoId;
  }

  // Resto de métodos
}


