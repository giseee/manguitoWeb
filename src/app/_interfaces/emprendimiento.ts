


export interface Emprendimiento {
  id?: number;
  nombreEmprendimiento: string;
  descripcion: string;
  categorias: Categoria[];
  redeSociales:RedSocial [];
  banner: string;
  montoManguito:number;
  usuarioId: number;
  mostrarTopDonadores:boolean;
  mostrarManguitos:boolean;
}


export interface Categoria {
  id: number;
  nombre: string;
}
export interface Usuario {
  id?: number;
  nombre: string;
  perfiles: string;
}
export interface RedSocial {
  id: number;
  perfilSocial: string;
  url:string;
}
