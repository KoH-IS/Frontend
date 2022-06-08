import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import Swal from "sweetalert2";
import {Disciplina} from "../../_models/disciplina";
import {CompetidorService} from "../../_services/competidor.service";
import {Competidor} from "../../_models/competidor";
import {DisciplinaService} from "../../_services/disciplina.service";

declare var $: any;

@Component({
  selector: 'app-competidor',
  templateUrl: './competidor.component.html',
  styleUrls: ['./competidor.component.css']
})


export class CompetidorComponent implements OnInit {
  competidores: Competidor[] | any;
  disciplinas: Disciplina[] | any;
  disciplina: Disciplina | any;
  competidor: Competidor | any;
  competidorForm: FormGroup;
  submitted: Boolean;
  modalTitle: String;


  constructor(private competidorService: CompetidorService, private disciplinaService: DisciplinaService, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.competidorForm = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      apellido_paterno: ['', Validators.required],
      rfc: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      status: ['']

    });
    this.getDisciplinas();
    this.getCompetidores();
  }

  getDisciplinas() {
    this.disciplinas = [];
    this.disciplinaService.getDisciplinas().subscribe(
      res => {
        this.disciplinas = res;
        console.log(this.disciplinas)
      },
      err => console.error(err)
    )
  }

  getDisciplina(disciplina) {
    this.disciplina = null;
    this.disciplinaService.getDisciplina(disciplina).subscribe(
      res => {
        this.disciplina = res;
      },
      err => console.error(err)
    )
  }

  getCompetidores() {
    this.competidor = [];
    this.competidorService.getCompetidores().subscribe(
      res => {
        this.competidores = res;
        console.log(this.competidores);
      },
      err => console.error(err)
    )
  }

  getCompetido(id) {
    this.competidor = null
    this.competidorService.getCompetidor(id).subscribe(
      res => {
        this.competidor;
      },
      err => console.error(err)
    )
  }

  deleteCompetidor(id) {
    Swal.fire({
      title: 'Eliminar Competidor',
      text: '¿Estás seguro de eliminar al competidor?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'No eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.competidorService.deleteCompetidor(id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'El competidor ha sido eliminado',
              'success'
            )
            $('#competidorModal').modal("hide");
            this.getCompetidores();
          },
          err => console.error(err)
        )
      }
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.competidorForm.invalid) {
      console.log("Formulario inválido");
      return;
    }

    if (this.modalTitle == "Registrar") {
      this.competidorService.createCompetidor(this.competidorForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El Competidor se ha creado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#competidorModal").modal("hide");
          this.getCompetidores();
          this.submitted = false;
        },
        err => console.error(err)
      )
    } else {
      console.log(this.competidorForm.value);
      this.competidorService.updateCompetidor(this.competidorForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El Competidor ha sido actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#juezModal").modal("hide");
          this.getCompetidores();
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

  updateCompetidor(competidor: Competidor) {
    this.submitted = true;
    this.competidorForm.controls['id'].setValue(competidor.id);
    this.competidorForm.controls['nombre'].setValue(competidor.nombre);
    this.competidorForm.controls['apellido_paterno'].setValue(competidor.apellido_paterno);
    this.competidorForm.controls['apellido_materno'].setValue(competidor.apellido_materno);
    this.competidorForm.controls['disciplina'].setValue(competidor.disciplina);
    this.competidorForm.controls['disciplina_id'].setValue(competidor.disciplina_id);
    this.competidorForm.controls['email'].setValue(competidor.email);
    this.competidorForm.controls['password'].setValue(competidor.password);

    this.modalTitle = "Actualizar";
    $("#competidorModal").modal("show");
  }


  cambioDisciplina(seleccion) {
    console.log(seleccion.value);
    this.getDisciplina(seleccion.value);
    console.log(this.disciplina);
    this.competidorForm.controls['disciplina'].setValue(this.disciplina);
    this.competidorForm.controls['disciplina_id'].setValue(this.disciplina.id);
  }

  get f() {
    return this.competidorForm.controls;
  }

  openModalCompetidor() {
    this.competidorForm.reset();
    this.modalTitle = "Registrar";
    $("#competidorModal").modal("show");
  }

}
