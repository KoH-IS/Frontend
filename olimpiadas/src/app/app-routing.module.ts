import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplinaComponent } from './components/disciplina/disciplina.component';

const routes: Routes = [
  { path: '', component: DisciplinaComponent },
  { path: 'disciplina', component: DisciplinaComponent },

  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
