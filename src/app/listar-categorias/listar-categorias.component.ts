
import { Component } from '@angular/core';
import { Categorias } from '../_models/categorias';
import { CategoriasService } from '../_services/categoria.service'


@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss']
})
export class ListarCategoriasComponent {
  categorias: Categorias[] = [];
  newCategory: Categorias = new Categorias();
  constructor(private categoriaService: CategoriasService) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getAll()
      .subscribe(categorias => this.categorias = categorias);
  }

}
