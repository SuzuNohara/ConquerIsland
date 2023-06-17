import { Component, OnInit, ViewChild } from '@angular/core';
import { Acciones, Controles_Isla, Isla, Produccion } from 'src/app/dto/Isla';
import { IslaComponent } from '../isla/isla.component';
import { GameService } from 'src/app/service/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public isla: Isla;
  public actions: Acciones;
  @ViewChild(IslaComponent) isComp!: IslaComponent;

  constructor(private game: GameService) {
    this.isla = new Isla();
    this.actions = new Acciones();
    this.isla.inversion = new Controles_Isla();
    this.isla.inversion.produccion_interna = new Produccion();
    this.isla.poblacion = 1;
    this.isla.inversion.produccion_interna.tecnologia = 10;
    this.isla.inversion.infraestructura = 1;
  }// funcion de isla inicial (parametros iniciales de la isla)

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

  public terminarTurno(){
    // el usuario selecciona sus acciones del turno
    // se llama la funcion de juego para que procese el turno
    this.isla = this.game.turno(this.isla, this.actions);
    // se obtiene la isla con informacion actualizada
    // esta informacion se manda al componente de isla
    this.isComp.updateIsla(this.isla);
  }
}

