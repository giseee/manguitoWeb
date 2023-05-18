import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Categoria } from '../_models/categoria';
import { Emprendimiento } from '../_models/emprendimiento';
import { RedSocial } from '../_models/redSocial';
import { Usuario } from '../_models/usuario';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { environment as env } from 'src/environments/environments';
import { HttpClient } from '@angular/common/http';
import { Donaciones } from '../_models/donaciones';

declare var bootstrap: any; // Agrega esta línea para evitar errores de TypeScript

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
  cantidadManguitos: number = 0;
  nombreDonador: string = '';
  contacto: string = '';
  mensaje: string = '';
  total: number = 0;

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
    const mensaje = document.getElementById('mensajeInput') as HTMLInputElement;
    const manguitos = Number(manguitosInput.value);
    const nombre = nombreInput.value;
    const email = emailInput.value;
    console.log(this.id);
    const donacion: Donaciones = {
      cantidadManguitos: manguitos,
      nombreDonador: nombre,
      contacto: emailInput.value,
      mensaje: mensaje.value,
      //plan_id: 0,
      emprendimiento_id: this.id,
      fecha: new Date()
    };

    this.http.post<Donaciones>('http://localhost:8080/api/donacion', donacion)
      .subscribe(
        (response) => {
          console.log('Donación realizada con éxito', response);
        }
      );

    manguitosInput.value = '';
    nombreInput.value = '';
    emailInput.value = '';
    mensaje.value='';

    // Cerrar la ventana emergente
    const donationModal = new bootstrap.Modal(document.getElementById('donationModal'));
    donationModal.hide();
  }

  actualizarTotal() {
    this.total = this.detalleEmprendimiento.montoManguito * this.cantidadManguitos;
 }
}
