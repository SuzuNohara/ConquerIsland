import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private data: DataService) { }

  public saveScore(nombre: string, puntuacion: number): Promise<boolean>{
    return new Promise((resolve) => {
      this.data.addDocument(environment.puntuaciones, {nombre: nombre, turnos: puntuacion}).then(() => {
        resolve(true);
      }).catch((error) => {
        console.log(error);
        resolve(false);
      })
    });
  }
}
