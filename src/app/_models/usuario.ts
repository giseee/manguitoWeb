export class Usuario {
    nombre: string;
    password: string;
    token?: string;
    fechahtml?:String

    constructor();
    constructor(nombre: string = "", password: string = "", token: string = "") {
        this.nombre = nombre;
        this.password = password;
        this.token = token;
    }

}
