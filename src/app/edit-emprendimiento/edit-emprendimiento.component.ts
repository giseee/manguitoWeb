import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Emprendimiento } from '../_models/emprendimiento';
import { AuthenticationService } from '../_services';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { UsuarioService } from '../_services/usuario.service';
@Component({
  selector: 'app-edit-emprendimiento',
  templateUrl: './edit-emprendimiento.component.html',
  styleUrls: ['./edit-emprendimiento.component.scss']
})
export class EditEmprendimientoComponent implements OnInit{
  editing: boolean = false;
  emprendimiento:Emprendimiento={
    id_emprendimiento: 0,
    nombreEmprendimiento: '',
    descripcion: '',
    banner: '',
    manguitosRecibidos: 0,
    mostrarManguitos: true,
    mostrarTopDonadores: true,
    redeSociales: [],
    categorias:[],
   // donaciones: [],
    montoManguito: 0,
    id:0
  };
  emprendimientoSeleccionado: Emprendimiento | null = null;
  emprendimientos:Emprendimiento[]=[];
  emprendimientoToEdit:Emprendimiento={
    id_emprendimiento: 0,
    nombreEmprendimiento: '',
    descripcion: '',
    banner: '',
    manguitosRecibidos: 0,
    mostrarManguitos: true,
    mostrarTopDonadores: true,
    redeSociales: [],
    categorias:[],
   // donaciones: [],
    montoManguito: 0,
    id:0
  };
  id:number=0;
  constructor(
    private route: ActivatedRoute,
    private authService:AuthenticationService,
    private usuarioService:UsuarioService,
    private emprendimientoService: EmprendimientoService
  ) {}

  ngOnInit(): void {
    this.authService.currentUsuario$.pipe(
      switchMap(user => {
        this.id = user?.id ?? 0;
        console.log('ID de usuario:', this.id);
        return this.emprendimientoService.getAll();
      })
    ).subscribe(emprendimientos => {
      this.emprendimientos = emprendimientos;
      this.emprendimiento = this.emprendimientos.find(e => e.id === this.id)??this.emprendimiento;
    });
  }

  getEmprendimientos() {
    this.emprendimientoService.getAll()
      .subscribe(emprendimientos => this.emprendimientos = emprendimientos);

  }

  editEmprendimiento(emprendimiento: Emprendimiento): void {
    this.editing = true;
    this.emprendimientoSeleccionado = emprendimiento;
    this.emprendimientoToEdit = Object.assign({}, emprendimiento);
  }
  onUpdateEmprendimiento(): void {
    this.emprendimientoService.updateEmprendimiento(this.emprendimientoToEdit)
      .subscribe(() => {
        this.emprendimiento = this.emprendimientoToEdit;
        this.editing = false;
        this.emprendimientoToEdit!;
      });
  }


}
