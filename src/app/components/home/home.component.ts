import { Component, OnInit } from '@angular/core';
import { Isla_Proto } from 'src/app/dto/Isla';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  public isla: Isla_Proto;

  constructor() {
    this.isla = new Isla_Proto();
    this.isla.poblacion = 1;
    this.isla.tecnologia = 10;
    this.isla.infra = 1;
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

