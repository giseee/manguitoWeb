import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { Emprendimiento } from '../_models/emprendimiento';
import { Router } from '@angular/router';
import { AlertService } from '../_alert/alert.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  mostrarDetalle = false;
  @Input() emprendimiento!:Emprendimiento;
  @Output() showEmp= new EventEmitter<number>();
  nombre!: string;
  categoria!: string;
  emprendimientoss!: Emprendimiento[];
  noResultsFound:boolean=false;
  constructor(
    private emprendimientoService:EmprendimientoService,
    private router: Router,
    public alertService: AlertService
    ){}

  ngOnInit() {  const nombreBusqueda = localStorage.getItem('nombreBusqueda');
  if (nombreBusqueda) {
    this.nombre = nombreBusqueda;
    this.emprendimientoService.buscarPorNombre(nombreBusqueda).subscribe(
      emprendimientoss => this.emprendimientoss = emprendimientoss
    );
    this.noResultsFound = (this.emprendimientoss.length === 0);
    localStorage.removeItem('nombreBusqueda');
  }}
  buscarPorNombre() {
    localStorage.setItem('nombreBusqueda', this.nombre); 
    window.location.reload();

  }


  //buscarPorCategoria() {
  // this.emprendimientoService.buscarPorCategoria(this.categoria).subscribe(
  //      emprendimientos => this.emprendimientos = emprendimientos
   // );}


}
