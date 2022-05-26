import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DisciplinaComponent } from './components/disciplina/disciplina.component';
import { MainComponent } from './components/main/main.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/autenticacion/login/login.component';
import { LoginAdministradorComponent } from './components/autenticacion/login-administrador/login-administrador.component';

@NgModule({
  declarations: [
    AppComponent,
    DisciplinaComponent,
    MainComponent,
    NavComponent,
    LoginComponent,
    LoginAdministradorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
