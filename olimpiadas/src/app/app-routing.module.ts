import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginAdministradorComponent } from './components/autenticacion/login-administrador/login-administrador.component';
import { LoginComponent } from './components/autenticacion/login/login.component';
import { DisciplinaComponent } from './components/disciplina/disciplina.component';
<<<<<<< Updated upstream
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from './_helpers/auth.guard';
=======
import { EntrenadorComponent } from './components/entrenador/entrenador.component';
>>>>>>> Stashed changes

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'login', component: LoginComponent },
  { path: 'login-admin', component: LoginAdministradorComponent },
  { path: 'disciplina', component: DisciplinaComponent },
  { path: 'entrenador', component: EntrenadorComponent },

  {
    path: 'disciplina',
    component: DisciplinaComponent,
    canActivate: [AuthGuard],
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
