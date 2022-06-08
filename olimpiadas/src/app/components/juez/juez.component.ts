import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Disciplina } from 'src/app/_models/disciplina';
import { Juez } from 'src/app/_models/juez';
import { DisciplinaService } from 'src/app/_services/disciplina.service';
import { JuezService } from 'src/app/_services/juez.service';
import Swal from 'sweetalert2';




declare var $: any;

@Component({
  selector: 'app-juez',
  templateUrl: './juez.component.html',
  styleUrls: ['./juez.component.css']
})
export class JuezComponent implements OnInit {

  jueces: Juez[] | any;
  disciplinas: Disciplina[] | any;
  disciplina: Disciplina | any;
  juez: Juez | any;
  juezForm: FormGroup;
  submitted: Boolean;
  modalTitle: String;

  constructor(private juezService: JuezService, private disciplinaService: DisciplinaService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.juezForm = this.formBuilder.group({
      juez_id: [''],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      rfc: [''],
      disciplina_id: [''],
      disciplina: [''],
      status: [''],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
    
    this.getJueces();
    this.getDisciplinas();
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
    console.log('funcion get dischiplina')
    this.disciplina = null;
    this.disciplinaService.getDisciplina(disciplina).subscribe(
      res => {
        this.disciplina = res;
      },
      err => console.error(err)
    )
  }

  getJueces(){
    this.juez = [];
    this.juezService.getJueces().subscribe(
      res => {
        this.jueces = res;
        console.log(this.jueces);
      },
      err => console.error(err)
    )
  }

  getJuez(juez_id){
    this.juez = null;
    this.juezService.getJuez(juez_id).subscribe(
      res => {
        this.juez = res;
      },
      err => console.error(err)
    )
  }

  deleteJuez(juez_id){
    Swal.fire({
      title: 'Eliminar Juez',
      text: '¿Estás seguro de eliminar al juez?',
      showDenyButton: false,
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      denyButtonText: 'No eliminar',
    }).then((result) => {
      if(result.isConfirmed){
        this.juezService.deleteJuez(juez_id).subscribe(
          res => {
            Swal.fire(
              'Eliminado!',
              'El juez ha sido eliminado',
              'success'
            )
            $("#juezModal").modal("hide");
            this.getJueces();
          },
          err => console.error(err)
        )
      }
    });
  }

  onSubmit(){
    this.submitted = true;

    if(this.juezForm.invalid){
      console.log("Formulario inválido");
      return;
    }

    if(this.modalTitle == "Registrar"){
      this.juezService.createJuez(this.juezForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El Juez ha sido creado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#juezModal").modal("hide");
          this.getJueces();
          this.submitted = false;
        },
        err => console.error(err)
      )
    }else{
      
      
      this.juezService.updateJuez(this.juezForm.value).subscribe(
        res => {
          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'El Juez ha sido actualizado',
            showConfirmButton: false,
            timer: 1500
          })
          $("#juezModal").modal("hide");
          this.getJueces();
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

  updateJuez(juez: Juez){
    this.submitted = true;
    this.juezForm.controls['juez_id'].setValue(juez.juez_id);
    this.juezForm.controls['name'].setValue(juez.name);
    this.juezForm.controls['surname'].setValue(juez.surname);
    this.juezForm.controls['rfc'].setValue(juez.rfc);
    this.juezForm.controls['disciplina'].setValue(juez.disciplina);
    this.juezForm.controls['disciplina_id'].setValue(juez.disciplina_id);
    this.juezForm.controls['status'].setValue(juez.status);
    this.juezForm.controls['mail'].setValue(juez.mail);
    this.juezForm.controls['password'].setValue(juez.password);

    this.modalTitle = "Actualizar";
    $("#juezModal").modal("show");
  }

  cambioDisciplina(seleccion){
    console.log(seleccion.value);
    this.getDisciplina(seleccion.value);
    console.log(this.disciplina);
    this.juezForm.controls['disciplina'].setValue(this.disciplina);
    this.juezForm.controls['disciplina_id'].setValue(this.disciplina.disciplina_id);
  }

  get f() { return this.juezForm.controls; }

  openModalJuez(){
    this.juezForm.reset();
    this.modalTitle = "Registrar";
    $("#juezModal").modal("show");
  }
}
function id_juez(id_juez: any) {
  throw new Error('Function not implemented.');
}

