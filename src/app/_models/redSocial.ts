export class RedSocial {
  id?: number;
  perfilSocial: string;
  url:string;
  constructor(nombre: string = "",url:string ="") {
    this.perfilSocial = nombre;
    this.url=url;
  }
}
