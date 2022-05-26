export class Entrenador {
    idEntrenador: number;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Email: string;
    Disciplina: string;


    constructor(idEntrendaor,Nombre,ApellidoPaterno,ApellidoMaterno,Email,Disciplina){
        this.idEntrenador=idEntrendaor;
        this.Nombre=Nombre;
        this.ApellidoPaterno=ApellidoPaterno;
        this.ApellidoMaterno=ApellidoMaterno;
        this.Email=Email;
        this.Disciplina=Disciplina;
    }
}