import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RedSocial } from '../_models/redSocial';
import { RedSocialService } from '../_services/redSocial.service';
import { EMPTY, catchError, finalize, map } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../_alert';

@Component({
  selector: 'app-redes-sociales',
  templateUrl: './redes-sociales.component.html',
  styleUrls: ['./redes-sociales.component.scss']
})
export class RedesSocialesComponent {
  redSocial: RedSocial[] = [];
  newRedSocial: RedSocial = new RedSocial();
  editing: boolean = false;
  redSocialToEdit: RedSocial = new RedSocial();

  constructor(
    private redService: RedSocialService,
    public alertService: AlertService,
    ) {}

  ngOnInit() {
    this.getRedSocial();
  }

  getRedSocial() {
    this.redService.getAll().subscribe((redSocial) => (this.redSocial = redSocial));
  }

 deleteRedSocial(redSocial: RedSocial): void {
   this.redService.delRedSocialById(redSocial.id!).subscribe(() => {
    this.redSocial = this.redSocial.filter((c: RedSocial) => c !== redSocial);
    });}

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    const newRedSocial = new RedSocial(name);
    this.redService.addRedSocial(newRedSocial).subscribe((redSocial) => {
      this.redSocial.push(redSocial);
    });
  }

  editRedSocial(redSocial: RedSocial): void {
    this.editing = true;
    this.redSocialToEdit = Object.assign({}, redSocial);
  }

  cancelEdit(): void {
    this.editing = false;
    this.redSocialToEdit = new RedSocial();
  }

  onUpdateRedSocial(): void {
    this.redService.updateRedSocial(this.redSocialToEdit)
    .pipe(
      map(() => {
          const index = this.redSocial.findIndex((c) => c.id === this.redSocialToEdit.id);
          this.redSocial[index] = this.redSocialToEdit;
          this.editing = false;
          this.redSocialToEdit = new RedSocial();
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

  onSubmit(redSocialForm: NgForm): void {
    this.redService.addRedSocial(this.newRedSocial)
    .pipe(
      map((redSocial) => {
          this.newRedSocial = new RedSocial();
          redSocialForm.resetForm();
          this.getRedSocial(); 
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

  handleConflict() {
    let options = {
      autoClose: true,
      keepAfterRouteChange: false
    };
    this.alertService.error('La red social ya existe.', options);
  }

  handleUnauthorized() {
    let options = {
      autoClose: true,
      keepAfterRouteChange: false
    };
    this.alertService.error('No tiene permiso para gestionar redes sociales.', options);
  }

  handleServerError() {
    let options = {
      autoClose: true,
      keepAfterRouteChange: false
    };
    this.alertService.error('No se pudo crear la red social debido a un error en el servidor.', options);
  }
}


