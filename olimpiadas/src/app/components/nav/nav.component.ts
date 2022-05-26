import { Component, OnInit, ViewChild } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  texto_navegacion = 'TaPok';
  logged = false;
  isadmin = false;

  constructor() { }

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
}
