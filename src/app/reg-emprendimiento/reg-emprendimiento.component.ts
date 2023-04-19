import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EmprendimientoDto,Usuario} from '../_interfaces/emprendimiento';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Categoria } from '../_models/categoria'
import { environment as env } from 'src/environments/environments';
import { RedSocial } from '../_models/redSocial';
import { AuthenticationService } from '../_services/authentication.service';
import { Emprendimiento } from '../_models/emprendimiento';
@Component({
  selector: 'app-reg-emprendimiento',
  templateUrl: './reg-emprendimiento.component.html',
  styleUrls: ['./reg-emprendimiento.component.scss']
})
export class RegEmprendimientoComponent implements OnInit {
  emprendimientoForm!: FormGroup;
  mensaje!:String;
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
    this.empService.getEmprendimientos().subscribe(empresas => {
      const userId = this.authenticationService.currentUsuarioValue?.id;
      const userEmprendimiento = empresas.find(emp => emp.id === userId);
      if (userEmprendimiento) {
        this.mensaje = "Ya tienes un emprendimiento registrado";
      }
    });
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
      this.mensaje = "Emprendimiento creado exitosamente";
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000); // Esperar 1 segundo antes de redirigir al usuario
    });
  }


  goBack() {
    this.router.navigate(['/']);
  }
}
