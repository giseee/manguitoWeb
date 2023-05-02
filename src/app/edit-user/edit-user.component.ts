import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { UsuarioService } from '../_services/usuario.service';
import { Usuario } from '../_models/usuario';
import { catchError, EMPTY, finalize, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { User } from '../_models';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})

export class EditUserComponent implements OnInit {
  editing: boolean = false;
  usuarioToEdit!: Usuario | null;
  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthenticationService
  ) { }

  ngOnInit() {
    this.authService.currentUsuario$.pipe(
      map((user) => {
        this.usuarioToEdit = user;
        console.log(user);
      })
    ).subscribe();
  }


  onUpdateUsuario(): void {
    this.editing = true;
    this.usuarioService.updateUsuario(this.usuarioToEdit!)
    .pipe(// Actualizar el usuario gaurdado en el navegador
      finalize(() => {
        this.editing = false; 
        this.router.navigateByUrl('/dashboard')
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handleUnauthorized();
          return EMPTY;
        }
        throw error;
      })
    ).subscribe();    
  }

  handleUnauthorized() {
    //******qué hacemos acá????**** */
    // this.form.setErrors({ invalidCredentials: true });
    // this.cdr.markForCheck();
  }

  cancelEdit(): void {
    this.editing = false;
    this.router.navigateByUrl('/dashboard')
  }
}
