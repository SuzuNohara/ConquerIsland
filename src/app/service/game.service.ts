import { Injectable } from '@angular/core';
import { Acciones, Isla } from '../dto/Isla';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  constructor() {}

  private env = environment.algoritmo;

  // Que el juego se pueda probar multiples ocasiones con distintas acciones
  // Algoritmos evolutivos
  public test(){
    console.log("Iniciando testing");
    let isla: Isla = new Isla();
    let act: Acciones = new Acciones();
    let actions: Acciones[] = [];

    for(let i = 0; i < 50; i++){
      this.gameOver(isla);
      if(isla.victoria){
        console.log("Victoria isla\n");
        this.printActions(actions);
        console.log('\n');
        console.log(isla);
        break;
      }else if(!isla.isla_viva){
        console.log("Derrota de la isla\n");
        this.printActions(actions);
        console.log('\n');
        console.log(isla);
        break;
      }else if(i == 49){
        console.log("Se supero el numero de acciones");
        this.printActions(actions);
        console.log('\n');
        console.log(isla);
        break;
      }else{
        // lista de acciones ganadoras [francisco]
        do{
          act = this.randomAction(act);
          // console.log("Generando Acciones " + isla.turno + ": ", act);
        }while(!this.Comprobar( isla, act));
        actions.push(act);
        act = new Acciones();
        isla = this.turno( isla, act);
      }
    }
  }

  public printActions(acts: Acciones[]){
    for(let act of acts){
      console.log("Infra: " + act.Infraestructura,
        "Edu: " + act.educacion,
        "Inv: " + act.inversion_interna,
        "Mili: " + act.militar,
        "Serv: " + act.servicios,
        "Tec: " + act.tecnologia);
    }
  }

  public randomAction(act: Acciones){
    act.Infraestructura = this.rand(2);
    act.educacion = this.rand(2);
    act.inversion_interna = this.rand(2);
    act.tecnologia = this.rand(2);
    act.servicios = this.rand(2);
    act.militar = this.rand(2);
    return act;
  }

  public rand(max: number) {
    return Math.floor(Math.random() * max);
  }

  public turno(Isla_actual: Isla, Accion: Acciones): Isla {
    console.log("Procesando turno...");
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

  public Infraestructura(Isla_actual: Isla, Accion: Acciones) { // parametrizado
    //Disminuir dinero y recursos
    if (Isla_actual.dinero <= this.env.limites.dinero[1] && Isla_actual.reservas_dinero == this.env.limites.reservas_dinero[0]) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= this.env.costos_dinero.infraestructura * Accion.Infraestructura;
    } else {
      if(Isla_actual.reservas_dinero > this.env.costos_dinero.infraestructura * Accion.Infraestructura){
        Isla_actual.reservas_dinero -= this.env.costos_dinero.infraestructura * Accion.Infraestructura;
      }else{
        Isla_actual.dinero -= (this.env.costos_dinero.infraestructura * Accion.Infraestructura - Isla_actual.reservas_dinero);
        Isla_actual.reservas_dinero = this.env.limites.reservas_dinero[0];
      }
    }

    if (
      Isla_actual.recursos_naturales <= this.env.limites.recursos[1] &&
      Isla_actual.reservas_recursos == this.env.limites.recursos[0]
    ) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= this.env.costos_nat.infraestructura * Accion.Infraestructura;
    } else{
      if(Isla_actual.reservas_recursos > this.env.costos_nat.infraestructura * Accion.Infraestructura){
        Isla_actual.reservas_recursos -= this.env.costos_nat.infraestructura * Accion.Infraestructura;
        }else{
          Isla_actual.recursos_naturales -= (this.env.costos_nat.infraestructura * Accion.Infraestructura - Isla_actual.reservas_recursos);
          Isla_actual.reservas_recursos = this.env.limites.reservas_recursos[0];
        }
    }

    if (Isla_actual.poblacion < this.env.limites.poblacion[1]) {
      Isla_actual.poblacion += this.env.crecimiento.poblacion * Accion.Infraestructura;
      if(Isla_actual.poblacion > this.env.limites.poblacion[1]){
        Isla_actual.poblacion = this.env.limites.poblacion[1];
      }
    }

    if (Isla_actual.inversion.produccion_interna.alimentos < this.env.limites.alimentos[1]) {
      Isla_actual.inversion.produccion_interna.alimentos += this.env.crecimiento.alimentos * (Isla_actual.inversion.infraestructura + Accion.Infraestructura); //Aumenta los alimentos por turno
    } else if (Isla_actual.inversion.produccion_interna.alimentos_ex < this.env.limites.alimentos[1]) {
      Isla_actual.inversion.produccion_interna.alimentos_ex += this.env.crecimiento.alimentos * (Isla_actual.inversion.infraestructura + Accion.Infraestructura);
    }

    if (Isla_actual.inversion.infraestructura < this.env.limites.infraestructura[1]){
      Isla_actual.inversion.infraestructura += this.env.crecimiento.infraestructura * Accion.Infraestructura;
    }
  }

  public Educacion(Isla_actual: Isla, Accion: Acciones) {
   //PARAMETRIZACIÓN COSTOS DE COSTOS DINERO
   
    if (Isla_actual.dinero <= this.env.limites.dinero[1] && Isla_actual.reservas_dinero == this.env.limites.reservas_dinero[0]) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= this.env.costos_dinero.educacion * Accion.educacion;
    } else {
      if(Isla_actual.reservas_dinero > this.env.costos_dinero.educacion * Accion.educacion){
      Isla_actual.reservas_dinero -= this.env.costos_dinero.educacion * Accion.educacion;
      }else{
        Isla_actual.dinero -= (this.env.costos_dinero.educacion * Accion.educacion) - Isla_actual.reservas_dinero;
        Isla_actual.reservas_dinero = this.env.limites.reservas_dinero[0];
      }
    }

    //PARAMETRIZACIÓN COSTOS DE RECURSOS NATURALES

    if (Isla_actual.recursos_naturales <= this.env.limites.recursos[1] && Isla_actual.reservas_recursos == this.env.limites.reservas_recursos[0]) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= this.env.costos_nat.educacion * Accion.educacion;
    } else{
      if(Isla_actual.reservas_recursos > this.env.costos_nat.educacion *  Accion.educacion){
        Isla_actual.reservas_recursos -= this.env.costos_nat.educacion * Accion.educacion;
        }else{
          Isla_actual.recursos_naturales -= (this.env.costos_nat.educacion * Accion.educacion) - Isla_actual.reservas_recursos;
          Isla_actual.reservas_recursos = this.env.limites.reservas_recursos[0];
        }
    }

    //Discutir el eliminar esta parte

    if (Isla_actual.inversion.produccion_interna.tecnologia < 10) {
      Isla_actual.inversion.produccion_interna.tecnologia += Accion.educacion;
    } else if (Isla_actual.inversion.produccion_interna.tecnologia_ex < 10) {
      Isla_actual.inversion.produccion_interna.tecnologia_ex +=
        Accion.educacion;
    }

    if (Isla_actual.inversion.educacion < this.env.limites.educacion[1]){
      Isla_actual.inversion.educacion += this.env.crecimiento.educacion * Accion.educacion;
    }
  }

  public Inversion_int(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
    if (Isla_actual.dinero <= this.env.limites.dinero[1] && Isla_actual.reservas_dinero == this.env.limites.reservas_dinero[0]) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= this.env.costos_dinero.inversion_int * Accion.inversion_interna;
    } else {
      if(Isla_actual.reservas_dinero > this.env.costos_dinero.inversion_int * Accion.inversion_interna){
      Isla_actual.reservas_dinero -= this.env.costos_dinero.inversion_int * Accion.inversion_interna;
      }else{
        Isla_actual.dinero -= (this.env.costos_dinero.inversion_int * Accion.inversion_interna) - Isla_actual.reservas_dinero;
        Isla_actual.reservas_dinero = this.env.limites.reservas_dinero[0];
      }
    }

    if (Isla_actual.recursos_naturales <= this.env.limites.recursos[1] && Isla_actual.reservas_recursos == this.env.limites.reservas_recursos[0]) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= this.env.costos_nat.inversion_int * Accion.inversion_interna;
    } else{
      if(Isla_actual.reservas_recursos > this.env.costos_nat.inversion_int * Accion.inversion_interna){
        Isla_actual.reservas_recursos -= this.env.costos_nat.inversion_int * Accion.inversion_interna;
        }else{
          Isla_actual.recursos_naturales -= (this.env.costos_nat.inversion_int * Accion.inversion_interna) - Isla_actual.reservas_recursos;
          Isla_actual.reservas_recursos =this.env.limites.reservas_recursos[0];
        }
    }

    if (Isla_actual.poblacion < this.env.limites.poblacion[1]) {
      Isla_actual.poblacion += this.env.crecimiento.poblacion * Accion.inversion_interna;
    }

    //PARAMETRIZACIÓN CRECIMIENTO DE DINERO

    if (Isla_actual.dinero < this.env.limites.dinero[1]) {
      Isla_actual.dinero +=
        this.env.crecimiento.dinero *
        (Isla_actual.inversion.inversion_interna + Accion.inversion_interna); //Por turno (discutir con Kike)
      if (Isla_actual.dinero > this.env.limites.dinero[1]) {
        Isla_actual.reservas_dinero += Isla_actual.dinero - this.env.limites.reservas_dinero[1];
        Isla_actual.dinero = this.env.limites.dinero[1];
      }
    } else if (Isla_actual.reservas_dinero < this.env.limites.reservas_dinero[1]) {
      Isla_actual.reservas_dinero +=
      this.env.crecimiento.dinero *
        (Isla_actual.inversion.inversion_interna + Accion.inversion_interna);
      if (Isla_actual.reservas_dinero > this.env.limites.reservas_dinero[1]) {
        Isla_actual.reservas_dinero = this.env.limites.reservas_dinero[1];
      }
    }

    if (Isla_actual.inversion.inversion_interna < this.env.limites.inversion_int[1]){
      Isla_actual.inversion.inversion_interna += this.env.crecimiento.inversion_int * Accion.inversion_interna;
    }
  }

  public Produccion_int(Isla_actual: Isla, Accion: Acciones) {
    this.Tecnologia(Isla_actual, Accion);
    this.Militar(Isla_actual, Accion);
    this.Servicios(Isla_actual, Accion);
  }

  public Tecnologia(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
    if (Isla_actual.dinero <= this.env.limites.dinero[1] && Isla_actual.reservas_dinero == this.env.limites.reservas_dinero[0]) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= this.env.costos_dinero.tecnologia * Accion.tecnologia;
    } else {
      if(Isla_actual.reservas_dinero > this.env.costos_dinero.tecnologia * Accion.tecnologia){
      Isla_actual.reservas_dinero -= this.env.costos_dinero.tecnologia * Accion.tecnologia;
      }else{
        Isla_actual.dinero -= (this.env.costos_dinero.tecnologia * Accion.tecnologia) - Isla_actual.reservas_dinero;
        Isla_actual.reservas_dinero = this.env.limites.reservas_dinero[0];
      }
    }

    if (Isla_actual.recursos_naturales <= this.env.limites.recursos[1] && Isla_actual.reservas_recursos == this.env.limites.reservas_recursos[0]) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= this.env.costos_nat.tecnologia * Accion.tecnologia;
    } else{
      if(Isla_actual.reservas_recursos > this.env.costos_nat.tecnologia * Accion.tecnologia){
        Isla_actual.reservas_recursos -= this.env.costos_nat.tecnologia * Accion.tecnologia;
        }else{
          Isla_actual.recursos_naturales -= (this.env.costos_nat.tecnologia * Accion.tecnologia) - Isla_actual.reservas_recursos;
          Isla_actual.reservas_recursos = this.env.limites.reservas_recursos[0];
        }
    }

    if(Isla_actual.inversion.produccion_interna.alimentos <= this.env.limites.alimentos[1] && Isla_actual.inversion.produccion_interna.alimentos_ex == this.env.limites.alimentos_ex[0]){
      Isla_actual.inversion.produccion_interna.alimentos -= this.env.costos_alim.tecnologia * Accion.tecnologia; //considero costo de alimentos
    }else{
      if(Isla_actual.inversion.produccion_interna.alimentos_ex > this.env.costos_alim.tecnologia * Accion.tecnologia){
        Isla_actual.inversion.produccion_interna.alimentos_ex -= this.env.costos_alim.tecnologia * Accion.tecnologia;
      }else{
        Isla_actual.inversion.produccion_interna.alimentos -= (this.env.costos_alim.tecnologia * Accion.tecnologia) - Isla_actual.inversion.produccion_interna.alimentos_ex;
        Isla_actual.inversion.produccion_interna.alimentos_ex = this.env.limites.alimentos_ex[0];
      }
    }

      if(Isla_actual.inversion.produccion_interna.tecnologia < Isla_actual.inversion.educacion || Isla_actual.inversion.educacion == this.env.limites.educacion[1]){
      if (Isla_actual.inversion.produccion_interna.tecnologia < this.env.limites.tecnologia[1]){
        Isla_actual.inversion.produccion_interna.tecnologia += this.env.crecimiento.tecnologia * Accion.tecnologia;
      }else if (Isla_actual.inversion.produccion_interna.tecnologia_ex < this.env.limites.tecnologia_ex[1]){
        Isla_actual.inversion.produccion_interna.tecnologia_ex += this.env.crecimiento.tecnologia * Accion.tecnologia;
      }   //considerar a gregar el apartado de tecnología excedente en lugar de crecimiento de tecnologia simplemente
    }
}

  public Militar(Isla_actual: Isla, Accion: Acciones) {
    //Disminuir dinero y recursos
      if (Isla_actual.dinero <= this.env.limites.dinero[1] && Isla_actual.reservas_dinero == this.env.limites.reservas_dinero[0]) {
        //agregar el caso de que sea =10
        Isla_actual.dinero -= this.env.costos_dinero.militar * Accion.militar;
      } else {
        if(Isla_actual.reservas_dinero > this.env.costos_dinero.militar * Accion.militar){
        Isla_actual.reservas_dinero -= this.env.costos_dinero.militar * Accion.militar;
        }else{
          Isla_actual.dinero -= (this.env.costos_dinero.militar * Accion.militar) - Isla_actual.reservas_dinero;
          Isla_actual.reservas_dinero = this.env.limites.reservas_dinero[0];
        }
      }
  
      if (Isla_actual.recursos_naturales <= this.env.limites.recursos[1] && Isla_actual.reservas_recursos == this.env.limites.reservas_recursos[0]) {
        //agregar el caso de que sea =10
        Isla_actual.recursos_naturales -= this.env.costos_nat.militar * Accion.militar;
      } else{
        if(Isla_actual.reservas_recursos > this.env.costos_nat.militar * Accion.militar){
          Isla_actual.reservas_recursos -= this.env.costos_nat.militar * Accion.militar;
          }else{
            Isla_actual.recursos_naturales -= (this.env.costos_nat.militar * Accion.militar) - Isla_actual.reservas_recursos;
            Isla_actual.reservas_recursos = this.env.limites.reservas_recursos[0];
          }
      }

      if(Isla_actual.inversion.produccion_interna.alimentos <= this.env.limites.alimentos[1] && Isla_actual.inversion.produccion_interna.alimentos_ex == this.env.limites.alimentos_ex[0]){
        Isla_actual.inversion.produccion_interna.alimentos -= Accion.militar;
      }else{
        if(Isla_actual.inversion.produccion_interna.alimentos_ex > Accion.militar){
          Isla_actual.inversion.produccion_interna.alimentos_ex -= this.env.costos_alim.militar * Accion.militar;
        }else{
          Isla_actual.inversion.produccion_interna.alimentos -= (this.env.costos_alim.militar * Accion.militar) - Isla_actual.inversion.produccion_interna.alimentos_ex;
          Isla_actual.inversion.produccion_interna.alimentos_ex = this.env.limites.alimentos_ex[0];
        }
      }
      
      if(Isla_actual.inversion.produccion_interna.militar < Isla_actual.inversion.produccion_interna.tecnologia || Isla_actual.inversion.produccion_interna.tecnologia == this.env.limites.tecnologia[1]){
      if (Isla_actual.inversion.produccion_interna.militar < this.env.limites.militar[1]){
        Isla_actual.inversion.produccion_interna.militar += this.env.crecimiento.militar * Accion.militar;
      }else if (Isla_actual.inversion.produccion_interna.militar_ex < this.env.limites.militar_ex[1]){
        Isla_actual.inversion.produccion_interna.militar_ex += this.env.crecimiento.militar * Accion.militar;
      }
  }
}

  public Servicios(Isla_actual: Isla, Accion: Acciones) {
    if (Isla_actual.dinero <= this.env.limites.dinero[1] && Isla_actual.reservas_dinero == this.env.limites.reservas_dinero[0]) {
      //agregar el caso de que sea =10
      Isla_actual.dinero -= this.env.costos_dinero.servicios * Accion.servicios;
    } else {
      if(Isla_actual.reservas_dinero > this.env.costos_dinero.servicios * Accion.servicios){
      Isla_actual.reservas_dinero -= this.env.costos_dinero.servicios * Accion.servicios;
      }else{
        Isla_actual.dinero -= (this.env.costos_dinero.servicios * Accion.servicios) - Isla_actual.reservas_dinero;
        Isla_actual.reservas_dinero = this.env.limites.reservas_dinero[0];
      }
    }

    if (Isla_actual.recursos_naturales <= this.env.limites.recursos[1] && Isla_actual.reservas_recursos == this.env.limites.reservas_recursos[0]) {
      //agregar el caso de que sea =10
      Isla_actual.recursos_naturales -= this.env.costos_nat.servicios * Accion.servicios;
    } else{
      if(Isla_actual.reservas_recursos > this.env.costos_nat.servicios * Accion.servicios){
        Isla_actual.reservas_recursos -= this.env.costos_nat.servicios * Accion.servicios;
        }else{
          Isla_actual.recursos_naturales -= (this.env.costos_nat.servicios * Accion.servicios) - Isla_actual.reservas_recursos;
          Isla_actual.reservas_recursos = this.env.limites.reservas_recursos[0];
        }
    }

     if(Isla_actual.inversion.produccion_interna.alimentos < this.env.limites.alimentos[1]){   //Servicios me genera alimentos
      Isla_actual.inversion.produccion_interna.alimentos += Isla_actual.inversion.produccion_interna.servicios + (this.env.crecimiento.alimentos * Accion.servicios);
      if(Isla_actual.inversion.produccion_interna.alimentos > this.env.limites.alimentos[1]){
        Isla_actual.inversion.produccion_interna.alimentos_ex  += (Isla_actual.inversion.produccion_interna.alimentos - this.env.limites.alimentos[1]);
        Isla_actual.inversion.produccion_interna.alimentos = this.env.limites.alimentos[1];
      }
     }else if(Isla_actual.inversion.produccion_interna.alimentos_ex < this.env.limites.alimentos_ex[1]){
      Isla_actual.inversion.produccion_interna.alimentos_ex += Isla_actual.inversion.produccion_interna.servicios + (this.env.crecimiento.alimentos * Accion.servicios);
    }

     if (Isla_actual.inversion.produccion_interna.servicios < this.env.limites.servicios[1]){
      Isla_actual.inversion.produccion_interna.servicios += this.env.crecimiento.servicios * Accion.servicios;
      if(Isla_actual.inversion.produccion_interna.servicios > this.env.limites.servicios[1]){
        Isla_actual.inversion.produccion_interna.servicios = this.env.limites.servicios[1];
      }
    }
  }

  public Poblacion(Isla_actual: Isla) {
    if (Isla_actual.poblacion > Isla_actual.inversion.produccion_interna.alimentos) {
      Isla_actual.poblacion = Isla_actual.inversion.produccion_interna.alimentos; //Si los alimentos son 0, la poblacion también
      Isla_actual.inversion.produccion_interna.alimentos = this.env.limites.alimentos[0];
    } else {
      if(Isla_actual.inversion.produccion_interna.alimentos_ex == this.env.limites.alimentos_ex[0]){
        Isla_actual.inversion.produccion_interna.alimentos -= Isla_actual.poblacion; //consumo alimentos
      }else {
        if(Isla_actual.inversion.produccion_interna.alimentos_ex < Isla_actual.poblacion){
          Isla_actual.inversion.produccion_interna.alimentos -= (Isla_actual.poblacion - Isla_actual.inversion.produccion_interna.alimentos_ex);
          Isla_actual.inversion.produccion_interna.alimentos_ex = this.env.limites.alimentos_ex[0];
        }else{
          Isla_actual.inversion.produccion_interna.alimentos_ex -= Isla_actual.poblacion; 
        } 
      }
    }

    if(Isla_actual.poblacion < this.env.limites.poblacion[0]){
      Isla_actual.poblacion = this.env.limites.poblacion[0];
    }
  }

  public Truncar(Isla_actual: Isla){

    if(Isla_actual.poblacion > this.env.limites.poblacion[1]){
      Isla_actual.poblacion = this.env.limites.poblacion[1];
    }

    if(Isla_actual.inversion.educacion > this.env.limites.educacion[1]){
      Isla_actual.inversion.educacion = this.env.limites.educacion[1];
    }

    if(Isla_actual.inversion.infraestructura > this.env.limites.infraestructura[1]){
      Isla_actual.inversion.infraestructura = this.env.limites.infraestructura[1];
    }

    if(Isla_actual.inversion.inversion_interna > this.env.limites.inversion_int[1]){
      Isla_actual.inversion.inversion_interna = this.env.limites.inversion_int[1];
    }

    if(Isla_actual.inversion.produccion_interna.alimentos > this.env.limites.alimentos[1]){
      Isla_actual.inversion.produccion_interna.alimentos_ex += (Isla_actual.inversion.produccion_interna.alimentos - this.env.limites.alimentos[1]);
      Isla_actual.inversion.produccion_interna.alimentos = this.env.limites.alimentos[1];
      if(Isla_actual.inversion.produccion_interna.alimentos_ex > this.env.limites.alimentos_ex[1]){
        Isla_actual.inversion.produccion_interna.alimentos_ex = this.env.limites.alimentos_ex[1];
      }
    }

    if(Isla_actual.inversion.produccion_interna.alimentos_ex > this.env.limites.alimentos_ex[1]){
      Isla_actual.inversion.produccion_interna.alimentos_ex = this.env.limites.alimentos_ex[1];
    }

    if(Isla_actual.inversion.produccion_interna.militar > this.env.limites.militar[1]){
      Isla_actual.inversion.produccion_interna.militar_ex += (Isla_actual.inversion.produccion_interna.militar - this.env.limites.militar[1]);
      Isla_actual.inversion.produccion_interna.militar = this.env.limites.militar[1];
      if(Isla_actual.inversion.produccion_interna.militar_ex > this.env.limites.militar_ex[1]){
        Isla_actual.inversion.produccion_interna.militar_ex = this.env.limites.militar_ex[1];
      }
    }

    if(Isla_actual.inversion.produccion_interna.tecnologia > this.env.limites.tecnologia[1]){
      Isla_actual.inversion.produccion_interna.tecnologia_ex += (Isla_actual.inversion.produccion_interna.tecnologia - this.env.limites.tecnologia[1]);
      Isla_actual.inversion.produccion_interna.tecnologia = this.env.limites.tecnologia[1];
      if(Isla_actual.inversion.produccion_interna.tecnologia_ex > this.env.limites.tecnologia_ex[1]){
        Isla_actual.inversion.produccion_interna.tecnologia_ex = this.env.limites.tecnologia_ex[1];
      }
    }

  if(Isla_actual.inversion.produccion_interna.servicios > this.env.limites.servicios[1]){
    Isla_actual.inversion.produccion_interna.servicios = this.env.limites.servicios[1];
    }
  }

  public gameOver(Isla_actual: Isla){
    if(Isla_actual.inversion.inversion_interna == this.env.limites.inversion_int[0] && Isla_actual.dinero == -5){
      Isla_actual.isla_viva = false;
    }

    if(Isla_actual.dinero == -5 && Isla_actual.recursos_naturales == this.env.limites.recursos[0]){
      Isla_actual.isla_viva = false;
    }

    if (Isla_actual.poblacion == this.env.limites.poblacion[0]) {
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

      if(Isla_actual.inversion.infraestructura >= 1)
        Isla_actual.inversion.infraestructura -= 1;
      if(Isla_actual.inversion.produccion_interna.tecnologia_ex > 0)
        Isla_actual.inversion.produccion_interna.tecnologia_ex -= 1;
      else
        Isla_actual.inversion.produccion_interna.tecnologia -= 1;

      //Matar poblacion solo si es menor
      if(Isla_actual.poblacion > Accion.desastresNaturales.nivel)
        Isla_actual.poblacion -= Accion.desastresNaturales.nivel
    }

    else{
      Accion.desastresNaturales.desastre = false;
    }
  }
}