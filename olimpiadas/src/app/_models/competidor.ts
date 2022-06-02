import { Entrenador } from "./entrenador";
import { Disciplina } from "./disciplina";

export class Competidor{
    id: number;
    nombre: String;
    apellido_paterno: String;
    apellido_materno: String;
    disciplina_id: number;
    disciplina: Disciplina;
    entrenador_id: number;
    entrenador:Entrenador;
    email: String;
    password: String;

    constructor(id, nombre, apellido_paterno, apellido_materno, disciplina_id, disciplina, entrenador_id,entrenador, email, password){
        this.id = id;
        this.nombre = nombre;
        this.apellido_paterno = apellido_paterno;
        this.apellido_materno = apellido_materno;
        this.disciplina_id = disciplina_id;
        this.disciplina = disciplina;
        this.entrenador_id= entrenador_id;
        this.entrenador=entrenador;
        this.email = email;
        this.password = password;
    }
}