import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { IslandComponent } from './components/util/island/island.component';
import { FormsModule } from '@angular/forms';
import { IslaComponent } from './components/isla/isla.component';
import { PersonaComponent } from './isla/persona/persona.component';
import { TecnologiaComponent } from './isla/tecnologia/tecnologia.component';
import { GuiadejuegoComponent } from './guiadejuego/guiadejuego.component';
import { InfoComponent } from './components/info/info.component';
import { ActionsComponent } from './components/actions/actions.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    IslandComponent,
    IslaComponent,
    PersonaComponent,
    TecnologiaComponent,
    GuiadejuegoComponent,
    InfoComponent,
    ActionsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
