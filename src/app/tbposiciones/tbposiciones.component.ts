import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { environment } from 'src/environments/environment';
import { BackendService } from '../service/backend.service';
import { Puntuacion } from '../dto/data';

@Component({
  selector: 'app-tbposiciones',
  templateUrl: './tbposiciones.component.html',
  styleUrls: ['./tbposiciones.component.scss']
})
export class TBposicionesComponent implements OnInit {

  public ranking: Puntuacion[];

  constructor(private back: BackendService){
    this.ranking = [];
  }

  ngOnInit() {
    this.back.getRanking().then((data: Puntuacion[]) => {
      this.ranking = data;
      console.log(this.ranking);
    });
  }
}
