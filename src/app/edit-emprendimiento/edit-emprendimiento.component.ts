import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, catchError, finalize, map, switchMap } from 'rxjs';
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
import { AlertService } from '../_alert';

@Component({
  selector: 'app-edit-emprendimiento',
  templateUrl: './edit-emprendimiento.component.html',
  styleUrls: ['./edit-emprendimiento.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditEmprendimientoComponent implements OnInit {

  dropdownListCategorias: any;
  editing: boolean = false;
  mensaje: string = '';
  formData = new FormData();
  imageURL: any;

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
    private http: HttpClient,
    public alertService: AlertService,
  ) { }

  ngOnInit(): void {    
    //Cargo las categorías 
    this.getCategorias();
    //Cargo el emprendimiento si lo tiene
    this.authService.currentUsuario$.pipe(
      map((user) => {
        //Cargo el formulario con el usuario    
        if (user?.id_emprendimiento) {
          this.emprendimientoService.getEmprendimientoById(user.id_emprendimiento).pipe(
            map((emprendimiento) => {
              this.imageURL = emprendimiento.banner;
              this.formEmprendimiento.patchValue(emprendimiento as any);
            })
          ).subscribe();
        }
      })
    ).subscribe();
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
  }

  onCreateEmprendimiento() {
    this.editing = true;
    this.formData.append('emprendimiento', new Blob([JSON.stringify(this.formEmprendimiento.value)], {type: "application/json"}));
    this.emprendimientoService.create(this.formData).pipe(   
      finalize(() => {
        this.editing = false;         
        this.router.navigateByUrl('/');
        this.handleSucceed();
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handleUnauthorized();
          return EMPTY;
        }
        if (error.status === 500) {
          this.handleServerError();
          return EMPTY;
        }
        throw error;
      })
    ).subscribe(); 
  }

  onUpdateEmprendimiento() {
    this.editing = true;
    var emprendimiento = JSON.parse(JSON.stringify(this.formEmprendimiento.value)) as Emprendimiento;    
    let text = emprendimiento.id.toString();
    this.formData.append('id',text);
    this.formData.append('emprendimiento', new Blob([JSON.stringify(this.formEmprendimiento.value)], {type: "application/json"}));
    this.emprendimientoService.putEmprendimiento(this.formData).pipe(   
      finalize(() => {
        this.editing = false;         
        this.router.navigateByUrl('/');
        this.handleSucceed();
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handleUnauthorized();
          return EMPTY;
        }
        if (error.status === 500) {
          this.handleServerError();
          return EMPTY;
        }
        throw error;
      })
    ).subscribe(); 
  }

  handleServerError() {
    let options = {
      autoClose: true,
      keepAfterRouteChange: false
  };
    this.alertService.error('No se pudo actualizar el emprendimiento.', options);
  }

  handleSucceed() {
    let options = {
      autoClose: true,
      keepAfterRouteChange: false
  };
    this.alertService.success('El emprendimiento se ha actualizado de forma exitosa.', options);
  }

  handleUnauthorized() {
    this.formEmprendimiento.setErrors({ unauthorized: true });
    this.cdr.markForCheck();
  }

  loadImage(event: any){
    const file = event.files[0];
    if (file) {
      this.formData.append('archivoImagen', file);
    }
  }

  clearImage(){
    this.formData.delete('archivoImagen');
  }

  // Image Preview
  showPreview(event: any) {
    const file = event.files[0];
    this.formEmprendimiento.patchValue({
      banner: file
    });
    this.formEmprendimiento.get('banner')!.updateValueAndValidity()
    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(file)
  }

  hidePreview(){
    this.imageURL = null;
    this.formEmprendimiento.get('banner')?.setValue(null);
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

  get banner() { return this.formEmprendimiento.get('banner')}
}
