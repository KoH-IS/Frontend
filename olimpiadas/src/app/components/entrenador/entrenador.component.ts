import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EntrenadorService } from '../../_services/entrenador.service';

import { Entrenador } from 'src/app/_models/entrenador';

import { DisciplinaService } from 'src/app/_services/disciplina.service';
import { Disciplina } from 'src/app/_models/disciplina';
import Swal from 'sweetalert2';


declare var $: any;

@Component({
  selector: 'app-entrenador',
  templateUrl: './entrenador.component.html',
  styleUrls: ['./entrenador.component.css']
})
export class EntrenadorComponent implements OnInit {
  Entrenadores: Entrenador[] | any;
  entrenador: Entrenador | any;
  disciplinas: Disciplina[] | any;
  disciplina: Disciplina | any;
  entrenadorForm: FormGroup;
  competidorForm: FormGroup;
  submitted = false;
  modalTitle: String;

  constructor(private entrenadorService: EntrenadorService, private disciplinaService: DisciplinaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.entrenadorForm = this.formBuilder.group({
      entrenador_id: [''],
      name: [''],
      surname: [''],
      rfc: [''],
      disciplina_id:[''],
      disciplina:['',Validators.required],
      status:[''],
      mail:['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    this.getDisciplinas();
    this.getEntrenadores();
}
getDisciplinas(){
  this.disciplinas = [];// [new Disciplina(1, "Luchas", "Primer disciplina", 1),
 // new Disciplina(1, "Taekwondo", "Segunda disciplina", 1),
  //new Disciplina(1, "Gimnasia", "Tercer disciplina", 1)];
  this.disciplinaService.getDisciplinas().subscribe(
    res => {
      this.disciplinas = res;
      console.log(this.disciplinas)
    },
    err => console.error(err)
  )

}
getDisciplina(disciplina){

  console.log('funcion get disciplina')
  this.disciplina = null;
  this.disciplinaService.getDisciplina(disciplina).subscribe(
    res => {
      this.disciplina = res;
      console.log('get disciplina:')
      console.log(this.disciplina);
      console.log(typeof this.disciplina)
      this.otrocambio()
    
    },
    err => console.log('no se obtuvo la disciplina')
  )
}
cambioDisciplina(seleccion){
  console.log(seleccion.value);
  this.getDisciplina(Number(seleccion.value));

}
otrocambio(){
  console.log('otro cambio disciplina:')
  console.log(this.disciplina)
  console.log(typeof this.disciplina)

  this.entrenadorForm.controls['disciplina'].setValue(this.disciplina);
  

}
// Cosultar lista de entrenadores 
  getEntrenadores(){
    this.Entrenadores=['','','','','']
    this.entrenadorService.getEntrenadores().subscribe(
      res => {
        this.Entrenadores = res;
        console.log(this.Entrenadores)
      },
      err => console.error(err)
    )
  }
  getEntrenador(entrenador_id){
    this.entrenador = null;
    this.entrenadorService.getEntrenador(entrenador_id).subscribe(
      res => {
        this.entrenador = res;
      },
      err => console.error(err)
    )
  }
  // agregar entrenador
  onSubmit(){
    this.submitted = true;

    if(this.entrenadorForm.invalid){
      console.log(this.entrenadorForm)
      console.log("Formulario inválido");
      return;
    }

    if(this.modalTitle == "Registrar"){
      this.entrenadorService.createEntrenador(this.entrenadorForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El entrenador se ha añadido correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          $("#entrenadorModal").modal("hide");
          this.getEntrenadores();
          this.submitted = false;
        },
        err => console.error(err)
      )
    }else{
      console.log(this.entrenadorForm.value);
      this.entrenadorService.updateEntrenador(this.entrenadorForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El entrenador ha sido actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#entrenadorModal").modal("hide");
          this.getEntrenadores();
          this.submitted = false;
        },
        err => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al conectar con el servidor'
          })
        }
      )
    }
  }

    // Eliminar una entrenador id
    deleteentrenador(entrenador_id){
      Swal.fire({
        title: 'Eliminar entrenador',
        text: '¿Estás seguro de eliminar al entrenador?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: 'No eliminar',
      }).then((result) => {
        if(result.isConfirmed){
          this.entrenadorService.deleteEntrenador(entrenador_id).subscribe(
            res => {
              Swal.fire(
                'Eliminado!',
                'El entrenador ha sido eliminada',
                'success'
              )
              $("#entrenadorModal").modal("hide");
              this.getEntrenadores();
            },
            err => console.error(err)
          )
        }
      });
    }
    //actualizar un entrenador
   updateEntrenador(entrenador: Entrenador){
    this.submitted = true;
    this.entrenadorForm.controls['entrenador_id'].setValue(entrenador.entrenador_id);
    this.entrenadorForm.controls['name'].setValue(entrenador.name);
    this.entrenadorForm.controls['surname'].setValue(entrenador.surname);
    this.entrenadorForm.controls['rfc'].setValue(entrenador.rfc);
    this.entrenadorForm.controls['disciplina'].setValue(entrenador.disciplina);
    this.entrenadorForm.controls['disciplina_id'].setValue(entrenador.disciplina);
    this.entrenadorForm.controls['status'].setValue(entrenador.status);
    this.entrenadorForm.controls['mail'].setValue(entrenador.mail);
    this.entrenadorForm.controls['password'].setValue(entrenador.password);
      //no se cambia el valor de id del entrenador.
  
      this.modalTitle = "Actualizar";
      $("#entreandorModal").modal("show");
    }
    get f() { return this.entrenadorForm.controls; }
    openModalEntrenador(): void{
      this.entrenadorForm.reset();
      this.modalTitle = "Registrar";
      $("#entrenadorModal").modal("show");
    } 
  }
    // Cosultar lista de competidores de misma disciplina
  /*getcompetidores(disciplina){
    this.competidores: any[]=['','','','','']
    this.competidorService.getCompetidores().subscribe(
      res => {
        this.competidores = res;
        console.log(this.competidores)
      },
      err => console.error(err)
    )
  }
  // agregar competidor
  onSubmit(){
    this.submitted = true;

    if(this.competidorForm.invalid){
      console.log("Formulario inválido");
      return;
    }

    if(this.modalTitle == "Registrar"){
      this.competidorService.createcompetidor(this.competidorForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El competidor se ha añadido correctamente',
            showConfirmButton: false,
            timer: 1500
          })
          $("#competidorModal").modal("hide");
          this.getcompetidores();
          this.submitted = false;
        },
        err => console.error(err)
      )
    }else{
      console.log(this.competidorForm.value);
      this.competidorService.updateCompetidor(this.competidorForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El competidor ha sido actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#competidorModal").modal("hide");
          this.getcompetidores();
          this.submitted = false;
        },
        err => {
          console.error(err);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Error al conectar con el servidor'
          })
        }
      )
    }
  }

    // Eliminar una competidor
    deleteCompetidor(idCompetidor){
      Swal.fire({
        title: 'Eliminar Competidor',
        text: '¿Estás seguro de eliminar al competidor?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: 'No eliminar',
      }).then((result) => {
        if(result.isConfirmed){
          this.competidorService.deleteCompetidor(idCompetidor).subscribe(
            res => {
              Swal.fire(
                'Eliminado!',
                'El competidor ha sido eliminada',
                'success'
              )
              $("#competidorModal").modal("hide");
              this.getcompetidores();
            },
            err => console.error(err)
          )
        }
      });
    }
    //actualizar un competidor
    updateCompetidor(competidor: Competidor){
      this.submitted = true;
      this.competidorForm.controls['idCompetidores'].setValue(competidor.id);
      this.competidorForm.controls['name'].setValue(competidor.name);
      this.competidorForm.controls['surname'].setValue(competidor.surname);
      this.competidorForm.controls['rfc'].setValue(competidor.rfc);
      this.competidorForm.controls['competencia'].setValue(competidor.competencia)
      //no se cambia el valor de id del entrenador.
  
      this.modalTitle = "Actualizar";
      $("#entreandorModal").modal("show");
    }
    get f() { return this.entrenadorForm.controls; }*/
