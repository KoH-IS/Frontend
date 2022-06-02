export class Entrenador {
    idEntrenador: number;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Email: string;
    Disciplina: string;


    constructor(idEntrenador,Nombre,ApellidoPaterno,ApellidoMaterno,Email,Disciplina){
        this.idEntrenador=idEntrenador;
        this.Nombre=Nombre;
        this.ApellidoPaterno=ApellidoPaterno;
        this.ApellidoMaterno=ApellidoMaterno;
        this.Email=Email;
        this.Disciplina=Disciplina;
    }
}