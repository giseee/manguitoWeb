export class Donaciones {
  nombreDonador: string;
  contacto?: string;
  mensaje?: string;
  cantidadManguitos: number;
  fecha: Date;
  plan_id?: number;
  emprendimiento_id: number;

  constructor(
    nombreDonador: string = '',
    cantidadManguitos: number = 0,
    emprendimiento_id: number = 0
  ) {
    this.nombreDonador = nombreDonador;
    this.cantidadManguitos = cantidadManguitos;
    this.fecha = new Date();
    this.emprendimiento_id = emprendimiento_id;
  }
}
