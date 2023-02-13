export class Usuario {
    nombre: string;
    apellido: string;
    direccion: string;
    nombreUsuario: string;
    password: string;
    token?: string;
    fechahtml?:String

    constructor();
    constructor(nombre: string = "", apellido: string = "", direccion: string = "", nombreUsuario: string = "", password: string = "", token: string = "") {
        this.nombre = nombre;
        this.apellido = apellido;
        this.direccion = direccion;
        this.nombreUsuario = nombreUsuario;
        this.password = password;
        this.token = token;


    }

    public getNombre() {
        return this.nombre
    }
    public getApellido() {
        return this.apellido
    }
    public getDireccion() {
        return this.direccion
    }
    public getNombreUsuario() {
        return this.nombreUsuario
    }
    public getPassword() {
        return this.password
    }

    public setNombre(nuevoNombre: string) {
        this.nombre = nuevoNombre
    }
    public setApellido(nuevoApellido: string) {
        this.apellido = nuevoApellido
    }
    public setDireccion(nuevaDireccion: string) {
        this.direccion = nuevaDireccion
    }
    public setNombreUsuario(nuevoNombreUsuario: string) {
        this.nombreUsuario = nuevoNombreUsuario
    }
    public setPassword(nuevoPassword: string) {
        this.password = nuevoPassword
    }
}
