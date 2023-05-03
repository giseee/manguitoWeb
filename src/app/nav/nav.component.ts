import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../_models/usuario';
import { AuthenticationService } from '../_services/authentication.service';
import { EmprendimientoService } from '../_services/emprendimiento.service';

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
    mail: ''
  };
  emprendimientoId!: number;
  constructor(private emprendimientoService: EmprendimientoService, 
              public router: Router, 
              private authenticationService: AuthenticationService
              ) { }

  ngOnInit() {
    // obtener el usuario actual

  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
  getCurrentUser() {
    return this.authenticationService.getCurrentUser();
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

}
