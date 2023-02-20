export class Categorias {
  id:number=0;
  nombreCategoria: string;
  constructor(nombre: string = "") {
    this.nombreCategoria = nombre;
    this.id=this.id +1 ;
  }


}
