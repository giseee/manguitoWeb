import { Usuario } from "./usuario";
import { RedSocial } from "./redSocial";
import { Categoria } from "./categoria";
import { Donaciones } from "./donaciones";
export class Emprendimiento {
  id_emprendimiento:number=0;
  nombreEmprendimiento: string;
  descripcion: string;
  banner: string;
  manguitosRecibidos: number;
  mostrarManguitos: boolean;
  mostrarTopDonadores: boolean;
  redeSociales: RedSocial[];
  categorias: Categoria[];
 // donaciones: Donaciones[];
  montoManguito: number;
  id!:number;



  constructor(nombre: string = "", descripcion: string = "", banner: string, categorias: Categoria[] = [], donaciones: Donaciones[] = [], redSocial: RedSocial[] = []) {
    this.nombreEmprendimiento = nombre;
    this.descripcion = descripcion;
    this.banner = banner;
    this.mostrarManguitos = true;
    this.mostrarTopDonadores = true;
    this.redeSociales = redSocial;
    this.categorias = categorias;
    //this.donaciones = donaciones;
    this.montoManguito = 0;
    this.manguitosRecibidos = 0;
    //this.usuario = usuario;
  }
  }

