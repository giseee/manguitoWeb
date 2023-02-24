import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from '../_services/usuario.service';


export interface ConfigurationInterface {
  // Tus otras propiedades
  status: number;
  // Tus otras propiedades
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {


    usuario: any = {};
    nombre!: string;
    password!: string;

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private usuarioService: UsuarioService
    ) { }

    ngOnInit() {
      this.getUsuario(this.route.snapshot.params['id']);
    }

    getUsuario(id: string) {
      this.usuarioService.getUsuario(id).subscribe(data => {
        this.usuario = data;
      });
    }

    updateUsuario() {
      this.usuarioService.updateUsuario(this.usuario.id, this.nombre, this.password).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }
