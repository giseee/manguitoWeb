import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { EmprendimientoComponent } from './emprendimiento/emprendimiento.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ListarCategoriasComponent } from './listar-categorias/listar-categorias.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistroUserComponent } from './registro-user/registro-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    LoginComponent,
    RegistroComponent,
    EmprendimientoComponent,
    CategoriaComponent,
    ListarCategoriasComponent,
    DashboardComponent,
    RegistroUserComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
