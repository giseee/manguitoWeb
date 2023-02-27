import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from '../_models/categoria';
import { Emprendimiento } from '../_models/emprendimiento';
import { RedSocial } from '../_models/redSocial';
import { Usuario } from '../_models/usuario';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { environment as env } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-detalle-emprendimiento',
  templateUrl: './detalle-emprendimiento.component.html',
  styleUrls: ['./detalle-emprendimiento.component.scss']
})
export class DetalleEmprendimientoComponent implements OnInit {
  usuarios!: Usuario[];
  categorias: Categoria[] = [];
  redeSociales: RedSocial[] = [];
  emprendimiento: any;
  id!: number;
  error!: String;
  constructor(private route: ActivatedRoute, private emprendimientoService: EmprendimientoService,
    private http: HttpClient,
    private router: Router){
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number

    });
  }

  ngOnInit(): void {
    this.getCategorias();
    this.getUsuarioId();
    this.getRedSocial();
    console.log(this.id);
    this.emprendimientoService.getPorID(this.id).subscribe(
      emprendimientos=> {
        this.emprendimiento =emprendimientos;
        console.log("Es el Emprendimiento ", this.emprendimiento.nombreEmprendimiento);
      }

    )
  }

  getCategorias(): void {
    this.http.get<Categoria[]>(`${env.url}/api/categorias`).subscribe(response => {
      this.categorias = response;
    });
  }
  getRedSocial(): void {
    this.http.get<RedSocial[]>(`${env.url}/api/redSocial`).subscribe(response => {
      this.redeSociales = response;
    });
  }

  getUsuarioId(): void {

    this.http.get<{ id: number }>(`${env.url}/api/usuarios/`).subscribe(response => {
      this.emprendimiento({ usuarioId: response.id });
    });
}
}
