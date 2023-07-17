import { Injectable } from '@angular/core';
import { Acciones, Isla } from '../dto/Isla';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  public turno(Isla_actual: Isla, Accion: Acciones): Isla { 
    this.Comprobar(Isla_actual, Accion);
    this.Infraestructura(Isla_actual, Accion);
    this.Educacion(Isla_actual, Accion);
    this.Inversion_int(Isla_actual, Accion);
    this.Produccion_int(Isla_actual, Accion);
    this.Poblacion(Isla_actual);
    this.Truncar(Isla_actual);
    this.gameOver(Isla_actual);
    Isla_actual.victoria = this.victoria(Isla_actual);

    if (Isla_actual.recursos_naturales < 10) {
      Isla_actual.recursos_naturales += 1;
    } else if(Isla_actual.reservas_recursos < 10){
      Isla_actual.reservas_recursos += 1;
    }

    Isla_actual.turno++;
    return Isla_actual;
  }

  public Comprobar(Isla_actual: Isla, Accion: Acciones): boolean {
    let sumaAcciones:number;
    let sumaDinero:number;
    sumaAcciones = Accion.Infraestructura + Accion.educacion + Accion.inversion_interna + Accion.militar + Accion.servicios + Accion.tecnologia;
    sumaDinero = Isla_actual.dinero + 5;

    if(sumaAcciones > sumaDinero || sumaAcciones > Isla_actual.recursos_naturales){
      return false;
    }else{
      return true;
    }
  }

  public Infraestructura(Isla_actual: Isla, Accion: Acciones) { // parametrizado
    //Disminuir dinero y recursos
    if (Isla_actual.dinero <= environment.algoritmo.limites.dinero[1] && Isla_actual.reservas_dinero == environment.algoritmo.limites.reservas_dinero[0]) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= environment.algoritmo.costos_dinero.infraestructura * Accion.Infraestructura;
    } else {
      if(Isla_actual.reservas_dinero > environment.algoritmo.costos_dinero.infraestructura * Accion.Infraestructura){
        Isla_actual.reservas_dinero -= environment.algoritmo.costos_dinero.infraestructura * Accion.Infraestructura;
      }else{
        Isla_actual.dinero -= (environment.algoritmo.costos_dinero.infraestructura * Accion.Infraestructura - Isla_actual.reservas_dinero);
        Isla_actual.reservas_dinero = environment.algoritmo.limites.reservas_dinero[0];
      }
    }

    if (
      Isla_actual.recursos_naturales <= environment.algoritmo.limites.recursos[1] &&
      Isla_actual.reservas_recursos == environment.algoritmo.limites.recursos[0]
    ) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= environment.algoritmo.costos_nat.infraestructura * Accion.Infraestructura;
    } else{
      if(Isla_actual.reservas_recursos > environment.algoritmo.costos_nat.infraestructura * Accion.Infraestructura){
        Isla_actual.reservas_recursos -= environment.algoritmo.costos_nat.infraestructura * Accion.Infraestructura;
        }else{
          Isla_actual.recursos_naturales -= (environment.algoritmo.costos_nat.infraestructura * Accion.Infraestructura - Isla_actual.reservas_recursos);
          Isla_actual.reservas_recursos = environment.algoritmo.limites.reservas_recursos[0];
        }
    }

    if (Isla_actual.poblacion < environment.algoritmo.limites.poblacion[1]) {
      Isla_actual.poblacion += environment.algoritmo.crecimiento.poblacion * Accion.Infraestructura;
      if(Isla_actual.poblacion > environment.algoritmo.limites.poblacion[1]){
        Isla_actual.poblacion = environment.algoritmo.limites.poblacion[1];
      }
    }

    if (Isla_actual.inversion.produccion_interna.alimentos < environment.algoritmo.limites.alimentos[1]) {
      Isla_actual.inversion.produccion_interna.alimentos += environment.algoritmo.crecimiento.alimentos * (Isla_actual.inversion.infraestructura + Accion.Infraestructura); //Aumenta los alimentos por turno
    } else if (Isla_actual.inversion.produccion_interna.alimentos_ex < environment.algoritmo.limites.alimentos[1]) {
      Isla_actual.inversion.produccion_interna.alimentos_ex += environment.algoritmo.crecimiento.alimentos * (Isla_actual.inversion.infraestructura + Accion.Infraestructura);
    }

    if (Isla_actual.inversion.infraestructura < environment.algoritmo.limites.infraestructura[1]){
      Isla_actual.inversion.infraestructura += environment.algoritmo.crecimiento.infraestructura * Accion.Infraestructura;
    }
  }

  public Educacion(Isla_actual: Isla, Accion: Acciones) {
   //PARAMETRIZACIÓN COSTOS DE COSTOS DINERO
   
    if (Isla_actual.dinero <= environment.algoritmo.limites.dinero[1] && Isla_actual.reservas_dinero == environment.algoritmo.limites.reservas_dinero[0]) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= environment.algoritmo.costos_dinero.educacion * Accion.educacion;
    } else {
      if(Isla_actual.reservas_dinero > environment.algoritmo.costos_dinero.educacion * Accion.educacion){
      Isla_actual.reservas_dinero -= environment.algoritmo.costos_dinero.educacion * Accion.educacion;
      }else{
        Isla_actual.dinero -= (environment.algoritmo.costos_dinero.educacion * Accion.educacion) - Isla_actual.reservas_dinero;
        Isla_actual.reservas_dinero = environment.algoritmo.limites.reservas_dinero[0];
      }
    }

    //PARAMETRIZACIÓN COSTOS DE RECURSOS NATURALES

    if (Isla_actual.recursos_naturales <= environment.algoritmo.limites.recursos[1] && Isla_actual.reservas_recursos == environment.algoritmo.limites.reservas_recursos[0]) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= environment.algoritmo.costos_nat.educacion * Accion.educacion;
    } else{
      if(Isla_actual.reservas_recursos > environment.algoritmo.costos_nat.educacion *  Accion.educacion){
        Isla_actual.reservas_recursos -= environment.algoritmo.costos_nat.educacion * Accion.educacion;
        }else{
          Isla_actual.recursos_naturales -= (environment.algoritmo.costos_nat.educacion * Accion.educacion) - Isla_actual.reservas_recursos;
          Isla_actual.reservas_recursos = environment.algoritmo.limites.reservas_recursos[0];
        }
    }

    //Discutir el eliminar esta parte

    if (Isla_actual.inversion.produccion_interna.tecnologia < 10) {
      Isla_actual.inversion.produccion_interna.tecnologia += Accion.educacion;
    } else if (Isla_actual.inversion.produccion_interna.tecnologia_ex < 10) {
      Isla_actual.inversion.produccion_interna.tecnologia_ex +=
        Accion.educacion;
    }

    if (Isla_actual.inversion.educacion < environment.algoritmo.limites.educacion[1]){
      Isla_actual.inversion.educacion += environment.algoritmo.crecimiento.educacion * Accion.educacion;
    }
  }

  public Inversion_int(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
    if (Isla_actual.dinero <= environment.algoritmo.limites.dinero[1] && Isla_actual.reservas_dinero == environment.algoritmo.limites.reservas_dinero[0]) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= environment.algoritmo.costos_dinero.inversion_int * Accion.inversion_interna;
    } else {
      if(Isla_actual.reservas_dinero > environment.algoritmo.costos_dinero.inversion_int * Accion.inversion_interna){
      Isla_actual.reservas_dinero -= environment.algoritmo.costos_dinero.inversion_int * Accion.inversion_interna;
      }else{
        Isla_actual.dinero -= (environment.algoritmo.costos_dinero.inversion_int * Accion.inversion_interna) - Isla_actual.reservas_dinero;
        Isla_actual.reservas_dinero = environment.algoritmo.limites.reservas_dinero[0];
      }
    }

    if (Isla_actual.recursos_naturales <= environment.algoritmo.limites.recursos[1] && Isla_actual.reservas_recursos == environment.algoritmo.limites.reservas_recursos[0]) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= environment.algoritmo.costos_nat.inversion_int * Accion.inversion_interna;
    } else{
      if(Isla_actual.reservas_recursos > environment.algoritmo.costos_nat.inversion_int * Accion.inversion_interna){
        Isla_actual.reservas_recursos -= environment.algoritmo.costos_nat.inversion_int * Accion.inversion_interna;
        }else{
          Isla_actual.recursos_naturales -= (environment.algoritmo.costos_nat.inversion_int * Accion.inversion_interna) - Isla_actual.reservas_recursos;
          Isla_actual.reservas_recursos =environment.algoritmo.limites.reservas_recursos[0];
        }
    }

    if (Isla_actual.poblacion < environment.algoritmo.limites.poblacion[1]) {
      Isla_actual.poblacion += environment.algoritmo.crecimiento.poblacion * Accion.inversion_interna;
    }

    //PARAMETRIZACIÓN CRECIMIENTO DE DINERO

    if (Isla_actual.dinero < environment.algoritmo.limites.dinero[1]) {
      Isla_actual.dinero +=
        environment.algoritmo.crecimiento.dinero *
        (Isla_actual.inversion.inversion_interna + Accion.inversion_interna); //Por turno (discutir con Kike)
      if (Isla_actual.dinero > environment.algoritmo.limites.dinero[1]) {
        Isla_actual.reservas_dinero += Isla_actual.dinero - environment.algoritmo.limites.reservas_dinero[1];
        Isla_actual.dinero = environment.algoritmo.limites.dinero[1];
      }
    } else if (Isla_actual.reservas_dinero < environment.algoritmo.limites.reservas_dinero[1]) {
      Isla_actual.reservas_dinero +=
      environment.algoritmo.crecimiento.dinero *
        (Isla_actual.inversion.inversion_interna + Accion.inversion_interna);
      if (Isla_actual.reservas_dinero > environment.algoritmo.limites.reservas_dinero[1]) {
        Isla_actual.reservas_dinero = environment.algoritmo.limites.reservas_dinero[1];
      }
    }

    if (Isla_actual.inversion.inversion_interna < environment.algoritmo.limites.inversion_int[1]){
      Isla_actual.inversion.inversion_interna += environment.algoritmo.crecimiento.inversion_int * Accion.inversion_interna;
    }
  }

  public Produccion_int(Isla_actual: Isla, Accion: Acciones) {
    this.Tecnologia(Isla_actual, Accion);
    this.Militar(Isla_actual, Accion);
    this.Servicios(Isla_actual, Accion);
  }

  public Tecnologia(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
    if (Isla_actual.dinero <= environment.algoritmo.limites.dinero[1] && Isla_actual.reservas_dinero == environment.algoritmo.limites.reservas_dinero[0]) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= environment.algoritmo.costos_dinero.tecnologia * Accion.tecnologia;
    } else {
      if(Isla_actual.reservas_dinero > environment.algoritmo.costos_dinero.tecnologia * Accion.tecnologia){
      Isla_actual.reservas_dinero -= environment.algoritmo.costos_dinero.tecnologia * Accion.tecnologia;
      }else{
        Isla_actual.dinero -= (environment.algoritmo.costos_dinero.tecnologia * Accion.tecnologia) - Isla_actual.reservas_dinero;
        Isla_actual.reservas_dinero = environment.algoritmo.limites.reservas_dinero[0];
      }
    }

    if (Isla_actual.recursos_naturales <= environment.algoritmo.limites.recursos[1] && Isla_actual.reservas_recursos == environment.algoritmo.limites.reservas_recursos[0]) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= environment.algoritmo.costos_nat.tecnologia * Accion.tecnologia;
    } else{
      if(Isla_actual.reservas_recursos > environment.algoritmo.costos_nat.tecnologia * Accion.tecnologia){
        Isla_actual.reservas_recursos -= environment.algoritmo.costos_nat.tecnologia * Accion.tecnologia;
        }else{
          Isla_actual.recursos_naturales -= (environment.algoritmo.costos_nat.tecnologia * Accion.tecnologia) - Isla_actual.reservas_recursos;
          Isla_actual.reservas_recursos = environment.algoritmo.limites.reservas_recursos[0];
        }
    }

    if(Isla_actual.inversion.produccion_interna.alimentos <= environment.algoritmo.limites.alimentos[1] && Isla_actual.inversion.produccion_interna.alimentos_ex == environment.algoritmo.limites.alimentos_ex[0]){
      Isla_actual.inversion.produccion_interna.alimentos -= environment.algoritmo.costos_alim.tecnologia * Accion.tecnologia; //considero costo de alimentos
    }else{
      if(Isla_actual.inversion.produccion_interna.alimentos_ex > environment.algoritmo.costos_alim.tecnologia * Accion.tecnologia){
        Isla_actual.inversion.produccion_interna.alimentos_ex -= environment.algoritmo.costos_alim.tecnologia * Accion.tecnologia;
      }else{
        Isla_actual.inversion.produccion_interna.alimentos -= (environment.algoritmo.costos_alim.tecnologia * Accion.tecnologia) - Isla_actual.inversion.produccion_interna.alimentos_ex;
        Isla_actual.inversion.produccion_interna.alimentos_ex = environment.algoritmo.limites.alimentos_ex[0];
      }
    }

      if(Isla_actual.inversion.produccion_interna.tecnologia < Isla_actual.inversion.educacion || Isla_actual.inversion.educacion == environment.algoritmo.limites.educacion[1]){
      if (Isla_actual.inversion.produccion_interna.tecnologia < environment.algoritmo.limites.tecnologia[1]){
        Isla_actual.inversion.produccion_interna.tecnologia += environment.algoritmo.crecimiento.tecnologia * Accion.tecnologia;
      }else if (Isla_actual.inversion.produccion_interna.tecnologia_ex < environment.algoritmo.limites.tecnologia_ex[1]){
        Isla_actual.inversion.produccion_interna.tecnologia_ex += environment.algoritmo.crecimiento.tecnologia * Accion.tecnologia;
      }   //considerar a gregar el apartado de tecnología excedente en lugar de crecimiento de tecnologia simplemente
    }
}

  public Militar(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
      if (Isla_actual.dinero <= environment.algoritmo.limites.dinero[1] && Isla_actual.reservas_dinero == environment.algoritmo.limites.reservas_dinero[0]) {
        //agregar el caso de que sea =10
        Isla_actual.dinero -= environment.algoritmo.costos_dinero.militar * Accion.militar;
      } else {
        if(Isla_actual.reservas_dinero > environment.algoritmo.costos_dinero.militar * Accion.militar){
        Isla_actual.reservas_dinero -= environment.algoritmo.costos_dinero.militar * Accion.militar;
        }else{
          Isla_actual.dinero -= (environment.algoritmo.costos_dinero.militar * Accion.militar) - Isla_actual.reservas_dinero;
          Isla_actual.reservas_dinero = environment.algoritmo.limites.reservas_dinero[0];
        }
      }
  
      if (Isla_actual.recursos_naturales <= environment.algoritmo.limites.recursos[1] && Isla_actual.reservas_recursos == environment.algoritmo.limites.reservas_recursos[0]) {
        //agregar el caso de que sea =10
        Isla_actual.recursos_naturales -= environment.algoritmo.costos_nat.militar * Accion.militar;
      } else{
        if(Isla_actual.reservas_recursos > environment.algoritmo.costos_nat.militar * Accion.militar){
          Isla_actual.reservas_recursos -= environment.algoritmo.costos_nat.militar * Accion.militar;
          }else{
            Isla_actual.recursos_naturales -= (environment.algoritmo.costos_nat.militar * Accion.militar) - Isla_actual.reservas_recursos;
            Isla_actual.reservas_recursos = environment.algoritmo.limites.reservas_recursos[0];
          }
      }

      if(Isla_actual.inversion.produccion_interna.alimentos <= environment.algoritmo.limites.alimentos[1] && Isla_actual.inversion.produccion_interna.alimentos_ex == environment.algoritmo.limites.alimentos_ex[0]){
        Isla_actual.inversion.produccion_interna.alimentos -= Accion.militar;
      }else{
        if(Isla_actual.inversion.produccion_interna.alimentos_ex > Accion.militar){
          Isla_actual.inversion.produccion_interna.alimentos_ex -= environment.algoritmo.costos_alim.militar * Accion.militar;
        }else{
          Isla_actual.inversion.produccion_interna.alimentos -= (environment.algoritmo.costos_alim.militar * Accion.militar) - Isla_actual.inversion.produccion_interna.alimentos_ex;
          Isla_actual.inversion.produccion_interna.alimentos_ex = environment.algoritmo.limites.alimentos_ex[0];
        }
      }
      
      if(Isla_actual.inversion.produccion_interna.militar < Isla_actual.inversion.produccion_interna.tecnologia || Isla_actual.inversion.produccion_interna.tecnologia == environment.algoritmo.limites.tecnologia[1]){
      if (Isla_actual.inversion.produccion_interna.militar < environment.algoritmo.limites.militar[1]){
        Isla_actual.inversion.produccion_interna.militar += environment.algoritmo.crecimiento.militar * Accion.militar;
      }else if (Isla_actual.inversion.produccion_interna.militar_ex < environment.algoritmo.limites.militar_ex[1]){
        Isla_actual.inversion.produccion_interna.militar_ex += environment.algoritmo.crecimiento.militar * Accion.militar;
      }
  }
}

  public Servicios(Isla_actual: Isla, Accion: Acciones) {
    if (Isla_actual.dinero <= environment.algoritmo.limites.dinero[1] && Isla_actual.reservas_dinero == environment.algoritmo.limites.reservas_dinero[0]) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= environment.algoritmo.costos_dinero.servicios * Accion.servicios;
    } else {
      if(Isla_actual.reservas_dinero > environment.algoritmo.costos_dinero.servicios * Accion.servicios){
      Isla_actual.reservas_dinero -= environment.algoritmo.costos_dinero.servicios * Accion.servicios;
      }else{
        Isla_actual.dinero -= (environment.algoritmo.costos_dinero.servicios * Accion.servicios) - Isla_actual.reservas_dinero;
        Isla_actual.reservas_dinero = environment.algoritmo.limites.reservas_dinero[0];
      }
    }

    if (Isla_actual.recursos_naturales <= environment.algoritmo.limites.recursos[1] && Isla_actual.reservas_recursos == environment.algoritmo.limites.reservas_recursos[0]) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= environment.algoritmo.costos_nat.servicios * Accion.servicios;
    } else{
      if(Isla_actual.reservas_recursos > environment.algoritmo.costos_nat.servicios * Accion.servicios){
        Isla_actual.reservas_recursos -= environment.algoritmo.costos_nat.servicios * Accion.servicios;
        }else{
          Isla_actual.recursos_naturales -= (environment.algoritmo.costos_nat.servicios * Accion.servicios) - Isla_actual.reservas_recursos;
          Isla_actual.reservas_recursos = environment.algoritmo.limites.reservas_recursos[0];
        }
    }


     if(Isla_actual.inversion.produccion_interna.alimentos < environment.algoritmo.limites.alimentos[1]){   //Servicios me genera alimentos
      Isla_actual.inversion.produccion_interna.alimentos += Isla_actual.inversion.produccion_interna.servicios + (environment.algoritmo.crecimiento.alimentos * Accion.servicios);
      if(Isla_actual.inversion.produccion_interna.alimentos > environment.algoritmo.limites.alimentos[1]){
        Isla_actual.inversion.produccion_interna.alimentos_ex  += (Isla_actual.inversion.produccion_interna.alimentos - environment.algoritmo.limites.alimentos[1]);
        Isla_actual.inversion.produccion_interna.alimentos = environment.algoritmo.limites.alimentos[1];
      }
     }else if(Isla_actual.inversion.produccion_interna.alimentos_ex < environment.algoritmo.limites.alimentos_ex[1]){
      Isla_actual.inversion.produccion_interna.alimentos_ex += Isla_actual.inversion.produccion_interna.servicios + (environment.algoritmo.crecimiento.alimentos * Accion.servicios);
    }

     if (Isla_actual.inversion.produccion_interna.servicios < environment.algoritmo.limites.servicios[1]){
      Isla_actual.inversion.produccion_interna.servicios += environment.algoritmo.crecimiento.servicios * Accion.servicios;
      if(Isla_actual.inversion.produccion_interna.servicios > environment.algoritmo.limites.servicios[1]){
        Isla_actual.inversion.produccion_interna.servicios = environment.algoritmo.limites.servicios[1];
      }
    }
  }

  public Poblacion(Isla_actual: Isla) {
    if (Isla_actual.poblacion > Isla_actual.inversion.produccion_interna.alimentos) {
      Isla_actual.poblacion = Isla_actual.inversion.produccion_interna.alimentos; //Si los alimentos son 0, la poblacion también
      Isla_actual.inversion.produccion_interna.alimentos = environment.algoritmo.limites.alimentos[0];
    } else {
      if(Isla_actual.inversion.produccion_interna.alimentos_ex == environment.algoritmo.limites.alimentos_ex[0]){
        Isla_actual.inversion.produccion_interna.alimentos -= Isla_actual.poblacion; //consumo alimentos
      }else {
        if(Isla_actual.inversion.produccion_interna.alimentos_ex < Isla_actual.poblacion){
          Isla_actual.inversion.produccion_interna.alimentos -= (Isla_actual.poblacion - Isla_actual.inversion.produccion_interna.alimentos_ex);
          Isla_actual.inversion.produccion_interna.alimentos_ex = environment.algoritmo.limites.alimentos_ex[0]; 
        }else{
          Isla_actual.inversion.produccion_interna.alimentos_ex -= Isla_actual.poblacion; 
        } 
      }
    }

    if(Isla_actual.poblacion < environment.algoritmo.limites.poblacion[0]){
      Isla_actual.poblacion = environment.algoritmo.limites.poblacion[0];
    }
  }

  public Truncar(Isla_actual: Isla){

    if(Isla_actual.poblacion > environment.algoritmo.limites.poblacion[1]){
      Isla_actual.poblacion = environment.algoritmo.limites.poblacion[1];
    }

    if(Isla_actual.inversion.educacion > environment.algoritmo.limites.educacion[1]){
      Isla_actual.inversion.educacion = environment.algoritmo.limites.educacion[1];
    }

    if(Isla_actual.inversion.infraestructura > environment.algoritmo.limites.infraestructura[1]){
      Isla_actual.inversion.infraestructura = environment.algoritmo.limites.infraestructura[1];
    }

    if(Isla_actual.inversion.inversion_interna > environment.algoritmo.limites.inversion_int[1]){
      Isla_actual.inversion.inversion_interna = environment.algoritmo.limites.inversion_int[1];
    }

    if(Isla_actual.inversion.produccion_interna.alimentos > environment.algoritmo.limites.alimentos[1]){
      Isla_actual.inversion.produccion_interna.alimentos_ex += (Isla_actual.inversion.produccion_interna.alimentos - environment.algoritmo.limites.alimentos[1]);
      Isla_actual.inversion.produccion_interna.alimentos = environment.algoritmo.limites.alimentos[1];
      if(Isla_actual.inversion.produccion_interna.alimentos_ex > environment.algoritmo.limites.alimentos_ex[1]){
        Isla_actual.inversion.produccion_interna.alimentos_ex = environment.algoritmo.limites.alimentos_ex[1];
      }
    }

    if(Isla_actual.inversion.produccion_interna.alimentos_ex > environment.algoritmo.limites.alimentos_ex[1]){
      Isla_actual.inversion.produccion_interna.alimentos_ex = environment.algoritmo.limites.alimentos_ex[1];
    }

    if(Isla_actual.inversion.produccion_interna.militar > environment.algoritmo.limites.militar[1]){
      Isla_actual.inversion.produccion_interna.militar_ex += (Isla_actual.inversion.produccion_interna.militar - environment.algoritmo.limites.militar[1]);
      Isla_actual.inversion.produccion_interna.militar = environment.algoritmo.limites.militar[1];
      if(Isla_actual.inversion.produccion_interna.militar_ex > environment.algoritmo.limites.militar_ex[1]){
        Isla_actual.inversion.produccion_interna.militar_ex = environment.algoritmo.limites.militar_ex[1];
      }
    }

    if(Isla_actual.inversion.produccion_interna.tecnologia > environment.algoritmo.limites.tecnologia[1]){
      Isla_actual.inversion.produccion_interna.tecnologia_ex += (Isla_actual.inversion.produccion_interna.tecnologia - environment.algoritmo.limites.tecnologia[1]);
      Isla_actual.inversion.produccion_interna.tecnologia = environment.algoritmo.limites.tecnologia[1];
      if(Isla_actual.inversion.produccion_interna.tecnologia_ex > environment.algoritmo.limites.tecnologia_ex[1]){
        Isla_actual.inversion.produccion_interna.tecnologia_ex = environment.algoritmo.limites.tecnologia_ex[1];
      }
    }

  if(Isla_actual.inversion.produccion_interna.servicios > environment.algoritmo.limites.servicios[1]){
    Isla_actual.inversion.produccion_interna.servicios = environment.algoritmo.limites.servicios[1];
    }
  }

  public gameOver(Isla_actual: Isla){
    if(Isla_actual.inversion.inversion_interna == environment.algoritmo.limites.inversion_int[0] && Isla_actual.dinero == -5){
      Isla_actual.isla_viva = false;
    }

    if(Isla_actual.dinero == -5 && Isla_actual.recursos_naturales == environment.algoritmo.limites.recursos[0]){
      Isla_actual.isla_viva = false;
    }

    if (Isla_actual.poblacion == environment.algoritmo.limites.poblacion[0]) {
      Isla_actual.isla_viva = false;
    }
  }

  public victoria(isla: Isla){
    return isla.inversion.produccion_interna.tecnologia >= 10 
    && isla.inversion.infraestructura >= 10
    && isla.inversion.inversion_interna >= 10
    && isla.inversion.produccion_interna.servicios >= 10;
  }
}