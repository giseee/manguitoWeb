import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categorias } from '../_models/categorias';
import { CategoriasService } from '../_services/categoria.service'


@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss']
})
export class CategoriaComponent {

  categorias: Categorias[] = [];
  newCategory: Categorias = new Categorias();
  editing: boolean = false;
  categoryToEdit: Categorias = new Categorias();

  constructor(private categoriaService: CategoriasService) { }

  ngOnInit() {
    this.getCategorias();
  }

  getCategorias() {
    this.categoriaService.getAll()
      .subscribe(categorias => this.categorias = categorias);
  }


  onSubmit(categoryForm: NgForm): void {
    this.categoriaService.postCategoria(this.newCategory)
      .subscribe(categoria => {
        this.categorias.push(categoria);
        this.newCategory = new Categorias();
        categoryForm.resetForm();
      });
  }

  deleteCategory(categoria: Categorias): void {
      this.categoriaService.delCategoriaById(categoria.id!)
      .subscribe(() => {
        this.categorias= this.categorias.filter((c: Categorias) => c !== categoria);
      });
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.categoriaService.addCategory({ name } as unknown as Categorias)
      .subscribe(category => {
        this.categorias.push(category);
      });
  }


  editCategory(category: Categorias): void {
    this.editing = true;
    this.categoryToEdit = Object.assign({}, category);
  }

  cancelEdit(): void {
    this.editing = false;
    this.categoryToEdit = new Categorias();
  }

  onUpdateCategory(): void {
    this.categoriaService.updateCategory(this.categoryToEdit)
      .subscribe(() => {
        const index = this.categorias.findIndex(c => c.id === this.categoryToEdit.id);
        this.categorias[index] = this.categoryToEdit;
        this.editing = false;
        this.categoryToEdit = new Categorias();
      });
  }
}

