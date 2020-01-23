class Singleton {
  // Tenemos 3 propiedads en Singleton
  // Hay una propiedad que es privada y es estática.
  private static instance: Singleton;

  // Tenemos un constructor privado
  private constructor() {
    // Aquí podemos inicializar variables privadas o públicas.
    // init
  }

  //Obtenemos la instancia
  static getInstance() {
    // Tenemos que mandar la misma instancia siempre, la primera vez no existe,
    // debemos crearla.
    if(!Singleton.instance) {
      // Aunque el constructor es privado, como estamos dentro de la clase, 
      //sí podemos llamarlo.
      Singleton.instance = new Singleton();
    }

    // Refresamos la instancia
    return Singleton.instance;
  }
}

export default Singleton;