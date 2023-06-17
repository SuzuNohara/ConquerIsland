/*export class Isla {
    public poblacion: number;
    public tecnologia: number;
    public infra: number;

    constructor() {
        this.poblacion = 0;
        this.tecnologia = 0;
        this.infra = 0;
    }
}*/

export class Isla {
    public dinero: number;// mapeable ()
    public recursos_naturales: number;// mapeable (comida, animales, maiz, verduras)
    public poblacion: number;// mapeable (personas distribuidas en la isla) // sonido
    public reservas_recursos: number;// mapeable // sonido
    public reservas_dinero: number;// mapeable // sonido
    public turno: number;// mapeable // sonido
    public isla_viva: boolean;// mapeable
    public inversion: Controles_Isla;

    constructor() {
        this.dinero = 5;
        this.recursos_naturales = 10;
        this.poblacion = 1;
        this.reservas_recursos = 0;
        this.reservas_dinero = 0;
        this.turno = 1;
        this.isla_viva = true;
        this.inversion = new Controles_Isla();
    }
}

export class Controles_Isla {
    public infraestructura: number;// mapeable (mejras en los edificios y construcciones de la isla) // sonido
    public educacion: number;// mapeable (apilar pinturas) // sonido
    public inversion_interna: number;
    public produccion_interna: Produccion;

    constructor() {
        this.infraestructura = 0;
        this.educacion = 0;
        this.inversion_interna = 0;
        this.produccion_interna = new Produccion();
    }
}

export class Produccion {
    public alimentos: number;
    public tecnologia: number;
    public militar: number;
    public servicios: number;
    public alimentos_ex: number;
    public tecnologia_ex: number;
    public militar_ex: number;

    constructor() {
        this.alimentos = 1;
        this.tecnologia = 0;
        this.militar = 0;
        this.servicios = 0;
        this.alimentos_ex = 0;
        this.tecnologia_ex = 0;
        this.militar_ex = 0;
    }
}

export class Acciones {
    public Infraestructura: number;
    public educacion: number;
    public inversion_interna: number;
    public tecnologia: number;
    public militar: number;
    public servicios: number;

    constructor(){
        this.Infraestructura = 0;
        this.educacion = 0;
        this.inversion_interna = 0;
        this.tecnologia = 0;
        this.militar = 0;
        this.servicios = 0;
    }
}