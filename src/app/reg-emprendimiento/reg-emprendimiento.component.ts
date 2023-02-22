import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Emprendimiento, Categoria,Usuario} from '../_interfaces/emprendimiento';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {Categorias } from '../_models/categorias'
import { environment as env } from 'src/environments/environments';
import { RedSocial } from '../_models/redSocial';
@Component({
  selector: 'app-reg-emprendimiento',
  templateUrl: './reg-emprendimiento.component.html',
  styleUrls: ['./reg-emprendimiento.component.scss']
})
export class RegEmprendimientoComponent implements OnInit {
  emprendimientoForm!: FormGroup;
  isNew = true;
  emprendimiento!: Emprendimiento;
  usuarios!: Usuario[];
  categorias: Categorias[] = [];
  redeSociales: RedSocial[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.emprendimientoForm = this.formBuilder.group({
      nombreEmprendimiento: ['', Validators.required],
      descripcion: ['', Validators.required],
      categorias: [[], Validators.required],
      redeSociales:[[], Validators.required],
      banner: ['', Validators.required],
      montoManguito: ['', Validators.required],
      mostrarTopDonadores: ['', Validators.required],
      mostrarManguitos:['', Validators.required],
      usuarioId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getCategorias();
    this.getUsuarioId();
    this.getRedSocial();
  }

  onSubmit(): void {
    const emprendimiento: Emprendimiento = {
      nombreEmprendimiento: this.emprendimientoForm.get('nombreEmprendimiento')?.value,
      descripcion: this.emprendimientoForm.get('descripcion')?.value,
      categorias: this.emprendimientoForm.get('categorias')?.value,
      redeSociales: this.emprendimientoForm.get('redeSociales')?.value,
      banner: this.emprendimientoForm.get('banner')?.value,
      montoManguito: this.emprendimientoForm.get('montoManguito')?.value,
      mostrarTopDonadores: this.emprendimientoForm.get('mostrarTopDonadores')?.value,
      mostrarManguitos: this.emprendimientoForm.get('mostrarManguitos')?.value,
      usuarioId: this.emprendimientoForm.get('usuarioId')?.value
    };

    this.http.post('/api/emprendimientos', emprendimiento).subscribe(() => {
      this.router.navigate(['/emprendimientos']);
    });
  }

  getCategorias(): void {
    this.http.get<Categorias[]>(`${env.url}/api/categorias`).subscribe(response => {
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
      this.emprendimientoForm.patchValue({ usuarioId: response.id });
    });
  }
  goBack() {
    this.router.navigate(['/']);
  }
}
