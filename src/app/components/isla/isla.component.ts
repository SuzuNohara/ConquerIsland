import { Component, Input, OnInit } from '@angular/core';
import { Isla_Proto } from 'src/app/dto/Isla';

@Component({
  selector: 'app-isla',
  templateUrl: './isla.component.html',
  styleUrls: ['./isla.component.scss']
})
export class IslaComponent implements OnInit{

  public isla: Isla_Proto;

  @Input() status: Isla_Proto;

  constructor() {
    this.isla = new Isla_Proto();
    this.status = new Isla_Proto();
  }

  ngOnInit() {
    this.isla.poblacion = this.status.poblacion;
    this.isla.tecnologia = this.status.tecnologia;
    this.isla.infra = this.status.infra;
  }
}
