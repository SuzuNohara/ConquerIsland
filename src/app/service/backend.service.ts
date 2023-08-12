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

  public getRanking(): Promise<Puntuacion[]>{
    let puntuacion: Puntuacion[] = [];
    return new Promise((resolve) => {
      this.data.getCollection(environment.puntuaciones).then((data) => {
        let dats = data.docs.map(doc => doc.data());
        for(let i = 0; i < dats.length; i++){
          let dat = dats[i];
          let user: Puntuacion = new Puntuacion();
          user.nombre = dat['nombre'];
          user.opinion = dat['opinion'];
          user.turnos = dat['turnos'];
          puntuacion.push(user);
        }
        this.quickSort(puntuacion, 0, puntuacion.length - 1);
        resolve(puntuacion);
      });
    });
  }

  public getScore(puntuaciones: Puntuacion[]): Promise<Puntuacion[]>{
    return new Promise((resolve) => {
      this.quickSort(puntuaciones, 0, puntuaciones.length - 1);
      resolve(puntuaciones);
    });
  }
  
  private quickSort(arr: Puntuacion[], low: number, high: number)
   {
       if(low < high)
       {
           const p = this.partition(arr, low, high);

           this.quickSort(arr, low, p - 1);
           this.quickSort(arr, p + 1, high);
       }
   }

   private partition(arr: Puntuacion[], low: number, high: number) : number
   {
       const pivot = arr[high];
       let i = low;
       for(let j = low; j < high; j++)
       {
           if(arr[j].turnos < pivot.turnos)
           {
               this.swap(arr, i, j);
               i++;
           }
       }
       this.swap(arr, i, high);
       return i;
   }

   private swap(arr: Puntuacion[], a: number, b: number)
   {
       const tmp = arr[a];
       arr[a] = arr[b];
       arr[b] = tmp;
   }

}
