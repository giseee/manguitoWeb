
import { Component, OnInit } from '@angular/core';
import { Categoria } from '../_models/categoria';
import { CategoriasService } from '../_services/categoria.service'
import { Emprendimiento } from '../_models/emprendimiento';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { HomeComponent } from '../home';


@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss']
})
export class ListarCategoriasComponent implements OnInit {
  categorias: Categoria[] = [];
  //newCategory: Categoria = new Categoria();
  constructor(private categoriaService: CategoriasService,private emprendimientoService: EmprendimientoService, private home: HomeComponent) { }
  categoriaSeleccionada: string = '';

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getAll()
      .subscribe(categorias => this.categorias = categorias);
  }
  obtenerEmprendimientosPorCategoria(nombreCategoria: string): void {
    this.home.mostrarResultadosCategorias=true;
    this.home.mostrarResultadosBusqueda=false;
    this.categoriaSeleccionada = nombreCategoria;
    this.emprendimientoService.obtenerEmprendimientosPorCategoria(nombreCategoria)
      .subscribe(emprendimientos =>  this.home.emprendimientos= emprendimientos);
  }

}
