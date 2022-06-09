export class Disciplina{
    disciplina_id: number;
    disciplina: String;
    descripcion: String;
    status: number;cd

    constructor(disciplina_id, disciplina, descripcion, status){
        this.disciplina_id = disciplina_id;
        this.disciplina = disciplina;
        this.descripcion = descripcion;
        this.status = status;
    }
}