import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../_models/categoria';
import { Emprendimiento } from '../_models/emprendimiento';
import { RedSocial } from '../_models/redSocial';
import { Usuario } from '../_models/usuario';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { environment as env } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import * as bootstrap from 'bootstrap';
@Component({
  selector: 'app-detalle-emprendimiento',
  templateUrl: './detalle-emprendimiento.component.html',
  styleUrls: ['./detalle-emprendimiento.component.scss']
})
export class DetalleEmprendimientoComponent implements OnInit {
  @Input() emprendimiento!: Emprendimiento;
  detalleEmprendimiento!: Emprendimiento;
  usuarios!: Usuario[];
  categorias: Categoria[] = [];
  redeSociales: RedSocial[] = [];
  id!: number;
  error!: String;

  constructor(
    private route: ActivatedRoute,
    private emprendimientoService: EmprendimientoService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getDetalleEmprendimiento();
    this.getCategorias();
    this.getRedSocial();
  }

  getDetalleEmprendimiento(): void {
    this.emprendimientoService.getEmprendimiento(this.id).subscribe(
      (response: Emprendimiento) => {
        this.detalleEmprendimiento = response;
      }
    );
  }

  getCategorias(): void {
    this.http.get<Categoria[]>(`${env.url}/api/categorias`).subscribe(response => {
      this.categorias = response;
    });
  }

  getRedSocial(): void {
    this.http.get<RedSocial[]>(`${env.url}/api/perfilSocial`).subscribe(response => {
      this.redeSociales = response;
    });
  }
  confirmarDonacion() {
    const manguitosInput = document.getElementById('manguitosInput') as HTMLInputElement;
    const nombreInput = document.getElementById('nombreInput') as HTMLInputElement;
    const emailInput = document.getElementById('emailInput') as HTMLInputElement;

    const manguitos = Number(manguitosInput.value);
    const nombre = nombreInput.value;
    const email = emailInput.value;

    // Aquí puedes procesar los datos de donación y realizar las acciones necesarias
    // por ejemplo, aumentar los manguitos, guardar el nombre y el correo electrónico, etc.

    // Restablecer los valores de los campos
    manguitosInput.value = '';
    nombreInput.value = '';
    emailInput.value = '';

    // Cerrar la ventana emergente
    const donationModal = new bootstrap.Modal(document.getElementById('donationModal')||"");
    donationModal.hide();
  }


}
