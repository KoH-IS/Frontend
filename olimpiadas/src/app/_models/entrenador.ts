import { Disciplina } from "./disciplina";
export class Entrenador {
    entrenador_id: number;
    name: string;
    surname: string;
    rfc: string;
    mail: string;
    password:string;
    disciplina_id: number;
    disciplina: Disciplina;
    status: number;


    constructor(entrenador_id,name,surname,rfc,mail,password,disciplina_id, disciplina){
        this.entrenador_id=entrenador_id;
        this.name=name;
        this.surname=surname;
        this.rfc=rfc;
        this.mail=mail;
        this.password=password;
        this.disciplina_id=disciplina_id;
        this.disciplina = disciplina;
    }
}