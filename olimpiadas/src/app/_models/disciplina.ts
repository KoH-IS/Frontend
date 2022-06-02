export class Disciplina{
    id: number;
    disciplina: String;
    descripcion: String;
    status: number;cd

    constructor(id, disciplina, descripcion, status){
        this.id = id;
        this.disciplina = disciplina;
        this.descripcion = descripcion;
        this.status = status;
    }
}