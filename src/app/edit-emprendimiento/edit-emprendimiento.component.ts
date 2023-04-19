import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
//import { Emprendimiento } from '../_interfaces/emprendimiento';
import { AuthenticationService } from '../_services';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { UsuarioService } from '../_services/usuario.service';
import { Router } from '@angular/router';
import { Emprendimiento } from '../_models/emprendimiento';

@Component({
  selector: 'app-edit-emprendimiento',
  templateUrl: './edit-emprendimiento.component.html',
  styleUrls: ['./edit-emprendimiento.component.scss']
})
export class EditEmprendimientoComponent implements OnInit {
  @Input() idUsuario!: number;
  emprendimiento!: Emprendimiento;
  editing: boolean = false;
  emprendimientoToEdit: Emprendimiento={
    nombreEmprendimiento: '',
    descripcion: '',
    banner: '',
    categorias: [],
    manguitosRecibidos:0,
    mostrarManguitos:false,
    mostrarTopDonadores:false,
    id:this.idUsuario,
    id_emprendimiento:0,
    redeSociales:[],
    montoManguito:0
   // donaciones: [],
   // redeSocial: []

  };
  emprendimientos: Emprendimiento[] = [];
  mensaje: string='';

  constructor(private router: Router,
    private authService: AuthenticationService,
    private emprendimientoService: EmprendimientoService
  ) {}

  ngOnInit(): void {
    this.idUsuario=this.authService.getCurrentUserId();
    console.log(this.idUsuario);
      this.emprendimientoService.getEmprendimientosPorUsuario(this.idUsuario).subscribe(
      (emprendimiento: Emprendimiento) => {
        this.emprendimientoToEdit = emprendimiento;
      }
    );
    if(!this.emprendimientoToEdit){
      this.emprendimientoToEdit={
        nombreEmprendimiento: '',
        descripcion: '',
        banner: '',
        categorias: [],
        manguitosRecibidos:0,
        mostrarManguitos:false,
        mostrarTopDonadores:false,
        id:this.idUsuario,
        id_emprendimiento:0,
        redeSociales:[],
        montoManguito:0
       // donaciones: [],
       // redeSocial: []

      };
        }

  }


  onCreateEmprendimiento() {
    this.emprendimientoToEdit.id = this.idUsuario;
    this.emprendimientoService.create(this.emprendimientoToEdit).subscribe(data => {
      this.mensaje = "Emprendimiento creado exitosamente";
      setTimeout(() => {
        this.router.navigate(['/']);
      }, 1000); // Esperar 1 segundo antes de redirigir al usuario
    });
  }

  onUpdateEmprendimiento() {
    this.emprendimientoService.putEmprendimiento(this.emprendimientoToEdit).subscribe(() => {
      console.log('Emprendimiento actualizado!');
      // Puedes hacer algo aquí si quieres
    });
  }
}
