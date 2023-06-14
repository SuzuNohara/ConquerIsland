import { Component, Input, OnInit } from '@angular/core';
import { Isla } from 'src/app/dto/Isla';

@Component({
  selector: 'app-isla',
  templateUrl: './isla.component.html',
  styleUrls: ['./isla.component.scss']
})
export class IslaComponent implements OnInit{

  public isla: Isla;

  @Input() status: Isla;

  constructor() {
    this.isla = new Isla();
    this.status = new Isla();
  }

  ngOnInit() {
    this.isla.poblacion = this.status.poblacion;
    this.isla.tecnologia = this.status.tecnologia;
    this.isla.infra = this.status.infra;
  }
}
