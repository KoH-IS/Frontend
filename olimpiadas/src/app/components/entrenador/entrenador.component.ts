import { Component, OnInit } from '@angular/core';
import { EntrenadorService } from '../../_services/entrenador.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Entrenador } from 'src/app/_models/entrenador';
import Swal from 'sweetalert2';

//import Swal from 'sweetalert2';
declare var $: any;
@Component({
  selector: 'app-entrenador',
  templateUrl: './entrenador.component.html',
  styleUrls: ['./entrenador.component.css']
})
export class EntrenadorComponent implements OnInit {
  Entrenadores: Entrenador[] | any;
  entrenador: Entrenador | any;
  entrenadorForm: FormGroup;
  competidorForm: FormGroup;
  submitted = false;
  modalTitle: String;

  constructor(private entrenadorService: EntrenadorService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.entrenadorForm = this.formBuilder.group({
      id: [''],
      nombre: [''],
      apellidop: [''],
      apellidom: [''],
      disciplina:['',Validators.required],
      Email:['']
    });
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
  // agregar entrenador
  onSubmit(){
    this.submitted = true;

    if(this.entrenadorForm.invalid){
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
    deleteentrenador(identrenador){
      Swal.fire({
        title: 'Eliminar entrenador',
        text: '¿Estás seguro de eliminar al entrenador?',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        denyButtonText: 'No eliminar',
      }).then((result) => {
        if(result.isConfirmed){
          this.entrenadorService.deleteEntrenador(identrenador).subscribe(
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
      this.entrenadorForm.controls['idEntrenador'].setValue(entrenador.idEntrenador);
      this.entrenadorForm.controls['Nombre'].setValue(entrenador.Nombre);
      this.entrenadorForm.controls['ApellidoPaterno'].setValue(entrenador.ApellidoPaterno);
      this.entrenadorForm.controls['ApellidoMaterno'].setValue(entrenador.ApellidoMaterno);
      this.entrenadorForm.controls['Disciplina'].setValue(entrenador.Disciplina)
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
      this.competidorForm.controls['nombre'].setValue(competidor.nombre);
      this.competidorForm.controls['apellidop'].setValue(competidor.apellidop);
      this.competidorForm.controls['apellidom'].setValue(competidor.apellidom);
      this.competidorForm.controls['competencia'].setValue(competidor.competencia)
      //no se cambia el valor de id del entrenador.
  
      this.modalTitle = "Actualizar";
      $("#entreandorModal").modal("show");
    }
    get f() { return this.entrenadorForm.controls; }*/
