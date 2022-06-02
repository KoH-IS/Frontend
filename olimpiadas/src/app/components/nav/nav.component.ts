import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Disciplina } from 'src/app/_models/disciplina';
import { DisciplinaService } from 'src/app/_services/disciplina.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  texto_navegacion = 'TaPok';
  logged = false;
  isadmin = false;
  disciplinas: Disciplina[] | any;

  constructor(private disciplinaService: DisciplinaService) { }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    let jwtHelper = new JwtHelperService();
    let objJwt = jwtHelper.decodeToken(token);

    console.log(token);
    if(token){
      this.logged = true;
    }

    if(objJwt.sub === 'admin@mail.com'){
      this.isadmin = true;
    }
  }

  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }
  
  getDisciplinas(){
    
    this.disciplinas = [new Disciplina(1, "Luchas", "Primer disciplina", 1),
    new Disciplina(1, "Taekwondo", "Segunda disciplina", 1),
    new Disciplina(1, "Gimnasia", "Tercer disciplina", 1)
  ];
    this.disciplinaService.getDisciplinas().subscribe(
      res => {
        this.disciplinas = res;
        console.log(this.disciplinas)
      },
      err => console.error(err)
    )
  }
}
