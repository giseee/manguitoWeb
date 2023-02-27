import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../_models/user';
import { UsuarioService } from '../_services/usuario.service';
import { Router } from '@angular/router';
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
  router: any;
  registrando=false;

  constructor(private userService: UsuarioService) { }

  onSubmit(form: NgForm) {

    this.registrando=true;
    if (form.valid) {
      this.userService.crearUsuario({ usuario: this.user }).subscribe(
        () => {
          this.registrando=true;
          console.log('Usuario registrado con éxito');
        }
      );
    }
  }
  login(){
    this.router.navigate(['/login']);
  }
}


