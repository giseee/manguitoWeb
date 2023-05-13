import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../_models/usuario';
import { AuthenticationService } from '../_services/authentication.service';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { AlertService } from '../_alert/alert.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  usuario: Usuario = {
    nombre: '',
    id: 0,
    password: '',
    perfiles: ['ROLE_USER'],
    mail: '',
    id_emprendimiento: 0
  };
  emprendimientoId!: number;
  constructor(private emprendimientoService: EmprendimientoService, 
              public router: Router, 
              private authenticationService: AuthenticationService,              
              public alertService: AlertService
              ) { }

  ngOnInit() {
    // obtener el usuario actual

  }

  logout() {
    this.authenticationService.logout();
    let options = {
      autoClose: true,
      keepAfterRouteChange: true
  };
    this.alertService.info('Se ha deslogueado del sistema', options);
    this.router.navigate(['/']);
  }
  getCurrentUser() {
    return this.authenticationService.getCurrentUser();
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

}
