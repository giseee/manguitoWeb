import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Categoria } from '../_models/categoria';
import { CategoriasService } from '../_services/categoria.service'


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
        this.newCategory = new Categoria();
        categoryForm.resetForm();
      });
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
      .subscribe(() => {
        const index = this.categorias.findIndex(c => c.id === this.categoryToEdit.id);
        this.categorias[index] = this.categoryToEdit;
        this.editing = false;
        this.categoryToEdit = new Categoria();
      });
  }
}

