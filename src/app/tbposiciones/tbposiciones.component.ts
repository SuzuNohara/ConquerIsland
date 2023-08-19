import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { environment } from 'src/environments/environment';
import { BackendService } from '../service/backend.service';
import { Puntuacion } from '../dto/data';

@Component({
  selector: 'app-tbposiciones',
  templateUrl: './tbposiciones.component.html',
  styleUrls: ['./tbposiciones.component.scss'],
})
export class TBposicionesComponent implements OnInit {
  public ranking: Puntuacion[];
  itemsPerPage = 10;
  currentPage = 0;

  constructor(private back: BackendService) {
    this.ranking = [];
  }

  ngOnInit() {
    this.loadRanking(); //Se cargan datos iniciales
  }

  loadRanking() {
    //Se obtienne los datos del ranking
    this.back.getRanking().then((data: Puntuacion[]) => {
      this.ranking = data;
    });
  }

  onPageChange(newPage: number) {
    this.currentPage = newPage; //Establecemos la pagina actual
  }

  getCurrentPageItems() {
    //Hago el cálculo de los elmentos del arreglo que se colocan en la pagina actual
    const startIndex = this.currentPage * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage; //endIndex no se incluye en el slice

    const partialRaking = this.ranking.slice(startIndex, endIndex);
    return partialRaking; //Devuelvo el subarreglo de elementos según la página
  }

  getPaginationArray() {
    //Cuenta el número de páginas
    const pageCount = Math.ceil(this.ranking.length / this.itemsPerPage); //Calculo y redondeo

    const pagesArray = Array.from({ length: pageCount }, (_, index: number) => index); //Devuelve un array de número de pagina con longitud pageCout
    return pagesArray;
  }
}
