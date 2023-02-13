export class Donaciones {
  nombre:string;
  donacion:number;
  constructor(nombre:string="", monto:number=0){
    this.nombre=nombre;
    this.donacion=monto;
  }
}
