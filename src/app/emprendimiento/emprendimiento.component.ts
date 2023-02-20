import { Component } from '@angular/core';
import { Emprendimiento } from '../_models/emprendimiento';
import { EmprendimientoService } from '../_services/emprendimiento.service'


@Component({
  selector: 'app-emprendimiento',
  templateUrl: './emprendimiento.component.html',
  styleUrls: ['./emprendimiento.component.scss']
})
export class EmprendimientoComponent {
  emprendimientos : any;

constructor(private servicio: EmprendimientoService) { }

ngOnInit() {
    this.servicio.getAll().subscribe(emprendimientos=> {
    this.emprendimientos = emprendimientos;
});
}



}
