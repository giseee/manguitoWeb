import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Emprendimiento } from '../_models/emprendimiento';

@Component({
  selector: 'app-emprendimiento',
  templateUrl: './emprendimiento.component.html',
  styleUrls: ['./emprendimiento.component.scss']
})
export class EmprendimientoComponent {
  @Input() emprendimiento:Emprendimiento={
    id_emprendimiento: 0,
    nombreEmprendimiento: '',
    descripcion: '',
    banner: '',
    manguitosRecibidos: 0,
    mostrarManguitos: true,
    mostrarTopDonadores: true,
    redeSociales: [],
    categorias:[],
   // donaciones: [],
    montoManguito: 0,
    id:0
  }

@Output() showEmp= new EventEmitter<number>();
constructor( ){}

ngOnInit() {
}

}
