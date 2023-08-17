import { Component, Input } from '@angular/core';
import { Isla } from 'src/app/dto/Isla';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

  @Input() status: Isla;
  public md: boolean;
  public size: number;
  public orientation: string;

  constructor() {
    this.status = new Isla();
    this.md = true;
    this.size = window.innerWidth < window.innerHeight ? window.innerWidth: window.innerHeight;
    this.orientation = window.innerWidth < window.innerHeight? 'vw': 'vh';
  }

  public updateIsla( isla: Isla){
    this.status = isla;
  }
}
