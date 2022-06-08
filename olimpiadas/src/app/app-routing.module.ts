import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdministradorComponent } from './components/autenticacion/login-administrador/login-administrador.component';
import { LoginComponent } from './components/autenticacion/login/login.component';
import { RegistroComponent } from './components/autenticacion/registro/registro.component';
import { CompetidorComponent } from './components/competidor/competidor.component';
import { DisciplinaComponent } from './components/disciplina/disciplina.component';
import { EntrenadorComponent } from './components/entrenador/entrenador.component';
import { JuezComponent } from './components/juez/juez.component';
import { NavComponent } from './components/nav/nav.component';



const routes: Routes = [
  { path: '', component: NavComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-admin', component: LoginAdministradorComponent },
  { path: 'disciplina', component: DisciplinaComponent },
  { path: 'juez', component: JuezComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'entrenador',component:EntrenadorComponent},
  { path:'competidor',component:CompetidorComponent},

  {
    path: 'disciplina',
    component: DisciplinaComponent,
    
    data: {
      expectedRole: 'admin@mail.com'
    }
  },

  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
