import { Component } from '@angular/core';
import { Emprendimiento } from '../_models/emprendimiento';
import { Usuario } from '../_models/usuario';

@Component({
  selector: 'app-emprendimiento',
  templateUrl: './emprendimiento.component.html',
  styleUrls: ['./emprendimiento.component.scss']
})
export class EmprendimientoComponent {
  emprendimientos = [
    {
      nombreEmprendimiento: 'Sofas',
      descripcion: 'esta es una descripcion',
      banner: 'assets/img/sillones.jpg',
      manguitosRecibidos: 500,
      mostrarManguitos: true,
      mostrarTopDonadores: true,
      redeSociales: {
        nombre: 'facebook',
        url: 'https://www.facebook.com/'
      },
      categorias: { nombre: 'ingenieria' },
      donaciones: { nombre: 'Lperez', donacion: 100 },
      montoManguito: 150,
    }, {
      nombreEmprendimiento: 'Sofas',
      descripcion: 'esta es una descripcion',
      banner: 'assets/img/card.jfif',
      manguitosRecibidos: 500,
      mostrarManguitos: true,
      mostrarTopDonadores: true,
      redeSociales: {
        nombre: 'facebook',
        url: 'https://www.facebook.com/'
      },
      categorias: { nombre: 'ingenieria' },
      donaciones: { nombre: 'Lperez', donacion: 100 },
      montoManguito: 150,
    },
    {
      nombreEmprendimiento: 'Perros',
      descripcion: 'esta es una descripcion',
      banner: 'assets/img/perros.jfif',
      manguitosRecibidos: 500,
      mostrarManguitos: true,
      mostrarTopDonadores: true,
      redeSociales: {
        nombre: 'facebook',
        url: 'https://www.facebook.com/'
      },
      categorias: { nombre: 'ingenieria' },
      donaciones: { nombre: 'Lperez', donacion: 100 },
      montoManguito: 150,
    }
  ];



}
