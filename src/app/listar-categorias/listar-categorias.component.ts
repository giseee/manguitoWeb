
import { Component } from '@angular/core';
import { Categoria } from '../_models/categoria';
import { CategoriasService } from '../_services/categoria.service'


@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss']
})
export class ListarCategoriasComponent {
  categorias: Categoria[] = [];
  newCategory: Categoria = new Categoria();
  constructor(private categoriaService: CategoriasService) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getAll()
      .subscribe(categorias => this.categorias = categorias);
  }

}
