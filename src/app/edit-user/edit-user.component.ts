import { Component, OnInit , ChangeDetectionStrategy, ChangeDetectorRef,} from '@angular/core';
import {  Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { UsuarioService } from '../_services/usuario.service';
import { Usuario } from '../_models/usuario';
import { catchError, EMPTY, finalize, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class EditUserComponent implements OnInit {
  editing: boolean = false;  

  formUsuario = new FormGroup({
    id: new FormControl('', {      
      nonNullable: true,
    }),
    nombre: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {      
      nonNullable: false,
    }),
    perfiles: new FormControl([], {      
      nonNullable: true,
    }),
    mail: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    })
  });

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.authService.currentUsuario$.pipe(
      map((user) => {
        //Cargo el formulario con el usuario                
        this.formUsuario.patchValue(user as any);
        console.log(this.formUsuario.value);
      })
    ).subscribe();
  }


  onUpdateUsuario(): void {
    this.editing = true;
    var usuario = JSON.parse(JSON.stringify(this.formUsuario.value)) as Usuario;
    this.usuarioService.updateUsuario(usuario)
    .pipe(   
      finalize(() => {
        // Sincronizo el usuario gaurdado en el navegador con el de la base. 
        this.authService.setUserToSessionStorage(usuario);
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
    this.formUsuario.setErrors({ unauthorized: true });
    this.cdr.markForCheck();
  }

  cancelEdit(): void {
    this.editing = false;
    this.router.navigateByUrl('/dashboard')
  }

  get name() { return this.formUsuario.get('nombre'); }
  get mail() { return this.formUsuario.get('mail'); }
}
