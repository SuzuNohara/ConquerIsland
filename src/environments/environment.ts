export const environment = {
    production: false,
    algoritmo: {
        probabilidades: {
            desastre: 1.4
        },
        crecimiento: {
            dinero: 0.5,
            recursos_nat: 1.3,
            poblacion: 1,
            infraestructura: 1,
            educacion: 1,
            inversion_int:1,
            alimentos: 1,
            tecnologia: 1,
            militar: 1
        },
        limites: {
            dinero: [0,10],
            recursos:[0,10],
            poblacion:[0,10],
            infraestructura: [0,10],
            educacion: [0,10],
            inversion_int:[0,10],
            alimentos: [0,10],
            tecnologia: [0,10],
            militar: [0,10]
        },
        costos_dinero: {
            infraestructura: 1,
            educacion: 1,
            inversion_int:1,
            alimentos: 1,
            tecnologia: 1,
            militar: 1
        },
        costos_nat: {
            infraestructura: 1,
            educacion: 1,
            inversion_int:1,
            alimentos: 1,
            tecnologia: 1,
            militar: 1
        }
    }
}