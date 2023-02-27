import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
import { Usuario } from '../_models/usuario';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  usuario: Usuario | null = null;

  constructor(private router: Router, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    this.usuario = this.authenticationService.getCurrentUser();
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
