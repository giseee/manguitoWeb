


export interface Emprendimiento {
  id_emprendimiento: number;
  nombreEmprendimiento: string;
  descripcion: string;
  categorias: Categoria[];
  redeSociales:RedSocial [];
  manguitosRecibidos:number;
 // donaciones:Donacion[];
  banner: string;
  id:number;
  montoManguito:number;
  mostrarTopDonadores:boolean;
  mostrarManguitos:boolean;

}
export interface  EmprendimientoDto extends Omit<Emprendimiento,'id_emprendimiento'|'redeSociales'|'usuario'>{


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
