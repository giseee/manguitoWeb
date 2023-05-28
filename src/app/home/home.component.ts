import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { Emprendimiento } from '../_models/emprendimiento';
import { Router } from '@angular/router';
import { AlertService } from '../_alert/alert.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  nombre!: string;
  categoria!: string;
  emprendimientoss!: Observable<Emprendimiento[]>;
  noResultsFound:boolean=false;
  resultados: Emprendimiento[]=[];
  constructor(
    private emprendimientoService:EmprendimientoService,
    private router: Router,
    public alertService: AlertService
    ){}


    ngOnInit() {
      const nombreBusqueda = localStorage.getItem('nombreBusqueda');
      if (nombreBusqueda) {
        this.nombre = nombreBusqueda;
        this.emprendimientoss = this.emprendimientoService.buscarPorNombre(nombreBusqueda); // Asignar directamente el Observable devuelto por el servicio
        this.emprendimientoss.subscribe(
          resultados => {
            this.resultados = resultados;
            this.noResultsFound = (this.resultados.length === 0);
          }
        );
        localStorage.removeItem('nombreBusqueda');
      }
    }
    buscarPorNombre() {
      localStorage.setItem('nombreBusqueda', this.nombre);
      this.emprendimientoss = this.emprendimientoService.buscarPorNombre(this.nombre);
      this.emprendimientoss.subscribe(
        resultados => {
          this.resultados = resultados;
          this.noResultsFound = (this.resultados.length === 0);
        }
      );
    }


  //buscarPorCategoria() {
  // this.emprendimientoService.buscarPorCategoria(this.categoria).subscribe(
  //      emprendimientos => this.emprendimientos = emprendimientos
   // );}


}
