import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environments';


import { Categorias } from '../_models/categorias';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Categorias[]>(`${env.url}/api/categorias`);
    }

    delCategoriaById(id: Number) {
      return this.http.delete(`${env.url}/api/categorias/` + id, { observe: 'response' })
  }

  putCategoria(categorias: Categorias) {
      return this.http.put<Categorias>(`${env.url}/api/categorias/` + categorias.id, categorias)
  }

  getCategoria(id: Number) {
      return this.http.get<Categorias>(`${env.url}/api/categorias/` + id);
  }
  postCategoria(categorias: Categorias) {
    return this.http.post<Categorias>(`${env.url}/api/categorias/`,categorias);
}
addCategory(category: Categorias): Observable<Categorias> {
  return this.http.post<Categorias>(`${env.url}/api/categorias/`, category);
}
updateCategory(categorias: Categorias): Observable<Categorias> {
  return this.http.put<Categorias>(`${env.url}/api/categorias/` + categorias.id, categorias)
}



}
