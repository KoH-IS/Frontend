import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Disciplina } from '../_models/disciplina';
import { Juez } from '../_models/juez';

@Injectable({
  providedIn: 'root'
})
export class JuezService {

  API_URI = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getJueces(){
    return this.http.get<Juez[]>(this.API_URI+'/juez');
  }

  getJuez(email: String){
    return this.http.get<Juez>(this.API_URI+'/juez/'+email);
  }

  createJuez(juez: Juez){
    return this.http.post(this.API_URI+'/juez', juez);
  }

  updateJuez(juez: Juez){
    return this.http.put(this.API_URI+'/juez/'+juez.id, juez);
  }

  deleteJuez(id: number){
    return this.http.delete(this.API_URI+'/juez/'+id);
  }

  updateJuezDisciplina(id: number, disciplina: Disciplina){
    return this.http.put(this.API_URI+'/juez/'+id+'/disciplina', disciplina);
  }
}