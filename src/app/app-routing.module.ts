import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegistroComponent } from './registro';
import {EmprendimientoComponent } from './emprendimiento';
import { CategoriaComponent } from './categoria';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './_guards/auth.guard';
import { RegistroUserComponent } from './registro-user/registro-user.component';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/'},//lo llevamos a una ruta no protegida
  { path:'login', component:LoginComponent},
  { path:'emprendimiento', component:EmprendimientoComponent},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  {
      path: '',
      component: HomeComponent
  },
  {
    path: 'categorias',
    component:CategoriaComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
  },
  {
  path: 'register',
  component: RegistroUserComponent
  }
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
