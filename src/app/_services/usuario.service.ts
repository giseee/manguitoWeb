import { Injectable } from '@angular/core';
import { Usuario } from '../_models/usuario';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environments';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  constructor(private http: HttpClient) { }

  public crearUsuario(usuario:Usuario){
      return this.http.post(`${env.url}/api/usuario`, usuario, {observe: 'response'})
  }
  public getUsuarioById(id:String) {
    return this.http.get<Usuario>(`${env.url}/api/usuario/`+id);

  }
  public putUsuarioById(id:String, usuario:Usuario){

    return this.http.put(`${env.url}/api/usuario/`+id, usuario, {observe: 'response'})
  }


}
