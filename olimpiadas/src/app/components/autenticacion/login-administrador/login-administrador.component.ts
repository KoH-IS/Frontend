import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs';
import { LoginService } from 'src/app/_services/login.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-administrador',
  templateUrl: './login-administrador.component.html',
  styleUrls: ['./login-administrador.component.css']
})
export class LoginAdministradorComponent implements OnInit {

  loginForm: FormGroup
  email = ''
  password = ''

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    console.log("(((((((((((");
    this.loginForm = this.formBuilder.group({
      'email': [null, Validators.required],
      'password': [null, Validators.required]
    })
  }

  camposInvalidos(){
    const campos_invalidos = []
    const controles = this.loginForm.controls
    for(const nombre_control in controles){
      if(controles[nombre_control].invalid){
        campos_invalidos.push(nombre_control)
      }
    }
    return campos_invalidos
  }

  onSubmit(){
    if(this.loginForm.invalid){
      let campos_invalidos = this.camposInvalidos()
      if(campos_invalidos.includes("email")){
        Swal.fire({
          title: 'El correo es inválido',
          text: "Error",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        })
      }else if(campos_invalidos.includes("password")){
        Swal.fire({
          title: 'La contraseña debe ser al menos de 8 caracteres',
          text: "Error",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        })
      }else{
        Swal.fire({
          title: 'Todos los campos son obligatorios',
          text: "Error",
          icon: 'warning',
          confirmButtonColor: '#3085d6',
          confirmButtonText: 'OK'
        })
      }
      return
    }else{
      this.loginService.autenticar(this.loginForm.value).pipe(first()).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          Swal.fire({
            title: 'Bienvenido.',
            text: "Sesión Iniciada",
            icon: 'success',
            confirmButtonText: 'OK'
          });
          console.log(this.loginForm.controls['email'].value);
          this.loginService.loggedIn(this.loginForm.controls['email'].value, res);
          //this.router.navigate(['/alumno']);
          window.location.reload();
        },
        err => {
          Swal.fire({
            title: 'Credenciales Inválidas',
            text: "Por favor verifica las credenciales",
            icon: 'error',
            confirmButtonText: 'OK'
          });
          console.log(err);
        }
      );
    }
  }

}
