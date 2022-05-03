import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Disciplina } from 'src/app/_models/disciplina';
import { DisciplinaService } from 'src/app/_services/disciplina.service';
import Swal from 'sweetalert2';

declare var $: any;

@Component({
  selector: 'app-disciplina',
  templateUrl: './disciplina.component.html',
  styleUrls: ['./disciplina.component.css']
})
export class DisciplinaComponent implements OnInit {

  disciplinas: Disciplina[] | any;
  disciplina: Disciplina | any;
  disciplinaForm: FormGroup;
  submitted = false;
  modalTitle: String;

  constructor(private disciplinaService: DisciplinaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.disciplinaForm = this.formBuilder.group({
      id: [''],
      disciplina: ['', Validators.required],
      descripcion: ['', Validators.required],
      status: ['']
    });
    // Consultar la lista de disciplinas
    this.getDisciplinas();
  }

  // Cosultar lista de disciplinas
  getDisciplinas(){
    this.disciplina = [new Disciplina(1, "Luchas", "Primer disciplina", 1)];
    this.disciplinaService.getDisciplinas().subscribe(
      res => {
        this.disciplinas = res;
        console.log(this.disciplinas)
      },
      err => console.error(err)
    )
  }

  // Consultar una disciplina
  getDisciplina(id){
    this.disciplinas = null;
    this.disciplinaService.getDisciplina(id).subscribe(
      res => {
        this.disciplina = res;
      },
      err => console.error(err)
    )
  }

  // Eliminar una disciplina
  deleteDisciplina(id){
    Swal.fire({
      title: 'Eliminar Disciplina',
      text: '¿Estás seguro de eliminar la disciplina?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'No eliminar',
    }).then((result) => {
      if(result.isConfirmed){
        this.disciplinaService.deleteDisciplina(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'La disciplina ha sido eliminada',
              'success'
            )
            $("#disciplinaModal").modal("hide");
            this.getDisciplinas();
          },
          err => console.error(err)
        )
      }
    });
  }

  // Crear una disciplina
  onSubmit(){
    this.submitted = true;

    if(this.disciplinaForm.invalid){
      console.log("Formulario inválido");
      return;
    }

    if(this.modalTitle == "Registrar"){
      this.disciplinaService.createDisciplina(this.disciplinaForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La disciplina ha sido creada',
            showConfirmButton: false,
            timer: 1500
          })
          $("#disciplinaModal").modal("hide");
          this.getDisciplinas();
          this.submitted = false;
        },
        err => console.error(err)
      )
    }else{
      console.log(this.disciplinaForm.value);
      this.disciplinaService.updateDisciplina(this.disciplinaForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'La disciplina ha sido actualizada',
            showConfirmButton: false,
            timer: 1500
          })
          $("#disciplinaModal").modal("hide");
          this.getDisciplinas();
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

  updateDisciplina(disciplina: Disciplina){
    this.submitted = true;
    this.disciplinaForm.controls['id'].setValue(disciplina.id);
    this.disciplinaForm.controls['disciplina'].setValue(disciplina.disciplina);
    this.disciplinaForm.controls['descripcion'].setValue(disciplina.descripcion);
    this.disciplinaForm.controls['status'].setValue(disciplina.status);

    this.modalTitle = "Actualizar";
    $("#disciplinaModal").modal("show");
  }

  get f() { return this.disciplinaForm.controls; }

  openModalDisciplina(){
    this.disciplinaForm.reset();
    this.modalTitle = "Registrar";
    $("#disciplinaModal").modal("show");
  }
}