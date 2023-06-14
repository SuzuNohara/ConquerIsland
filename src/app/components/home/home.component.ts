import { Component, OnInit } from '@angular/core';
import { Isla } from 'src/app/dto/Isla';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public isla: Isla;

  constructor() {
    this.isla = new Isla();
    this.isla.poblacion = 1;
    this.isla.tecnologia = 2;
    this.isla.infra = 2;
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

