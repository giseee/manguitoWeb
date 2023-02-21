import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Emprendimiento } from '../_models/emprendimiento';
import { environment as env } from 'src/environments/environments';
@Injectable({
  providedIn: 'root'
})
export class EmprendimientoService {

  constructor(private http: HttpClient) { }


  getAll() {
      return this.http.get<Emprendimiento[]>(`${env.url}/api/emprendimientos`);
  }

  getPorID(id: String) {
      return this.http.get<Emprendimiento[]>(`${env.url}/api/emprendimientos/` + id);
  }

  public crearEmprendimiento({ emprendimiento }: { emprendimiento: Emprendimiento; }): any {
    return this.http.post <Emprendimiento>(`${env.url}/api/emprendimientos`, emprendimiento)
}

  public delEmprendimientoById(id: Number) {
      return this.http.delete(`${env.url}/api/delete/` + id, { observe: 'response' })
  }

  putEmprendimiento(id: String, emprendimiento: Emprendimiento) {
      return this.http.put<Emprendimiento>(`${env.url}/api/emprendimiento/` + id, emprendimiento)
  }

  getEmprendimiento(id: String) {
      return this.http.get<Emprendimiento>(`${env.url}/api/emprendimientos/` + id);
  }

}
