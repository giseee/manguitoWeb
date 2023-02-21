import { Component } from '@angular/core';
import { Emprendimiento } from '../_models/emprendimiento';
import { EmprendimientoService } from '../_services/emprendimiento.service'
import { Router,RouterModule } from '@angular/router';


@Component({
  selector: 'app-emprendimiento',
  templateUrl: './emprendimiento.component.html',
  styleUrls: ['./emprendimiento.component.scss']
})
export class EmprendimientoComponent {
  emprendimientos : any;
  id:Number=0;
constructor(private servicio: EmprendimientoService) { }

ngOnInit() {
    this.servicio.getAll().subscribe(emprendimientos=> {
    this.emprendimientos = emprendimientos;
    this.id= this.emprendimientos.id;
});
}



}
