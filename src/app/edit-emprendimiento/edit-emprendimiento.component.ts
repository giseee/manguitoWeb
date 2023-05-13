import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, catchError, map, switchMap } from 'rxjs';
//import { Emprendimiento } from '../_interfaces/emprendimiento';
import { AuthenticationService } from '../_services';
import { EmprendimientoService } from '../_services/emprendimiento.service';
import { UsuarioService } from '../_services/usuario.service';
import { Router } from '@angular/router';
import { Emprendimiento } from '../_models/emprendimiento';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Categoria } from '../_models/categoria'
import { RedSocial } from '../_models/redSocial';
import { environment } from 'src/environments/environments';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CategoriasService } from '../_services/categoria.service';

@Component({
  selector: 'app-edit-emprendimiento',
  templateUrl: './edit-emprendimiento.component.html',
  styleUrls: ['./edit-emprendimiento.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEmprendimientoComponent implements OnInit {

  dropdownListCategorias: any;
  dropdownSettings: any;
  selectedItems = [];


  emprendimiento!: Emprendimiento;
  editing: boolean = false;
  mensaje: string = '';
  categorias: Categoria[] = [];
  redeSociales: RedSocial[] = [];
  categoriasSeleccionadas!: string[];

  formEmprendimiento = new FormGroup({
    id: new FormControl('', {      
      nonNullable: false,
    }),
    id_usuario: new FormControl('', {      
      nonNullable: true,
    }),
    nombreEmprendimiento: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    descripcion: new FormControl('', {      
      nonNullable: false,
    }),
    banner: new FormControl('', {      
      nonNullable: false,
    }),
    manguitosRecibidos: new FormControl( 0 , {
      nonNullable: false,
    }),
    mostrarManguitos: new FormControl( false , {
      nonNullable: false,
    }),
    mostrarTopDonadores: new FormControl( false , {
      nonNullable: false,
    }),
    redeSociales: new FormControl( [] , {
      nonNullable: false,
    }),
    categorias: new FormControl( [] , {
      nonNullable: false,
    }),
    donaciones: new FormControl( [] , {
      nonNullable: false,
    }),
    montoManguito: new FormControl( 0 , {
      validators: [Validators.required],
      nonNullable: true,
    })
  });

  constructor(private router: Router,
    private authService: AuthenticationService,
    private emprendimientoService: EmprendimientoService,
    private categoriasService: CategoriasService,
    private cdr: ChangeDetectorRef,
    private http: HttpClient
  ) { }

  ngOnInit(): void {    
    //Cargo las categorías y configuro el control multiselect
    this.getCategorias();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'nombreCategoria',      
      selectAllText: 'Seleccionar todo',
      unSelectAllText: 'Deseleccionar todo'
    };

    this.authService.currentUsuario$.pipe(
      map((user) => {
        //Cargo el formulario con el usuario    
        if (user?.id_emprendimiento) {
          this.emprendimientoService.getEmprendimientoById(user.id_emprendimiento).pipe(
            map((emprendimiento) => {
              this.formEmprendimiento.patchValue(emprendimiento as any);
              //Selecciono las categorias del emprendimiento
              //this.selectedItems = emprendimiento.categorias;
              console.log(this.formEmprendimiento.value);
            })
          ).subscribe();
        }
      })
    ).subscribe();
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
    this.categoriasService.getAll().pipe(
      map((categorias) =>{
        this.dropdownListCategorias = categorias
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          //this.handleUnauthorized();
          return EMPTY;
        }
        throw error;
      })
    ).subscribe();

    // this.http.get<Categoria[]>(`${environment.url}/api/categorias`).subscribe(response => {
    //   this.dropdownListCategorias = response;
    // });
  }

  get f() {
    return this.formEmprendimiento.controls;
  }

  onItemSelect($event: any){
    console.log(this.dropdownListCategorias);
    console.log(this.formEmprendimiento.get('categorias')?.value);
    //console.log(this.selectedItems);

    // let data = this.dropdownListCategorias;
    // let selectedItem = data.filter((item: { id: any; }) => item.id == $event.id);
    // let selectedItemid = selectedItem[0]['id'];
    // this.dropdownListCategorias = data.map((item: { id: any; isDisabled: boolean; }) => {
    //   if(item.id == selectedItemid){
    //     item.isDisabled = false;
    //   } else {
    //     item.isDisabled = true;
    //   }
    //   return item;
    // })
  }

  onItemDeSelect(){
    // if(this.selectedItems && this.selectedItems.length == 0){
    //   this.dropdownListCategorias = this.dropdownListCategorias.map((item: { isDisabled: boolean; }) => {
    //     item.isDisabled = false;
    //     return item;
    //   })
    // }
  }

  onCreateEmprendimiento() {
    // this.emprendimientoToEdit.id = this.idUsuario;
    // this.emprendimientoService.create(this.emprendimientoToEdit).subscribe(data => {
    //   this.mensaje = "Emprendimiento creado exitosamente";
    //   setTimeout(() => {
    //     this.router.navigate(['/']);
    //   }, 1000); // Esperar 1 segundo antes de redirigir al usuario
    // });
  }

  onUpdateEmprendimiento() {
    // this.emprendimientoService.putEmprendimiento(this.emprendimientoToEdit).subscribe(() => {
    //   console.log('Emprendimiento actualizado!');
    //   // Puedes hacer algo aquí si quieres
    // });
  }

  uploadImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      //en el response tengo el link que permite ver la imagen.
      //ese link tendria que estar en el emprendimiento
      //https://www.youtube.com/watch?v=oruiytokUwo
    }

  }
}
