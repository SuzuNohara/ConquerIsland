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

  public getScore(puntuaciones: Puntuacion[]): Promise<Puntuacion[]>{
    return new Promise((resolve) => {
      this.quickSort(puntuaciones);
      resolve(puntuaciones);
    });
  }
  
  private quickSort(arr: Puntuacion[]): Puntuacion[] {
    if (arr.length <= 1) {
      return arr;
    }
  
    const pivot = arr[0];
    const left = [];
    const right = [];
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i].turnos < pivot.turnos) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    } 
    return [...this.quickSort(left), pivot, ...this.quickSort(right)];
  }

}
