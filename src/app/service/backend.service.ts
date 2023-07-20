import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';
import { Puntuacion } from '../dto/data';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private data: DataService) { }

  public saveScore(nombre: string, puntuacion: number): Promise<boolean>{
    let punt: Puntuacion = new Puntuacion();
    punt.nombre = nombre;
    punt.turnos = puntuacion;
    return new Promise((resolve) => {
      this.data.addDocument(environment.puntuaciones, JSON.parse(JSON.stringify(punt))).then(() => {
        resolve(true);
      }).catch((error) => {
        console.log(error);
        resolve(false);
      })
    });
  }

  public getScore(){

  }
}
