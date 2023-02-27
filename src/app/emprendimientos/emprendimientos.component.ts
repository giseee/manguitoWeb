import { Component } from '@angular/core';
import { Emprendimiento } from '../_interfaces/emprendimiento';
import { EmprendimientoService } from '../_services/emprendimiento.service';

@Component({
  selector: 'app-emprendimientos',
  templateUrl: './emprendimientos.component.html',
  styleUrls: ['./emprendimientos.component.scss']
})
export class EmprendimientosComponent {
  emprendimientos : Emprendimiento[]=[];
constructor(private servicio: EmprendimientoService) { }

ngOnInit():void {
    this.servicio.getAll()
    .subscribe( data=> {
      this.emprendimientos = data;
});
}

getIdEmprendimiento(id: number)
{
  return this.emprendimientos.find(ele => {return ele.id_emprendimiento == id});
}
}
