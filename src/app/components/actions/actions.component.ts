import { Component, EventEmitter, Output } from '@angular/core';
import { Acciones } from 'src/app/dto/Isla';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  public infra: number;
  public edu: number;
  public interno: number;
  public tec: number;
  public mili: number;
  public serv: number;

  public size: number;
  public md: boolean;
  
  @Output('turno') turno = new EventEmitter<Acciones>();

  constructor(){
    this.infra = 0;
    this.edu = 0;
    this.interno = 0;
    this.tec = 0;
    this.mili = 0;
    this.serv = 0;
    this.size = window.innerWidth < window.innerHeight ? window.innerWidth: window.innerHeight;
    this.md = window.innerWidth < window.innerHeight;
  }

  add(filter: number){
    switch(filter){
      case 1:
        this.infra++;
      break;
      case 2:
        this.edu++;
      break;
      case 3:
        this.interno++;
      break;
      case 4:
        this.tec++;
      break;
      case 5:
        this.mili++;
      break;
      case 6:
        this.serv++;
      break;
    }
  }

  rem(filter: number){
    switch(filter){
      case 1:
        this.infra = 0;
      break;
      case 2:
        this.edu = 0;
      break;
      case 3:
        this.interno = 0;
      break;
      case 4:
        this.tec = 0;
      break;
      case 5:
        this.mili = 0;
      break;
      case 6:
        this.serv = 0;
      break;
    }
  }

  terminarTurno(){
    let act: Acciones = new Acciones();
    act.Infraestructura = this.infra;
    act.educacion = this.edu;
    act.inversion_interna = this.interno;
    act.militar = this.mili;
    act.servicios = this.serv;
    act.tecnologia = this.tec;
    this.infra = 0;
    this.edu = 0;
    this.interno = 0;
    this.mili = 0;
    this.serv = 0;
    this.tec = 0;
    this.turno.emit(act);
  }
}
