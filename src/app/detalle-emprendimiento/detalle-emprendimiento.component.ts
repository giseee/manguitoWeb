import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Emprendimiento } from '../_models/emprendimiento';
import { EmprendimientoService } from '../_services/emprendimiento.service';

@Component({
  selector: 'app-detalle-emprendimiento',
  templateUrl: './detalle-emprendimiento.component.html',
  styleUrls: ['./detalle-emprendimiento.component.scss']
})
export class DetalleEmprendimientoComponent implements OnInit {

  emprendimiento: any;
  id!: String;
  error!: String;
  constructor(private route: ActivatedRoute, private emprendimientoService: EmprendimientoService){
    this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
  }

  ngOnInit(): void {
    console.log(this.id);
    this.emprendimientoService.getPorID(this.id).subscribe(
      emprendimientos=> {
        this.emprendimiento =emprendimientos;
        console.log("Es el Emprendimiento ", this.emprendimiento.nombreEmprendimiento);
      }

    )
  }

}
