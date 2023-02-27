import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { UsuarioService } from '../_services/usuario.service';


import { Usuario } from '../_models/usuario';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
onUpdateUser() {
throw new Error('Method not implemented.');
}

  usuario:Usuario={
    nombre:'',
    id:0,
  };
  id!: number;
  editing: boolean = false;
  usuarioToEdit: Usuario={
    nombre:'',
    id:0,
  };
  constructor(

    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.usuarioToEdit.id=this.authService.getCurrentUserId();
  }


  onUpdateUsuario(): void {
    this.usuarioService.updateUsuario(this.usuarioToEdit)
      .subscribe(() => {
        this.usuario = this.usuarioToEdit;
        this.editing = false;
        this.usuarioToEdit!;
      });
  }

  getUsuarioId() {
    this.authService.currentUsuario$.subscribe(data => {
      this.usuario.id = data?.id??0;
    }); // Obtener el ID del usuario desde el servicio de autenticación
  };

/* updateUsuario() {

    this.id.usuario=this.authService.getCurrentUser()?.id_usuario
    console.log(this.usuario.id_usuario);
    this.usuarioService.putUsuarioById(this.usuario.id_usuario, this.usuario)
      this.router.navigate(['/']);
  }*/
  editUsuario(usuario: Usuario): void {
    this.editing = true;
    this.usuarioToEdit = Object.assign({}, usuario);
  }
  cancelEdit(): void {
    this.editing = false;

    this.router.navigateByUrl('/dashboard')
  }
}
