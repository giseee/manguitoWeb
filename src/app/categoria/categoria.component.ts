import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria } from '../_models/categoria';
import { CategoriasService } from '../_services/categoria.service'
import { EMPTY, catchError, finalize, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../_alert';


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

  categorias: Categoria[] = [];
  newCategory: Categoria = new Categoria();
  editing: boolean = false;
  categoryToEdit: Categoria = new Categoria();

  constructor(
    private categoriaService: CategoriasService,
    public alertService: AlertService,
    ) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getAll()
      .subscribe(categorias => this.categorias = categorias);
  }


  onSubmit(categoryForm: NgForm): void {
    this.categoriaService.postCategoria(this.newCategory)
    .pipe(
      map((categoria) => {
          this.categorias.push(categoria);
          this.newCategory = new Categoria();
          categoryForm.resetForm();
        }
      ),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handleUnauthorized();
          return EMPTY;
        }
        if (error.status === 409) {
          this.handleConflict();
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
  handleConflict() {
    let options = {
      autoClose: true,
      keepAfterRouteChange: false
    };
    this.alertService.error('La categoría ya existe.', options);
  }

  handleUnauthorized() {
    let options = {
      autoClose: true,
      keepAfterRouteChange: false
    };
    this.alertService.error('No tiene permiso para gestionar categorías.', options);
  }

  handleServerError() {
    let options = {
      autoClose: true,
      keepAfterRouteChange: false
    };
    this.alertService.error('No se pudo crear la categoría debido a un error en el servidor.', options);
  }

  deleteCategory(categoria: Categoria): void {
      this.categoriaService.delCategoriaById(categoria.id!)
      .subscribe(() => {
        this.categorias= this.categorias.filter((c: Categoria) => c !== categoria);
      });
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.categoriaService.addCategory({ name } as unknown as Categoria)
      .subscribe(category => {
        this.categorias.push(category);
      });
  }


  editCategory(category: Categoria): void {
    this.editing = true;
    this.categoryToEdit = Object.assign({}, category);
  }

  cancelEdit(): void {
    this.editing = false;
    this.categoryToEdit = new Categoria();
  }

  onUpdateCategory(): void {
    this.categoriaService.updateCategory(this.categoryToEdit)
    .pipe(
      map(() => {
          const index = this.categorias.findIndex(c => c.id === this.categoryToEdit.id);
          this.categorias[index] = this.categoryToEdit;
          this.editing = false;
          this.categoryToEdit = new Categoria();
        }
      ),      
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.handleUnauthorized();
          return EMPTY;
        }
        if (error.status === 409) {
          this.handleConflict();
          return EMPTY;
        }
        if (error.status === 500) {
          this.handleServerError();
          return EMPTY;
        }
        throw error;
      })
    )
      .subscribe();
  }
}

