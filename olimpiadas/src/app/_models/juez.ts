import { Disciplina } from "./disciplina";

export class Juez{
    juez_id: number;
    name: String;
    surname: String;
    rfc: String;
    disciplina_id: number;
    disciplina: Disciplina;
    status: number;
    mail: String;
    password: String;
    
    

    constructor(juez_id, name, surname, rfc, disciplina_id, disciplina, status, mail, password){
        this.juez_id = juez_id;
        this.name = name;
        this.surname = surname;
        this.rfc = rfc;
        this.disciplina_id = disciplina_id;
        this.disciplina = disciplina;
        this.status = status;
        this.mail = mail;
        this.password = password;
    }
}