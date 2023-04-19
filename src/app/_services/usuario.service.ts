import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environments';
import { User } from '../_models/user';
import { Usuario } from '../_models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }
  id!:number;

  public crearUsuario({ usuario }: { usuario: User; }): Observable<User> {
    return this.http.post<User>(`${environment.url}/api/public/register`, usuario);
  }

  public getUsuarioById(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${environment.url}/api/usuarios/${id}`);
  }

  public putUsuarioById(id: number, usuario: Usuario): Observable<any> {
    return this.http.put(`${environment.url}/api/usuarios/${id}`, usuario,  {observe: 'response'});
  }

  public updateUsuario(usuario:Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${environment.url}/api/usuarios/${usuario.id}`, usuario);
  }
}

