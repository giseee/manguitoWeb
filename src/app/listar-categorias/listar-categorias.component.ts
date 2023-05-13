
import { Component } from '@angular/core';
import { Categoria } from '../_models/categoria';
import { CategoriasService } from '../_services/categoria.service'
import { Emprendimiento } from '../_models/emprendimiento';
import { EmprendimientoService } from '../_services/emprendimiento.service';


@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss']
})
export class ListarCategoriasComponent {
  categorias: Categoria[] = [];
  emprendimientos: Emprendimiento[] = [];
  //newCategory: Categoria = new Categoria();
  constructor(private categoriaService: CategoriasService,private emprendimientoService: EmprendimientoService) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getAll()
      .subscribe(categorias => this.categorias = categorias);
  }
  obtenerEmprendimientosPorCategoria(nombreCategoria: string): void {
    this.emprendimientoService.obtenerEmprendimientosPorCategoria(nombreCategoria)
      .subscribe(emprendimientos => this.emprendimientos = emprendimientos);
  }

}
