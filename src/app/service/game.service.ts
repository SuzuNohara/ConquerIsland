import { Injectable } from '@angular/core';
import { Acciones, Isla } from '../dto/Isla';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor() { }

  public turno(Isla_actual: Isla, Accion: Acciones): Isla {

    this.Infraestructura(Isla_actual, Accion);
    this.Educacion(Isla_actual, Accion);
    this.Inversion_int(Isla_actual, Accion);
    this.Produccion_int(Isla_actual, Accion);
    this.Poblacion(Isla_actual);

    if (Isla_actual.poblacion == 0) {
      Isla_actual.isla_viva = false;
    }

    Isla_actual.turno++;
    Isla_actual.recursos_naturales += 1.3;

    return Isla_actual;

  }

  public Infraestructura(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
    if (Isla_actual.dinero < 10) {
      Isla_actual.dinero -= Accion.Infraestructura;
    }
    else if (Isla_actual.reservas_dinero < 10) {
      Isla_actual.reservas_dinero -= Accion.Infraestructura;

    }

    if (Isla_actual.recursos_naturales < 10) {
      Isla_actual.recursos_naturales -= Accion.Infraestructura;
    }
    else if (Isla_actual.reservas_recursos < 10) {
      Isla_actual.reservas_recursos -= Accion.Infraestructura;
    }

    if (Isla_actual.poblacion < 10) {
      Isla_actual.poblacion += Accion.Infraestructura;
    }

    if (Isla_actual.inversion.produccion_interna.alimentos < 10) {
      Isla_actual.inversion.produccion_interna.alimentos += (Isla_actual.inversion.infraestructura + Accion.Infraestructura); //Aumenta los alimentos por turno
    }
    else if (Isla_actual.inversion.produccion_interna.alimentos_ex < 10) {
      Isla_actual.inversion.produccion_interna.alimentos_ex += (Isla_actual.inversion.infraestructura + Accion.Infraestructura);
    }

  }

  public Educacion(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
    if (Isla_actual.dinero < 10) {
      Isla_actual.dinero -= Accion.educacion;
    }
    else if (Isla_actual.reservas_dinero < 10) {
      Isla_actual.reservas_dinero -= Accion.educacion;
    }

    if (Isla_actual.recursos_naturales < 10) {
      Isla_actual.recursos_naturales -= Accion.educacion;
    }
    else if (Isla_actual.reservas_recursos < 10) {
      Isla_actual.reservas_recursos -= Accion.educacion;
    }


    if (Isla_actual.inversion.produccion_interna.tecnologia < 10) {
      Isla_actual.inversion.produccion_interna.tecnologia += Accion.educacion;
    }
    else if (Isla_actual.inversion.produccion_interna.tecnologia_ex < 10) {
      Isla_actual.inversion.produccion_interna.tecnologia_ex += Accion.educacion;
    }

  }

  public Inversion_int(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
    if (Isla_actual.dinero < 10) {
      Isla_actual.dinero -= Accion.inversion_interna;
    }
    else if (Isla_actual.reservas_dinero < 10) {
      Isla_actual.reservas_dinero -= Accion.inversion_interna;
    }

    if (Isla_actual.recursos_naturales < 10) {
      Isla_actual.recursos_naturales -= Accion.inversion_interna;
    }
    else if (Isla_actual.reservas_recursos < 10) {
      Isla_actual.reservas_recursos -= Accion.inversion_interna;
    }

    if (Isla_actual.poblacion < 10) {
      Isla_actual.poblacion += 0.5 * Accion.inversion_interna;
    }

    if (Isla_actual.dinero < 10) {
      Isla_actual.dinero += 0.5 * (Isla_actual.inversion.inversion_interna + Accion.inversion_interna); //Por turno (discutir con Kike)
    }
    else if (Isla_actual.reservas_dinero < 10) {
      Isla_actual.reservas_dinero += 0.5 * (Isla_actual.inversion.inversion_interna + Accion.inversion_interna);
    }

  }

  public Produccion_int(Isla_actual: Isla, Accion: Acciones) {

    this.Tecnologia(Isla_actual, Accion);
    this.Militar(Isla_actual, Accion);
    this.Servicios(Isla_actual, Accion);

  }

  public Tecnologia(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
    if (Isla_actual.dinero < 10) {
      Isla_actual.dinero -= Accion.tecnologia;
    }
    else if (Isla_actual.reservas_dinero < 10) {
      Isla_actual.reservas_dinero -= Accion.tecnologia;
    }

    if (Isla_actual.recursos_naturales < 10) {
      Isla_actual.recursos_naturales -= Accion.tecnologia;
    }
    else if (Isla_actual.reservas_recursos < 10) {
      Isla_actual.reservas_recursos -= Accion.tecnologia;
    }

    if (Isla_actual.inversion.educacion > Isla_actual.inversion.produccion_interna.tecnologia) {
      Isla_actual.inversion.produccion_interna.tecnologia += Accion.tecnologia;
    }
    // se puede invertir en tecnologia
    // no puedo inveritr mas de nivel educativo
    // si invierto de mas en tecnologia sin el  nivel educativo, se pierde el dinero y recursos sin aumenta la tecnologia
    //ed>inv_int? tec=inv_int : tec=ed;
    //¿También se le puede invertir?
    //Aumenta infraestructura y recursos naturales (¿en qué medida?)
  }

  public Militar(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
    if (Isla_actual.dinero < 10) {
      Isla_actual.dinero -= Accion.militar;
    }
    else if (Isla_actual.reservas_dinero < 10) {
      Isla_actual.reservas_dinero -= Accion.militar;
    }

    if (Isla_actual.recursos_naturales < 10) {
      Isla_actual.recursos_naturales -= Accion.militar;
    }
    else if (Isla_actual.reservas_recursos < 10) {
      Isla_actual.reservas_recursos -= Accion.militar;
    }

    if (Isla_actual.inversion.produccion_interna.militar < Isla_actual.inversion.produccion_interna.tecnologia) {
      //aqui va todo el codigo
    }
  }

  public Servicios(Isla_actual: Isla, Accion: Acciones) {
    if (Isla_actual.dinero < 10) {
      Isla_actual.dinero -= Accion.servicios;
    }
    else if (Isla_actual.reservas_dinero < 10) {
      Isla_actual.reservas_dinero -= Accion.servicios;
    }

    if (Isla_actual.recursos_naturales < 10) {
      Isla_actual.recursos_naturales -= Accion.servicios;
    }
    else if (Isla_actual.reservas_recursos < 10) {
      Isla_actual.reservas_recursos -= Accion.servicios;
    }
  }

  public Poblacion(Isla_actual: Isla) {
    if (Isla_actual.poblacion > Isla_actual.inversion.produccion_interna.alimentos) {
      Isla_actual.poblacion = Isla_actual.inversion.produccion_interna.alimentos; //Si los alimentos son 0, la poblacion también
      Isla_actual.inversion.produccion_interna.alimentos = 0;
    }
    else {
      Isla_actual.inversion.produccion_interna.alimentos -= Isla_actual.poblacion;  //Si tengo suficiente, solo consumo alimentos 
    }
  }
}
