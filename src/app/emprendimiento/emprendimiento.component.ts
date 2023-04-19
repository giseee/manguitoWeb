import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Emprendimiento } from '../_interfaces/emprendimiento';
import { DetalleEmprendimientoComponent } from '../detalle-emprendimiento/detalle-emprendimiento.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-emprendimiento',
  templateUrl: './emprendimiento.component.html',
  styleUrls: ['./emprendimiento.component.scss']
})
export class EmprendimientoComponent implements OnInit{
  mostrarDetalle = false;
@Input() emprendimiento!:Emprendimiento;
@Output() showEmp= new EventEmitter<number>();
constructor(private router: Router) {}

ngOnInit() {
}
mostrarDetalles() {
  this.router.navigate(['/detalle', this.emprendimiento.id]);
}
}
