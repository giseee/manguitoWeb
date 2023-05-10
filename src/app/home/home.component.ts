import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { Emprendimiento } from '../_models/emprendimiento';
import { Router } from '@angular/router';

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
  constructor(private emprendimientoService:EmprendimientoService,private router: Router){}
  ngOnInit() {}
  buscarPorNombre() {
    this.emprendimientoService.buscarPorNombre(this.nombre).subscribe(
      emprendimientoss => this.emprendimientoss = emprendimientoss
    );
  }
  getIdEmprendimiento(id: number)
{
  return this.emprendimientoss.find(ele => {return ele.id_emprendimiento == id});
}
  mostrarDetalles() {
    this.router.navigate(['/detalle', this.emprendimiento.id]);
  }

  //buscarPorCategoria() {
  // this.emprendimientoService.buscarPorCategoria(this.categoria).subscribe(
  //      emprendimientos => this.emprendimientos = emprendimientos
   // );}


}
