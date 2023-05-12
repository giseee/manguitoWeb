import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../_models/user';
import { UsuarioService } from '../_services/usuario.service';
import { Router } from '@angular/router';
import { EMPTY, catchError, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-registro-user',
  templateUrl: './registro-user.component.html',
  styleUrls: ['./registro-user.component.scss']
})
export class RegistroUserComponent {
  user: User = {
    nombre: '', password: ''
  };
  mail:string="";  
  registrando=false;

  constructor(
    private userService: UsuarioService,
    public alertService: AlertService,
    private router: Router
    ) { }

  onSubmit(form: NgForm) {

    this.registrando=true;
    if (form.valid) {
      this.userService.crearUsuario({ usuario: this.user }).pipe(
        finalize(
          () => {
            this.registrando = false; 
            this.router.navigateByUrl('/');
            this.handleSucceed();
          }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 409) {
            this.handleConflict();
            return EMPTY;
          }
          throw error;
        })
      ).subscribe();
    }
  }
  handleSucceed() {
    let options = {
      autoClose: true,
      keepAfterRouteChange: false
  };
    this.alertService.success('El usuario se ha registrado de forma exitosa.', options);
  }

  handleConflict() {
    let options = {
      autoClose: true,
      keepAfterRouteChange: false
  };
    this.alertService.error('El nombre de usuario ya existe en el sistema', options);
  }
}


