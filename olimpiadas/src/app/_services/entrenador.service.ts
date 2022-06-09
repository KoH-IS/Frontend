import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entrenador } from '../_models/entrenador';
import { Disciplina } from '../_models/disciplina';

@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {  

  constructor(private http: HttpClient) { }

  API_URI = 'http://localhost:8081';
  getEntrenadores(){
    return this.http.get<Entrenador>(this.API_URI+'/entrenador');
  }
  getEntrenador(mail: String){
    return this.http.get<Entrenador>(this.API_URI+'/entrenador/'+mail);
  }

  createEntrenador(entrenador: Entrenador){
    return this.http.post(this.API_URI+'/entrenador', entrenador);
  }

  updateEntrenador(entrenador: Entrenador){
    return this.http.put(this.API_URI+'/entrenador/'+entrenador.entrenador_id, entrenador);
  }

  deleteEntrenador(entrenador_id: number){
    return this.http.delete(this.API_URI+'/entrenador/'+entrenador_id);
  }

  updateEntrenadorDisciplina(disciplina_id: number, disciplina: Disciplina){
    return this.http.put(this.API_URI+'/entrenador/'+disciplina_id+'/disciplina', disciplina);
  }
}
