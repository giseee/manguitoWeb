﻿import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class AuthGuard  {
  constructor(private authService: AuthenticationService, private router: Router) {}
  //currentUsuario = this.authService.currentUsuario$;
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

