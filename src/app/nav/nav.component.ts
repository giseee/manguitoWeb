import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../_models/usuario';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit{
  currentUsuario?: Usuario;
  nombre: String;
  error: string = '';
  loading: boolean = false;

  constructor(private router: Router,
    private authenticationService: AuthenticationService) {
    //this.authenticationService.currentUsuario$.subscribe(x => this.currentUsuario = x);
    var datos = JSON.parse(localStorage.getItem('currentUsuario') as string);
    if (datos != null) {
      this.nombre = datos.nombre;
    } else {
      this.nombre = "";
    };
    console.log("datos: ", this.currentUsuario);
  }

  ngOnInit() {
    this.loading = true;
  }
  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
