export class User {
  id?: number;
  nombre: string;
  password: string;
  mail?:string;
  constructor(nombre: string="",password: string=""){
      this.nombre=nombre;
      this.password=password;

  }

}
