import { Usuario } from "./usuario";
import { RedSocial } from "./redSocial";
import { Categorias } from "./categorias";
import { Donaciones } from "./donaciones";
export class Emprendimiento {

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
  //usuario: Usuario;




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


  public getNombreEmprendimiento() {
    return this.nombreEmprendimiento;
  }

  public setNombreEmprendimiento(nombreEmprendimiento: string) {
    this.nombreEmprendimiento = nombreEmprendimiento;
  }

  public getDescripcion() {
    return this.descripcion;
  }

  public setDescripcion(descripcion: string) {
    this.descripcion = descripcion;
  }

  public getBanner() {
    return this.banner;
  }

  public setBanner(banner: string) {
    this.banner = banner;
  }

  public getManguitosRecibidos() {
    return this.manguitosRecibidos;
  }

  public setManguitosRecibidos(manguitosRecibidos: number) {
    this.manguitosRecibidos = manguitosRecibidos;
  }

  public getMostrarManguitos() {
    return this.mostrarManguitos;
  }

  public setMostrarManguitos() {
    this.mostrarManguitos = false;
  }

  public getMostrarTopDonadores() {
    return this.mostrarTopDonadores;
  }

  public setMostrarTopDonadores() {
    this.mostrarTopDonadores = false;
  }

  public getRedeSociales() {
    return this.redeSociales;
  }

  public setRedeSociales(RedSocial: RedSocial[]) {
    this.redeSociales = RedSocial;
  }

  public getCategorias() {
    return this.categorias;
  }

  public setCategorias(categorias: Categorias[]) {
    this.categorias = categorias;
  }

  public getDonaciones() {
    return this.donaciones;
  }

  public setDonaciones(donaciones: Donaciones[]) {
    this.donaciones = donaciones;
  }

  /*	public agregarDonacion(Donacion unaDonacion) {
      this.donaciones.add(unaDonacion);
      if(unaDonacion.getEmprendimiento() != this){
        unaDonacion.setEmprendimiento(this);
      }
    }*/

  public getMontoManguito() {
    return this.montoManguito;
  }

  public setMontoManguito(montoManguito: number) {
    this.montoManguito = montoManguito;
  }

  /*public getPlanes() {
    return this.planes;
  }

  public void setPlanes(List<Plan> planes) {
    this.planes = planes;
  }

  public void agregarPlan(Plan unPlan) {
    this.planes.add(unPlan);
    if(unPlan.getEmprendimiento() != this) {
      unPlan.setEmprendimiento(this);
    }
  }

  public getUsuario() {
    return this.usuario;
  }

  public setUsuario(usuario: Usuario) {
    this.usuario = usuario;
  }*/


}
