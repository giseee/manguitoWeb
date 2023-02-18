import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../_models/usuario';
import { UsuarioService } from '../_services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  usuario = new Usuario();
  submitted = false;
  mensaje: string = "";
  error: string = '';
  loading: boolean = false;
  respuesta!: Number;

  constructor(private usuarioService:UsuarioService) { }

  onSubmit(formulario: NgForm){
    if(formulario.valid){
      this.usuario.setNombre(formulario.value.nombre);
      this.usuario.setApellido(formulario.value.apellido);
      this.usuario.setDireccion(formulario.value.direccion);
      this.usuario.setNombreUsuario(formulario.value.nombreUsuario);
      this.usuario.setPassword(formulario.value.password);
      this.mensaje= "";
        }
    this.submitted=true;
    this.loading = true;
    this.usuarioService.crearUsuario(this.usuario).subscribe(response => {
      this.respuesta=response.status;
      if(this.respuesta === 200) {
        this.mensaje = "El usuario fue generado correctamente"}
      else {this.mensaje = "El usuario no fue generado porque ya existe ese nombre de usuario, por favor intente con otro"}
    this.usuario = new Usuario();
    this.loading = false;
    });
  }



  ngOnInit(): void {
  }

}
