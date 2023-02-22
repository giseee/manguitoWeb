import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';


import { AuthenticationService } from '../_services/authentication.service';
import { Usuario } from '../_models/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  usuario: Usuario = {
    nombre: '', password: ''
  };
  loading = false;
  submitted = false;
  returnUrl?: string;
  error = '';


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService) {}

  ngOnInit() {
    // elimino las credenciales del usuario, si es que existen
    this.authService.logout();
    //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }


  onSubmit() {
    this.submitted = true;

    // Valido que el formulario sea valido antes del submit
    if (this.usuario.nombre !="" && this.usuario.password!="" ) {
        this.error ="";
        this.loading = true;
    this.authService.login(this.usuario.nombre as string, this.usuario.password as string)
        .pipe(first())

        .subscribe(
            () => {
                this.router.navigate(['/dashboard']);
                this.loading = false;
                this.submitted = false;

            });
}
  }
}
