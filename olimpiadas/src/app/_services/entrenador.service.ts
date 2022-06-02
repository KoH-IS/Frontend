import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Entrenador } from '../_models/entrenador';


@Injectable({
  providedIn: 'root'
})
export class EntrenadorService {  

  constructor(private http: HttpClient) { }

  API_URI = 'http://localhost:8081';
  getEntrenadores(){
    return this.http.get<Entrenador>(this.API_URI+'/entrenador');
  }

  createEntrenador(entrenador: Entrenador){
    return this.http.post(this.API_URI+'/entrenador', entrenador);
  }

  updateEntrenador(entrenador: Entrenador){
    return this.http.put(this.API_URI+'/entrenador/'+entrenador.idEntrenador, entrenador);
  }

  deleteEntrenador(id: number){
    return this.http.delete(this.API_URI+'/entrenador/'+id);
  }
}
