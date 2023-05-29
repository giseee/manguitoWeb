import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegistroComponent } from './registro';
import {EmprendimientoComponent } from './emprendimiento';
import { CategoriaComponent } from './categoria';
import { RedesSocialesComponent } from './redes-sociales';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegistroUserComponent } from './registro-user/registro-user.component';
import { DetalleEmprendimientoComponent } from './detalle-emprendimiento/detalle-emprendimiento.component';
import { CommonModule } from '@angular/common';
import { EditUserComponent } from './edit-user';
import { EditEmprendimientoComponent } from './edit-emprendimiento';
import {hasRole} from './_guards/has-role.guard';
import { EditPasswordComponent } from './edit-password';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/'},//lo llevamos a una ruta no protegida
  { path:'login', component:LoginComponent},
  { path:'emprendimiento', component:EmprendimientoComponent},
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard, hasRole(['ROLE_USER', 'ROLE_ADMIN'])],
    canLoad: [hasRole(['ROLE_USER', 'ROLE_ADMIN'])]
  },
  { path: 'edit', component: EditUserComponent, canActivate: [AuthGuard] },
  {
      path: '',
      component: HomeComponent
  },
  {
    path: 'editPassword',
    component: EditPasswordComponent,
    canActivate: [AuthGuard, hasRole(['ROLE_USER', 'ROLE_ADMIN'])],
    canLoad: [hasRole(['ROLE_USER', 'ROLE_ADMIN'])]
  },
  {
    path: 'redes',
    component:RedesSocialesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'categorias',
    component:CategoriaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registro',
    component: RegistroUserComponent
  },
  {
  path: 'editEmp',
  component: EditEmprendimientoComponent,canActivate: [AuthGuard]
},
  {
    path: 'detalle/:id',
    component: DetalleEmprendimientoComponent
    }
]
@NgModule({
  imports: [ CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
