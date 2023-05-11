import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { SwiperModule }from 'swiper/angular'
import { AuthenticationService } from './_services/authentication.service';
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
import { authTokeninterceptorProvider } from './interceptors';
import { RegEmprendimientoComponent } from './reg-emprendimiento/reg-emprendimiento.component';
import { DetalleEmprendimientoComponent } from './detalle-emprendimiento/detalle-emprendimiento.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { RedesSocialesComponent } from './redes-sociales/redes-sociales.component';
import { EmprendimientosComponent } from './emprendimientos/emprendimientos.component';
import { EditEmprendimientoComponent } from './edit-emprendimiento/edit-emprendimiento.component';
import { ShowForRolesDirective} from './directives/show-for-roles.directive';
import { EditPasswordComponent } from './edit-password/edit-password.component'
import { AlertModule } from './_alert';

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
    RegEmprendimientoComponent,
    DetalleEmprendimientoComponent,
    EditUserComponent,
    RedesSocialesComponent,
    EmprendimientosComponent,
    EditEmprendimientoComponent,
    ShowForRolesDirective,
    EditPasswordComponent    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    SwiperModule,
    AlertModule
  ],
  providers: [authTokeninterceptorProvider,AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
