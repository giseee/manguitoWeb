export class RedSocial {
  id?: number;
  nombreRed:string;
  url :string;
  constructor(nombre: string = "",url :string="") {
    this.nombreRed = nombre;
    this.url=url;
  }
}
