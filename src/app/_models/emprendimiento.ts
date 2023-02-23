import { Usuario } from "./usuario";
import { RedSocial } from "./redSocial";
import { Categorias } from "./categorias";
import { Donaciones } from "./donaciones";
export class Emprendimiento {
  id!:Number;
  nombreEmprendimiento: string;
  descripcion: string;
  banner: string;
  manguitosRecibidos: number;
  mostrarManguitos: boolean;
  mostrarTopDonadores: boolean;
  redeSociales: RedSocial[];
  categorias: Categorias[];
  donaciones: Donaciones[];
  montoManguito: number;
  usuario: Usuario | undefined;


  constructor(nombre: string = "", descripcion: string = "", banner: string, categorias: Categorias[] = [], donaciones: Donaciones[] = [], redSocial: RedSocial[] = []) {
    this.nombreEmprendimiento = nombre;
    this.descripcion = descripcion;
    this.banner = banner;
    this.mostrarManguitos = true;
    this.mostrarTopDonadores = true;
    this.redeSociales = redSocial;
    this.categorias = categorias;
    this.donaciones = donaciones;
    this.montoManguito = 0;
    this.manguitosRecibidos = 0;
    //this.usuario = usuario;
  }

}
