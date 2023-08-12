import { Component } from '@angular/core';
import { Isla } from 'src/app/dto/Isla';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss']
})
export class InfoComponent {

    public isla: Isla;

    constructor() {
      this.isla = new Isla();
    }

    public updateIsla( isla: Isla){
      this.isla = isla;
    }
}
