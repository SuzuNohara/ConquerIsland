import { Injectable } from '@angular/core';
import { Acciones, Isla } from '../dto/Isla';

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
    this.Catastrofe(Isla_actual, Accion); //funcion de desastres naturales
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

  public Infraestructura(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
    if (Isla_actual.dinero <= 10 && Isla_actual.reservas_dinero == 0) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= Accion.Infraestructura;
    } else {
      if(Isla_actual.reservas_dinero > Accion.Infraestructura){
      Isla_actual.reservas_dinero -= Accion.Infraestructura;
      }else{
        Isla_actual.dinero -= (Accion.Infraestructura - Isla_actual.reservas_dinero);
        Isla_actual.reservas_dinero = 0;
      }
    }

    if (
      Isla_actual.recursos_naturales <= 10 &&
      Isla_actual.reservas_recursos == 0
    ) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= Accion.Infraestructura;
    } else{
      if(Isla_actual.reservas_recursos > Accion.Infraestructura){
        Isla_actual.reservas_recursos -= Accion.Infraestructura;
        }else{
          Isla_actual.recursos_naturales -= (Accion.Infraestructura - Isla_actual.reservas_recursos);
          Isla_actual.reservas_recursos = 0;
        }
    }

    if (Isla_actual.poblacion < 10) {
      Isla_actual.poblacion += Accion.Infraestructura;
      if(Isla_actual.poblacion>10){
        Isla_actual.poblacion=10;
      }
    }

    if (Isla_actual.inversion.produccion_interna.alimentos < 10) {
      Isla_actual.inversion.produccion_interna.alimentos +=
        Isla_actual.inversion.infraestructura + Accion.Infraestructura; //Aumenta los alimentos por turno
    } else if (Isla_actual.inversion.produccion_interna.alimentos_ex < 10) {
      Isla_actual.inversion.produccion_interna.alimentos_ex +=
        Isla_actual.inversion.infraestructura + Accion.Infraestructura;
    }

    if (Isla_actual.inversion.infraestructura<10){
      Isla_actual.inversion.infraestructura += Accion.Infraestructura;
    }
  }

  public Educacion(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
    if (Isla_actual.dinero <= 10 && Isla_actual.reservas_dinero == 0) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= Accion.educacion;
    } else {
      if(Isla_actual.reservas_dinero > Accion.educacion){
      Isla_actual.reservas_dinero -= Accion.educacion;
      }else{
        Isla_actual.dinero -= (Accion.educacion - Isla_actual.reservas_dinero);
        Isla_actual.reservas_dinero = 0;
      }
    }

    if (Isla_actual.recursos_naturales <= 10 && Isla_actual.reservas_recursos == 0) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= Accion.educacion;
    } else{
      if(Isla_actual.reservas_recursos > Accion.educacion){
        Isla_actual.reservas_recursos -= Accion.educacion;
        }else{
          Isla_actual.recursos_naturales -= (Accion.educacion - Isla_actual.reservas_recursos);
          Isla_actual.reservas_recursos = 0;
        }
    }

    if (Isla_actual.inversion.produccion_interna.tecnologia < 10) {
      Isla_actual.inversion.produccion_interna.tecnologia += Accion.educacion;
    } else if (Isla_actual.inversion.produccion_interna.tecnologia_ex < 10) {
      Isla_actual.inversion.produccion_interna.tecnologia_ex +=
        Accion.educacion;
    }

    if (Isla_actual.inversion.educacion<10){
      Isla_actual.inversion.educacion += Accion.educacion;
    }
  }

  public Inversion_int(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
    if (Isla_actual.dinero <= 10 && Isla_actual.reservas_dinero == 0) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= Accion.inversion_interna;
    } else {
      if(Isla_actual.reservas_dinero > Accion.inversion_interna){
      Isla_actual.reservas_dinero -= Accion.inversion_interna;
      }else{
        Isla_actual.dinero -= (Accion.inversion_interna - Isla_actual.reservas_dinero);
        Isla_actual.reservas_dinero = 0;
      }
    }

    if (Isla_actual.recursos_naturales <= 10 && Isla_actual.reservas_recursos == 0) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= Accion.inversion_interna;
    } else{
      if(Isla_actual.reservas_recursos > Accion.inversion_interna){
        Isla_actual.reservas_recursos -= Accion.inversion_interna;
        }else{
          Isla_actual.recursos_naturales -= (Accion.inversion_interna - Isla_actual.reservas_recursos);
          Isla_actual.reservas_recursos = 0;
        }
    }

    if (Isla_actual.poblacion < 10) {
      Isla_actual.poblacion += Accion.inversion_interna;
    }

    if (Isla_actual.dinero < 10) {
      Isla_actual.dinero +=
        0.5 *
        (Isla_actual.inversion.inversion_interna + Accion.inversion_interna); //Por turno (discutir con Kike)
      if (Isla_actual.dinero > 10) {
        Isla_actual.reservas_dinero += Isla_actual.dinero - 10;
        Isla_actual.dinero = 10;
      }
    } else if (Isla_actual.reservas_dinero < 10) {
      Isla_actual.reservas_dinero +=
        0.5 *
        (Isla_actual.inversion.inversion_interna + Accion.inversion_interna);
      if (Isla_actual.reservas_dinero > 10) {
        Isla_actual.reservas_dinero = 10;
      }
    }

    if (Isla_actual.inversion.inversion_interna<10){
      Isla_actual.inversion.inversion_interna += Accion.inversion_interna;
    }
  }

  public Produccion_int(Isla_actual: Isla, Accion: Acciones) {
    this.Tecnologia(Isla_actual, Accion);
    this.Militar(Isla_actual, Accion);
    this.Servicios(Isla_actual, Accion);
  }

  public Tecnologia(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
    if (Isla_actual.dinero <= 10 && Isla_actual.reservas_dinero == 0) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= Accion.tecnologia;
    } else {
      if(Isla_actual.reservas_dinero > Accion.tecnologia){
      Isla_actual.reservas_dinero -= Accion.tecnologia;
      }else{
        Isla_actual.dinero -= (Accion.tecnologia - Isla_actual.reservas_dinero);
        Isla_actual.reservas_dinero = 0;
      }
    }

    if (Isla_actual.recursos_naturales <= 10 && Isla_actual.reservas_recursos == 0) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= Accion.tecnologia;
    } else{
      if(Isla_actual.reservas_recursos > Accion.tecnologia){
        Isla_actual.reservas_recursos -= Accion.tecnologia;
        }else{
          Isla_actual.recursos_naturales -= (Accion.tecnologia - Isla_actual.reservas_recursos);
          Isla_actual.reservas_recursos = 0;
        }
    }

    if(Isla_actual.inversion.produccion_interna.alimentos <=10 && Isla_actual.inversion.produccion_interna.alimentos_ex==0){
      Isla_actual.inversion.produccion_interna.alimentos -= Accion.tecnologia;
    }else{
      if(Isla_actual.inversion.produccion_interna.alimentos_ex > Accion.tecnologia){
        Isla_actual.inversion.produccion_interna.alimentos_ex -= Accion.tecnologia;
      }else{
        Isla_actual.inversion.produccion_interna.alimentos -= (Accion.tecnologia - Isla_actual.inversion.produccion_interna.alimentos_ex);
        Isla_actual.inversion.produccion_interna.alimentos_ex = 0;
      }
    }

      if(Isla_actual.inversion.produccion_interna.tecnologia<Isla_actual.inversion.educacion || Isla_actual.inversion.educacion==10){
      if (Isla_actual.inversion.produccion_interna.tecnologia<10){
        Isla_actual.inversion.produccion_interna.tecnologia += Accion.tecnologia;
      }else if (Isla_actual.inversion.produccion_interna.tecnologia_ex<10){
        Isla_actual.inversion.produccion_interna.tecnologia_ex += Accion.tecnologia;
      } 
    }
}

  public Militar(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
      if (Isla_actual.dinero <= 10 && Isla_actual.reservas_dinero == 0) {
        //agregar el caso de que sea =10
        Isla_actual.dinero -= Accion.militar;
      } else {
        if(Isla_actual.reservas_dinero > Accion.militar){
        Isla_actual.reservas_dinero -= Accion.militar;
        }else{
          Isla_actual.dinero -= (Accion.militar - Isla_actual.reservas_dinero);
          Isla_actual.reservas_dinero = 0;
        }
      }
  
      if (Isla_actual.recursos_naturales <= 10 && Isla_actual.reservas_recursos == 0) {
        //agregar el caso de que sea =10
        Isla_actual.recursos_naturales -= Accion.militar;
      } else{
        if(Isla_actual.reservas_recursos > Accion.militar){
          Isla_actual.reservas_recursos -= Accion.militar;
          }else{
            Isla_actual.recursos_naturales -= (Accion.militar - Isla_actual.reservas_recursos);
            Isla_actual.reservas_recursos = 0;
          }
      }

      if(Isla_actual.inversion.produccion_interna.alimentos <=10 && Isla_actual.inversion.produccion_interna.alimentos_ex==0){
        Isla_actual.inversion.produccion_interna.alimentos -= Accion.militar;
      }else{
        if(Isla_actual.inversion.produccion_interna.alimentos_ex > Accion.militar){
          Isla_actual.inversion.produccion_interna.alimentos_ex -= Accion.militar;
        }else{
          Isla_actual.inversion.produccion_interna.alimentos -= (Accion.militar-Isla_actual.inversion.produccion_interna.alimentos_ex);
          Isla_actual.inversion.produccion_interna.alimentos_ex = 0;
        }
      }
      
      if(Isla_actual.inversion.produccion_interna.militar<Isla_actual.inversion.produccion_interna.tecnologia || Isla_actual.inversion.produccion_interna.tecnologia==10){
      if (Isla_actual.inversion.produccion_interna.militar<10){
        Isla_actual.inversion.produccion_interna.militar += Accion.militar;
      }else if (Isla_actual.inversion.produccion_interna.militar_ex<10){
        Isla_actual.inversion.produccion_interna.militar_ex += Accion.militar;
      }
  }
}

  public Servicios(Isla_actual: Isla, Accion: Acciones) {
    if (Isla_actual.dinero <= 10 && Isla_actual.reservas_dinero == 0) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= Accion.servicios;
    } else {
      if(Isla_actual.reservas_dinero > Accion.servicios){
      Isla_actual.reservas_dinero -= Accion.servicios;
      }else{
        Isla_actual.dinero -= (Accion.servicios - Isla_actual.reservas_dinero);
        Isla_actual.reservas_dinero = 0;
      }
    }

    if (Isla_actual.recursos_naturales <= 10 && Isla_actual.reservas_recursos == 0) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= Accion.servicios;
    } else{
      if(Isla_actual.reservas_recursos > Accion.servicios){
        Isla_actual.reservas_recursos -= Accion.servicios;
        }else{
          Isla_actual.recursos_naturales -= (Accion.servicios - Isla_actual.reservas_recursos);
          Isla_actual.reservas_recursos = 0;
        }
    }


     if(Isla_actual.inversion.produccion_interna.alimentos<10){   //Servicios me genera alimentos
      Isla_actual.inversion.produccion_interna.alimentos += (Isla_actual.inversion.produccion_interna.servicios + Accion.servicios);
      if(Isla_actual.inversion.produccion_interna.alimentos>10){
        Isla_actual.inversion.produccion_interna.alimentos_ex+=(Isla_actual.inversion.produccion_interna.alimentos-10);
        Isla_actual.inversion.produccion_interna.alimentos=10;
      }
     }else if(Isla_actual.inversion.produccion_interna.alimentos_ex<10){
      Isla_actual.inversion.produccion_interna.alimentos_ex += (Isla_actual.inversion.produccion_interna.servicios + Accion.servicios);
    }

     if (Isla_actual.inversion.produccion_interna.servicios<10){
      Isla_actual.inversion.produccion_interna.servicios += Accion.servicios;
      if(Isla_actual.inversion.produccion_interna.servicios>10){
        Isla_actual.inversion.produccion_interna.servicios=10;
      }
    }
  }

  public Poblacion(Isla_actual: Isla) {
    if (Isla_actual.poblacion > Isla_actual.inversion.produccion_interna.alimentos) {
      Isla_actual.poblacion = Isla_actual.inversion.produccion_interna.alimentos; //Si los alimentos son 0, la poblacion también
      Isla_actual.inversion.produccion_interna.alimentos = 0;
    } else {
      if(Isla_actual.inversion.produccion_interna.alimentos_ex==0){
        Isla_actual.inversion.produccion_interna.alimentos -= Isla_actual.poblacion; //consumo alimentos
      }else {
        if(Isla_actual.inversion.produccion_interna.alimentos_ex<Isla_actual.poblacion){
          Isla_actual.inversion.produccion_interna.alimentos -= (Isla_actual.poblacion - Isla_actual.inversion.produccion_interna.alimentos_ex);
          Isla_actual.inversion.produccion_interna.alimentos_ex = 0; 
        }else{
          Isla_actual.inversion.produccion_interna.alimentos_ex -= Isla_actual.poblacion; 
        } 
      }
    }

    if(Isla_actual.poblacion<0){
      Isla_actual.poblacion=0;
    }
  }

  public Truncar(Isla_actual: Isla){

    if(Isla_actual.poblacion>10){
      Isla_actual.poblacion=10;
    }

    if(Isla_actual.inversion.educacion>10){
      Isla_actual.inversion.educacion=10;
    }

    if(Isla_actual.inversion.infraestructura>10){
      Isla_actual.inversion.infraestructura=10;
    }

    if(Isla_actual.inversion.inversion_interna>10){
      Isla_actual.inversion.inversion_interna=10;
    }

    if(Isla_actual.inversion.produccion_interna.alimentos>10){
      Isla_actual.inversion.produccion_interna.alimentos_ex += (Isla_actual.inversion.produccion_interna.alimentos-10);
      Isla_actual.inversion.produccion_interna.alimentos=10;
      if(Isla_actual.inversion.produccion_interna.alimentos_ex>10){
        Isla_actual.inversion.produccion_interna.alimentos_ex=10;
      }
    }

    if(Isla_actual.inversion.produccion_interna.alimentos_ex>10){
      Isla_actual.inversion.produccion_interna.alimentos_ex=10;
    }

    if(Isla_actual.inversion.produccion_interna.militar>10){
      Isla_actual.inversion.produccion_interna.militar_ex += (Isla_actual.inversion.produccion_interna.militar-10);
      Isla_actual.inversion.produccion_interna.militar=10;
      if(Isla_actual.inversion.produccion_interna.militar_ex>10){
        Isla_actual.inversion.produccion_interna.militar_ex=10;
      }
    }

    if(Isla_actual.inversion.produccion_interna.tecnologia>10){
      Isla_actual.inversion.produccion_interna.tecnologia_ex += (Isla_actual.inversion.produccion_interna.tecnologia-10);
      Isla_actual.inversion.produccion_interna.tecnologia=10;
      if(Isla_actual.inversion.produccion_interna.tecnologia_ex>10){
        Isla_actual.inversion.produccion_interna.tecnologia_ex=10;
      }
    }

  if(Isla_actual.inversion.produccion_interna.servicios>10){
    Isla_actual.inversion.produccion_interna.servicios=10;
    }
  }

  public gameOver(Isla_actual: Isla){
    if(Isla_actual.inversion.inversion_interna==0 && Isla_actual.dinero == -5){
      Isla_actual.isla_viva = false;
    }

    if(Isla_actual.dinero == -5 && Isla_actual.recursos_naturales==0){
      Isla_actual.isla_viva = false;
    }

    if (Isla_actual.poblacion == 0) {
      Isla_actual.isla_viva = false;
    }
  }

  public victoria(isla: Isla){
    return isla.inversion.produccion_interna.tecnologia >= 10 
    && isla.inversion.infraestructura >= 10
    && isla.inversion.inversion_interna >= 10
    && isla.inversion.produccion_interna.servicios >= 10;
  }

  public Catastrofe(Isla_actual: Isla, Accion: Acciones)
  {
    let tipoAleatorio: number;
    //El desastre se genera cada 5 turnos (cambiar despues para balancear esto)
    if(Isla_actual.turno%5 == 0){
      Accion.desastresNaturales.desastre = true;
      // Genera un número aleatorio entre 0 y 2
      const numeroAleatorio = Math.random();
      const numeroEntre0y3 = numeroAleatorio * 3;
      tipoAleatorio = Math.floor(numeroEntre0y3);
      
      //definir el tipo de desastre que se genera aleatoriamente
      if(tipoAleatorio == 0)
        Accion.desastresNaturales.tipo = 'tsunami';
      else if(tipoAleatorio == 1)
        Accion.desastresNaturales.tipo = "terremoto";
      else if(tipoAleatorio == 2)
        Accion.desastresNaturales.tipo = "huracan";

      //general aleatoriamente el nivel del desastre natural entre 0 y 5
      const numeroAleatorio2 = Math.random();
      const numeroEntre0y6 = numeroAleatorio2 * 3;
      Accion.desastresNaturales.nivel = Math.floor(numeroEntre0y6);

      //Realizar los desastres provocados
      if (Isla_actual.recursos_naturales <= 10 && Isla_actual.reservas_recursos == 0) {
        //agregar el caso de que sea =10
        Isla_actual.recursos_naturales -= Accion.desastresNaturales.nivel;
      } else{
        if(Isla_actual.reservas_recursos > Accion.desastresNaturales.nivel){
          Isla_actual.reservas_recursos -= Accion.desastresNaturales.nivel;
          }else{
            Isla_actual.recursos_naturales -= (Accion.desastresNaturales.nivel - Isla_actual.reservas_recursos);
            Isla_actual.reservas_recursos = 0;
          }
      }

      if (Isla_actual.dinero <= 10 && Isla_actual.reservas_dinero == 0) {
        //agregar el caso de que sea =10
        Isla_actual.dinero -= Accion.desastresNaturales.nivel;
      } else {
        if(Isla_actual.reservas_dinero > Accion.desastresNaturales.nivel){
        Isla_actual.reservas_dinero -= Accion.desastresNaturales.nivel;
        }else{
          Isla_actual.dinero -= (Accion.desastresNaturales.nivel- Isla_actual.reservas_dinero);
          Isla_actual.reservas_dinero = 0;
        }
      }

      Isla_actual.inversion.infraestructura-1;
      if(Isla_actual.inversion.produccion_interna.tecnologia_ex > 0)
        Isla_actual.inversion.produccion_interna.tecnologia_ex-1;
      else
        Isla_actual.inversion.produccion_interna.tecnologia-1;
    }

    else{
      Accion.desastresNaturales.desastre = false;
    }
  }
}