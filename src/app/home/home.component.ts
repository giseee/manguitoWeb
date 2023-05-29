import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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
export class HomeComponent implements OnInit,OnChanges{
  nombre!: string;
  categoria!: string;
  emprendimientoss!: Observable<Emprendimiento[]>;
  @Input() emprendimientos: any[]=[];
  noResultsFound:boolean=false;
  resultados: Emprendimiento[]=[];
  mostrarResultadosBusqueda:boolean=false;
  mostrarResultadosCategorias:boolean=false;
  constructor(
    private emprendimientoService:EmprendimientoService,
    public alertService: AlertService
    ){}

    ngOnChanges(changes: SimpleChanges): void {

      if (changes['emprendimientos']) {
        this.emprendimientos;
        this.resultados=[];
        this.nombre='';
        this.mostrarResultadosCategorias=!this.mostrarResultadosCategorias;
      }
      if (this.emprendimientos.length>0){
        this.mostrarResultadosCategorias=true;
        this.resultados=[];}

    }
    ngOnInit() {
    }
    buscarPorNombre() {
      this.mostrarResultadosCategorias=false;
      this.mostrarResultadosBusqueda=true;
      this.emprendimientoss = this.emprendimientoService.buscarPorNombre(this.nombre);
      this.emprendimientoss.subscribe(
        resultados => {
          this.resultados = resultados;
          this.noResultsFound = (this.resultados.length === 0);
        }
      );
      this.nombre='';
      }
      mod(){
        this.mostrarResultadosCategorias=true;
      }
    }
