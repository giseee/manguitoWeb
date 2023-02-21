import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Emprendimiento } from '../_models/emprendimiento';
import { Usuario } from '../_models/usuario';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { UsuarioService } from '../_services/usuario.service';
@Component({
  selector: 'app-reg-emprendimiento',
  templateUrl: './reg-emprendimiento.component.html',
  styleUrls: ['./reg-emprendimiento.component.scss']
})
export class RegEmprendimientoComponent {
  emprendimiento!: Emprendimiento;
  router: any;
  registrando=false;

  constructor(private emprendimientoService: EmprendimientoService) { }

  onSubmit(form: NgForm) {
    this.registrando=true;
    if (form.valid) {
      this.emprendimientoService.crearEmprendimiento({ emprendimiento: this.emprendimiento }).subscribe(
        () => {
          console.log('emprendimiento registrado con éxito');
        }
      );
    }
  }

}
