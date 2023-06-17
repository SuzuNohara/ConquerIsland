import { Component, OnInit } from '@angular/core';
import { Controles_Isla, Isla, Produccion } from 'src/app/dto/Isla';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public isla: Isla;
  public produccion: Produccion;
  public controIsla: Controles_Isla;

  constructor() {
    this.isla = new Isla();
    this.produccion = new Produccion();
    this.controIsla = new Controles_Isla();
    this.isla.poblacion = 1;
    this.produccion.tecnologia = 10;
    this.controIsla.infraestructura = 1;
  }

  ngOnInit(): void {
    
  }

  openNav(): void {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) {
      mobileMenu.style.width = "100%";
    }
  }
  closeNav(): void {
    const mobileMenu = document.getElementById("mobile-menu");
    if (mobileMenu) {
      mobileMenu.style.width = "0%";
    }
  }
}

