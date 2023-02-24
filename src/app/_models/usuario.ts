import { Perfil } from "./perfil";

export class Usuario {
    id: number;
    nombre: string;
    password: string;
    perfiles: [Perfil];
    
    constructor(id: number,nombre: string = "", password: string = "", perfiles:[Perfil]) {
        this.id = id;
        this.nombre = nombre;
        this.password = password;  
        this.perfiles = perfiles;      
    }

}
