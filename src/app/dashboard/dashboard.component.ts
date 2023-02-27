import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
nombre:any;
  constructor(private authService: AuthenticationService) {}
  logout() {
    this.authService.logout();
  }
  ngOnInit(){
      this.nombre = this.authService.getCurrentUsuario()?.nombre;
      console.log(this.authService.getCurrentUsuario())
      console.log(this.nombre)

  }
}
