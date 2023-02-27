import { Perfil } from "./perfil";

export class Usuario {
    id: number;
    nombre?: string;
    password?: string;
    perfiles?: [Perfil];

    mail?:string;
    constructor(mail:string='', id: number=0,nombre: string = "", password: string = "", perfiles:[Perfil]) {
        this.id = id;
        this.nombre = nombre;
        this.password = password;
        this.perfiles = perfiles;
        this.mail=mail;
    }


}
