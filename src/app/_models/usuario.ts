import { Role } from './roles.type';

export class Usuario {
    id: number;
    id_emprendimiento: number;
    nombre: string;
    password: string;
    perfiles: Role[];
    mail: string;

    constructor(
        id: number = 0,
        id_emprendimiento: number,
        nombre: string = "",
        password: string = "",
        perfiles: Role[] = [],
        mail: string = ""
    ) {
        this.id = id;
        this.id_emprendimiento = id_emprendimiento;
        this.nombre = nombre;
        this.password = password;
        this.perfiles = perfiles;
        this.mail = mail;
    }


}
