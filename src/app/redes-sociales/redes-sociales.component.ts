import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RedSocial } from '../_models/redSocial';
import { RedSocialService } from '../_services/redSocial.service';

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

  constructor(private redService:RedSocialService) { }
  ngOnInit() {
    this.getRedSocial();
  }

  getRedSocial() {
    this.redService.getAll()
      .subscribe(redSocial => this.redSocial = redSocial);
  }


  onSubmit(redSocialForm: NgForm): void {
    this.redService.postRedSocial(this.newRedSocial)
      .subscribe(redSocial => {
        this.redSocial.push(redSocial);
        this.newRedSocial = new RedSocial();
        redSocialForm.resetForm();
      });
  }

  deleteRedSocial(redSocial:RedSocial): void {
      this.redService.delRedSocialById(redSocial.id!)
      .subscribe(() => {
        this.redSocial= this.redSocial.filter((c: RedSocial) => c !== redSocial);
      });
  }
  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.redService.addRedSocial({ name } as unknown as RedSocial)
      .subscribe(redSocial => {
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
      .subscribe(() => {
        const index = this.redSocial.findIndex(c => c.id === this.redSocialToEdit.id);
        this.redSocial[index] = this.redSocialToEdit;
        this.editing = false;
        this.redSocialToEdit = new RedSocial();
      });
  }

}
