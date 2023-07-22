import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { GuiadejuegoComponent } from './guiadejuego/guiadejuego.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'guiadejuego', component: GuiadejuegoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }