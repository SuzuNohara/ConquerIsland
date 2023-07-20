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
  public banner: boolean;
  public startgame: boolean;
  @ViewChild(IslaComponent) isComp!: IslaComponent;

  constructor(private game: GameService) {
    this.isla = new Isla();
    this.actions = new Acciones();
    this.isla.inversion = new Controles_Isla();
    this.isla.inversion.produccion_interna = new Produccion();
    this.isla.poblacion = 1;
    this.isla.inversion.produccion_interna.tecnologia = 0;
    this.isla.inversion.infraestructura = 0;
    this.banner = true;
    this.startgame = true;
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
  openCity(event: MouseEvent, cityName: string): void {
    const currentTarget = event.currentTarget as HTMLElement;
    if (currentTarget) {
      currentTarget.className += " active";
    }
    
    const tabcontent = document.getElementsByClassName("tabcontent") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    
    const tablinks = document.getElementsByClassName("tablinks") as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    
    const cityElement = document.getElementById(cityName);
    if (cityElement) {
      cityElement.style.display = "block";
    }
  }
  
  public terminarTurno(){
    if(this.game.Comprobar(this.isla, this.actions)){
      this.isla = this.game.turno(this.isla, this.actions);
      this.isComp.updateIsla(this.isla);
      this.actions = new Acciones();
      if(!this.isla.isla_viva){
        this.gameOver();
      }
      if(this.isla.victoria){
        this.victoria();
      }
    }else{
      alert("No tienes los recursos suficientes para realizar esta accion");
    }
  }

  public newGame(){
    this.banner = false;
    this.startgame = false;
    this.isla = new Isla();
    this.isComp.updateIsla(this.isla);
    this.actions = new Acciones();
    // this.game.test();
  }

  public gameOver(){
    this.banner = true;
  }

  public victoria(){
    this.banner = true;
  }

  public upval(act: number, inc: number){
    switch(act){
      case 0:
        this.actions.Infraestructura += inc;
        if(this.actions.Infraestructura < 0){
          this.actions.Infraestructura = 0;
        }
      break;
      case 1:
        this.actions.educacion += inc;
        if(this.actions.educacion < 0){
          this.actions.educacion = 0;
        }
      break;
      case 2:
        this.actions.inversion_interna += inc;
        if(this.actions.inversion_interna < 0){
          this.actions.inversion_interna = 0;
        }
      break;
      case 3:
        this.actions.tecnologia += inc;
        if(this.actions.tecnologia < 0){
          this.actions.tecnologia = 0;
        }
      break;
      case 4:
        this.actions.militar += inc;
        if(this.actions.militar < 0){
          this.actions.militar = 0;
        }
      break;
      case 5:
        this.actions.servicios += inc;
        if(this.actions.servicios < 0){
          this.actions.servicios = 0;
        }
      break;
    }
  }
}

