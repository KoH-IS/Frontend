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

  getJuez(mail: String){
    return this.http.get<Juez>(this.API_URI+'/juez/'+mail);
  }

  createJuez(juez: Juez){
    return this.http.post(this.API_URI+'/juez', juez);
  }

  updateJuez(juez: Juez){
    return this.http.put(this.API_URI+'/juez/'+juez.juez_id, juez);
  }

  deleteJuez(juez_id: number){
    return this.http.delete(this.API_URI+'/juez/'+juez_id);
  }

  updateJuezDisciplina(disciplina_id: number, disciplina: Disciplina){
    return this.http.put(this.API_URI+'/juez/'+disciplina_id+'/disciplina', disciplina);
  }
}