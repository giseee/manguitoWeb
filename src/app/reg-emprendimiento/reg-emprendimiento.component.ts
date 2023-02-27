import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Emprendimiento,EmprendimientoDto,Usuario} from '../_interfaces/emprendimiento';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Categoria } from '../_models/categoria'
import { environment as env } from 'src/environments/environments';
import { RedSocial } from '../_models/redSocial';
import { AuthenticationService } from '../_services/authentication.service';
@Component({
  selector: 'app-reg-emprendimiento',
  templateUrl: './reg-emprendimiento.component.html',
  styleUrls: ['./reg-emprendimiento.component.scss']
})
export class RegEmprendimientoComponent implements OnInit {
  emprendimientoForm!: FormGroup;
  isNew = true;
  emprendimiento!: EmprendimientoDto;
  usuarios!: Usuario[];
  categorias: Categoria[] = [];
  redeSociales: RedSocial[] = [];
  userId!: any;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private empService: EmprendimientoService,
    private authenticationService: AuthenticationService
  ) {
    this.emprendimiento = {
    nombreEmprendimiento: '',
    descripcion: '',
    banner: '',
    manguitosRecibidos:0,
    montoManguito: 0,
    mostrarTopDonadores: false,
    mostrarManguitos: false,
    categorias:[],
    id: 0 // o el valor que corresponda
  };
  }

  ngOnInit(): void {
    this.getCategorias();
    this.getUsuarioId();
  }

  getCategorias(): void {
    this.http.get<Categoria[]>(`${env.url}/api/categorias`).subscribe(response => {
      this.categorias = response;
    });
  }

  getUsuarioId() {
    this.authenticationService.currentUsuario$.subscribe(data => {
      this.userId = data?.id;
    }); // Obtener el ID del usuario desde el servicio de autenticación
  };

    createNewEmp() {
      this.emprendimiento.id = this.userId;
      this.empService.create(this.emprendimiento).subscribe(data => {
        console.log('created', data);
      })
    }

  goBack() {
    this.router.navigate(['/']);
  }
}
