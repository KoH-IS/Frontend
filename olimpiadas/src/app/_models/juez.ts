import { Disciplina } from "./disciplina";

export class Juez{
    id: number;
    nombre: String;
    apellido_paterno: String;
    apellido_materno: String;
    disciplina_id: number;
    disciplina: Disciplina;
    status: number;
    email: String;
    password: String;

    constructor(id, nombre, apellido_paterno, apellido_materno, disciplina_id, disciplina, status, email, password){
        this.id = id;
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.disciplina_id = disciplina_id;
        this.disciplina = disciplina;
        this.status = status;
        this.email = email;
        this.password = password;
    }
}