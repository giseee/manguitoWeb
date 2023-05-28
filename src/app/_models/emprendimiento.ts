import { Usuario } from "./usuario";
import { RedSocial } from "./redSocial";
import { Categoria } from "./categoria";
import { Donaciones } from "./donaciones";
import { RedSocialDTO } from "./redSocialDTO";

export class Emprendimiento {
  id: number;
  id_usuario: number;
  nombreEmprendimiento: string;
  descripcion: string;
  banner: string;
  manguitosRecibidos: number;
  mostrarManguitos: boolean;
  mostrarTopDonadores: boolean;
  redeSociales: RedSocialDTO[];
  categorias: Categoria[];
  donaciones: Donaciones[];
  montoManguito: number;

  constructor(
    id:number,
    id_usuario:number,
    nombreEmprendimiento: string = "",
    descripcion: string = "",
    banner: string,
    manguitosRecibidos:number = 0,
    mostrarManguitos: boolean = true,
    mostrarTopDonadores: boolean = true,
    categorias: Categoria[] = [],
    donaciones: Donaciones[] = [],
    redeSocial: RedSocialDTO[] = [],
    montoManguito:number = 0
  ) {
    this.id = id;
    this.id_usuario = id_usuario;
    this.nombreEmprendimiento = nombreEmprendimiento;
    this.descripcion = descripcion;
    this.banner = banner;
    this.manguitosRecibidos = manguitosRecibidos;
    this.mostrarManguitos = mostrarManguitos;
    this.mostrarTopDonadores = mostrarTopDonadores;
    this.categorias = categorias;
    this.donaciones = donaciones;    
    this.redeSociales = redeSocial;        
    this.montoManguito = montoManguito;    
  }
}

