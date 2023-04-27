import { Role } from './roles.type';

export class Usuario {
    id: number;
    nombre: string;
    password: string;
    perfiles: [Role];
    mail:string;

    constructor(id: number=0,nombre: string = "", password: string = "", perfiles:[Role], mail:string="") {
        this.id = id;
        this.nombre = nombre;
        this.password = password;
        this.perfiles = perfiles;
        this.mail=mail;
    }


}
