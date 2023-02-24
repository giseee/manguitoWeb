export class RedSocial {
  id:number=0;
  nombre: string;
  url:string;
  constructor(nombre: string = "",url:string ="") {
    this.nombre = nombre;
    this.url=url;
    this.id=this.id +1 ;
  }
}
