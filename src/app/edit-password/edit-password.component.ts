import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { async, catchError, EMPTY, finalize, map } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { UsuarioService } from '../_services/usuario.service';
import { CustomValidators, MustMatch } from '../_validators/customValidator';
import { HttpErrorResponse } from '@angular/common/http';
import { Usuario } from '../_models/usuario';

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditPasswordComponent {

  processingRequest = false;

  formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };

  formPassword = new FormGroup({
    id: new FormControl('', {
      nonNullable: true,
    }),
    nombre: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl(null, Validators.compose([
      // 1. Password Field is Required
      Validators.required,
      // 2. check whether the entered password has a number
      CustomValidators.patternValidator(/\d/, { hasNumber: true }),
      // 3. check whether the entered password has upper case letter
      CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
      // 4. check whether the entered password has a lower-case letter
      CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
      // 5. check whether the entered password has a special character
      CustomValidators.patternValidator(/[^A-Za-z0-9]/, { hasSpecialCharacters: true }),
      // 6. Has a minimum length of 8 characters
      Validators.minLength(8)])),
    perfiles: new FormControl([], {
      nonNullable: true,
    }),
    mail: new FormControl('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    confirmPassword: new FormControl(null, Validators.compose([Validators.required]))

  },
    // check whether our password and confirm password match
    this.formOptions
  );

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private authService: AuthenticationService,
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder) { }


  ngOnInit() {
    this.authService.currentUsuario$.pipe(
      map((user) => {
        //Cargo el formulario con el usuario(solo se expone la contraseña).       
        this.formPassword.patchValue(user as any);
        console.log(this.formPassword.value);
      })
    ).subscribe();
  }

  changePassword() {
    this.processingRequest = true;

    var usuario = JSON.parse(JSON.stringify(this.formPassword.value)) as Usuario;
    this.usuarioService.updateUsuario(usuario)
      .pipe(
        finalize(() => {
          this.processingRequest = false;
          this.router.navigateByUrl('/dashboard')
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.handleUnauthorized();
            return EMPTY;
          }
          throw error;
        })
      )
      .subscribe();
  }

  handleUnauthorized() {
    this.formPassword.setErrors({ unauthorized: true });
    this.cdr.markForCheck();
  }

  cancelEdit(): void {
    this.processingRequest = false;
    this.router.navigateByUrl('/dashboard')
  }
}
