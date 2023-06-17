import { Component, Input, OnInit } from '@angular/core';
import { Produccion, Controles_Isla, Isla } from 'src/app/dto/Isla';

@Component({
  selector: 'app-isla',
  templateUrl: './isla.component.html',
  styleUrls: ['./isla.component.scss']
})
export class IslaComponent implements OnInit {

  public isla: Isla;
  public produccion: Produccion;
  public controIsla: Controles_Isla;

  @Input() status: Isla;
  @Input() statusP: Produccion;
  @Input() statusCI: Controles_Isla;

  constructor() {
    this.isla = new Isla();
    this.produccion = new Produccion();
    this.controIsla = new Controles_Isla();
    this.status = new Isla();
    this.statusP = new Produccion();
    this.statusCI = new Controles_Isla();
  }

  ngOnInit() {
    this.isla.poblacion = this.status.poblacion;
    this.produccion.tecnologia = this.statusP.tecnologia;
    this.controIsla.infraestructura = this.statusCI.infraestructura;
  }
}