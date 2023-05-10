import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
//import { Emprendimiento } from '../_interfaces/emprendimiento';
import { AuthenticationService } from '../_services';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { UsuarioService } from '../_services/usuario.service';
import { Router } from '@angular/router';
import { Emprendimiento } from '../_models/emprendimiento';
import { HttpClient } from '@angular/common/http';
import {Categoria } from '../_models/categoria'
import { RedSocial } from '../_models/redSocial';
import { environment } from 'src/environments/environments';

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
  categorias: Categoria[] = [];
  redeSociales: RedSocial[] = [];
  constructor(private router: Router,
    private authService: AuthenticationService,
    private emprendimientoService: EmprendimientoService,
    private http: HttpClient
  ) {}

    categoriasSeleccionadas!: string[];
  ngOnInit(): void {
    this.getCategorias()

    //********se podría anidar de ésta manera */
    // this.userService.getUser().pipe(
    //   tap(u => this.user = u),
    //   flatMap(u => this.userService.getPreferences(u.username))
    // ).subscribe(p => this.preferences = p);

    this.idUsuario=this.authService.getCurrentUserId();
      this.emprendimientoService.getEmprendimientosPorUsuario(this.idUsuario).subscribe(
      (emprendimiento: Emprendimiento) => {
        this.emprendimientoToEdit = emprendimiento;
         // Agregar las categorías seleccionadas al objeto emprendimientoToEdit
    this.emprendimientoToEdit.categorias = this.categorias.filter(categoria => this.emprendimientoToEdit.categorias.some(cat => cat.id === categoria.id));
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
        this.categoriasSeleccionadas = this.emprendimientoToEdit.categorias.map(categoria => categoria.nombreCategoria);

  }
  onCategoriaChange(event: any) {
    if (event.target.checked) {
      this.categoriasSeleccionadas.push(event.target.value);
    } else {
      const index = this.categoriasSeleccionadas.indexOf(event.target.value);
      if (index !== -1) {
        this.categoriasSeleccionadas.splice(index, 1);
      }
    }
  }


  getCategorias(): void {
    this.http.get<Categoria[]>(`${environment.url}/api/categorias`).subscribe(response => {
      this.categorias = response;
    });
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

  uploadImage(event: any){
    const file = event.target.files[0];
    if(file){
      const formData = new FormData();
      formData.append('file', file);
      //en el response tengo el link que permite ver la imagen.
      //ese link tendria que estar en el emprendimiento
      //https://www.youtube.com/watch?v=oruiytokUwo
    }
    
  }
}
