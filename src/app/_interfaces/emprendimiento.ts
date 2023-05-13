import { Donaciones } from "../_models/donaciones";



export interface Emprendimiento { 
  id:number;
  id_usuario:number
  nombreEmprendimiento: string;
  descripcion: string;
  categorias: Categoria[];
  redeSociales:RedSocial [];
  manguitosRecibidos:number;
  donaciones:Donaciones[];
  banner: string;
  montoManguito:number;
  mostrarTopDonadores:boolean;
  mostrarManguitos:boolean;
  
}
export interface  EmprendimientoDto extends Omit<Emprendimiento,'id_emprendimiento'|'redeSociales'|'id_usuario' | 'donaciones'>{


}

/*export interface Donacion{
  nombreDonador:string;
	contacto:string;
	mensaje:string;
	cantidadManguitos:number;
	plan_id:number;
	emprendimiento_id:number;

}*/
export interface Categoria {
  id: number;
  nombreCategoria: string;
}
export interface Usuario {
  id_usuario: number;
  nombre: string;
  password: string;
  perfiles?: [Perfil];
}
export interface UsuarioDto extends Omit <Usuario,'perfiles'>{
mail:string;

}
export interface Perfil {
  id: number;
  nombrePerfil: string;
}
export interface RedSocial {
  id?: number;
  perfilSocial: string;
  url:string;
}
