import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Competidor } from '../_models/competidor';

@Injectable({
  providedIn: 'root'
})
export class CompetidorService {

  API_URI = 'http://localhost:8081';

  constructor(private http: HttpClient) { }

  getCompetidores(){
    return this.http.get<Competidor[]>(this.API_URI+'/competidor');
  }

  getCompetidor(email: String){
    return this.http.get<Competidor>(this.API_URI+'/competidor/'+email);
  }

  createCompetidor(Competidor: Competidor){
    return this.http.post(this.API_URI+'/competidor', Competidor);
  }

  updateCompetidor(Competidor: Competidor){
    return this.http.put(this.API_URI+'/competidor/'+Competidor.id, Competidor);
  }

  deleteCompetidor(id: number){
    return this.http.delete(this.API_URI+'/competidor/'+id);
  }
}