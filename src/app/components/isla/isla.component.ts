import { Component, Input, OnInit } from '@angular/core';
import { Produccion, Controles_Isla, Isla } from 'src/app/dto/Isla';

@Component({
  selector: 'app-isla',
  templateUrl: './isla.component.html',
  styleUrls: ['./isla.component.scss']
})
export class IslaComponent implements OnInit {

  public isla: Isla;

  public size: number;
  public orientation: string;// true = celular, false = laptop

  @Input() status: Isla;

  constructor() {
    this.isla = new Isla();
    // parametros de testing
    this.status = new Isla();
    this.size = window.innerWidth < window.innerHeight ? window.innerWidth: window.innerHeight;
    this.orientation = window.innerWidth < window.innerHeight? 'vw': 'vh';
  }

  ngOnInit() {
    this.updateIsla(this.status);
  }

  public updateIsla(newIsla: Isla){
    this.isla = newIsla;
    // this.isla.poblacion = this.status.poblacion;
    // this.isla.inversion.produccion_interna.tecnologia = this.status.inversion.produccion_interna.tecnologia;
    // this.isla.inversion.infraestructura = this.status.inversion.infraestructura;
  }
}