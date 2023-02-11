import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegistroComponent } from './registro';
import {EmprendimientoComponent } from './emprendimiento';
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/'},//lo llevamos a una ruta no protegida
  { path:'login', component:LoginComponent},
  { path:'emprendimiento', component:EmprendimientoComponent},
  {
      path: '',
      component: HomeComponent
  },
  {
    path: 'registro',
    component: RegistroComponent
}
]
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
