import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environments';


import { Categoria } from '../_models/categoria';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CategoriasService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Categoria[]>(`${env.url}/api/categorias`);
    }

    delCategoriaById(id: Number) {
      return this.http.delete(`${env.url}/api/categorias/` + id, { observe: 'response' })
  }

  putCategoria(categorias: Categoria) {
      return this.http.put<Categoria>(`${env.url}/api/categorias/` + categorias.id, categorias)
  }

  getCategoria(id: Number) {
      return this.http.get<Categoria>(`${env.url}/api/categorias/` + id);
  }
  postCategoria(categorias: Categoria) {
    return this.http.post<Categoria>(`${env.url}/api/categorias/`,categorias);
}
addCategory(category: Categoria): Observable<Categoria> {
  return this.http.post<Categoria>(`${env.url}/api/categorias/`, category);
}
updateCategory(categorias: Categoria): Observable<Categoria> {
  return this.http.put<Categoria>(`${env.url}/api/categorias/` + categorias.id, categorias)
}



}
