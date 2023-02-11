import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { Usuario } from '../_models/usuario';


import { AuthenticationService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    usuario:Usuario=new Usuario()
    loading = false;
    submitted = false;
    //returnUrl: string;
    error = '';


    constructor(

        private route: ActivatedRoute,
        private router: Router,
     //   private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {


        // elimino las credenciales del usuario, si es que existen
    //    this.authenticationService.logout();

      //  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }


    onSubmit() {
        this.submitted = true;

        // Valido que el formulario sea valido antes del submit
        if (this.usuario.nombreUsuario !="" && this.usuario.password!="" ) {


            this.error ="";
        this.loading = true;
    /*    this.authenticationService.login(this.usuario.nombreUsuario as string, this.usuario.password as string)
            .pipe(first())

            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                    this.loading = false;
                    this.submitted = false;
                },
                error => {
                    this.error = 'Nombre de usuario o Contraseña incorrectas';
                    this.loading = false;
                    this.submitted = false;
                    window.onbeforeunload = (event) => {
                        event.preventDefault();
                     }
                });
    } */}}
}
