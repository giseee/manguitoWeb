import { Injectable } from '@angular/core';
import { Usuario } from '../_models/usuario';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as env } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';
import { User } from '../_models';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  public crearUsuario({ usuario }: { usuario: User; }): any {
      return this.http.post <User>(`${env.url}/api/public/register`, usuario)
  }
  public getUsuarioById(id:String) {
    return this.http.get<Usuario>(`${env.url}/api/usuarios/`+id);

  }
  public putUsuarioById(id:String, usuario:Usuario){
    return this.http.put(`${env.url}/api/usuarios/`+id, usuario,  {observe: 'response'})
  }
  getUsuario(id: string): Observable<any> {
    return this.http.get<Usuario>(`${env.url}/api/usuarios/${id}`);
  }

  updateUsuario(id: string, nombre: string, password: string): Observable<any> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    const body = JSON.stringify({ nombre, password });
    return this.http.put(`${env.url}/api/usuarios/${id}`, body, { headers });
  }

}
