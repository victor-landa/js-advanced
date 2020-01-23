// Debemos definir qué es un Observer
interface Observer {
  // Van a recibir actualización de la información, 
  // para esto le vamos a dar el método update.
  update: (data: any) => void
}

interface Subject {
  // la primer interfaz va a ser una función que va a recibir
  // a un observer de tipo Observer
  // con void definimos que el return type es undefined.
  subscribe: (observer: Observer) => void
  unsubscribe: (observer: Observer) => void
}

// Ahora vamos a crear una implementación.
// BitcoinPrice va a ser quien esté recibiendo los cambios de precio y luego
// le va a estar informando a sus suscriptores.
class BitcoinPrice implements Subject { // BitcoinPrice va a implementar la interfaz de Subject
  // Definimos la lista de observers
  observers: Observer[] = [];


  constructor() {
    const el: HTMLInputElement = document.querySelector("#value");
    el.addEventListener('input', () => {
      this.notify(el.value);
    });
  }


  // subscribe será una clase pública que va a recibir un observer.
  subscribe (observer: Observer) {
    // El observer lo va a añadir a una lista de suscriptores.
    this.observers.push(observer)
  }

  unsubscribe(observer: Observer) {
    // Primero vamos a encontrar en qué indice del arreglo observers se encuentra.
    const index = this.observers.findIndex(obs => {
      // Cuando lo encuentre nos va a regresar el índice donde está ese observer... index = índice :) 
      return obs === observer;
    })

    // Splice es una función que tienen todos los arreglos, 
    // tenemos que pasarle un índice. A partir de ese índice ¿cuántos elementos queremos sacar?.

    // Con esto sacamos al observer de la lista de observers.
    this.observers.splice(index, 1);
  }

  // Cuando el precio cambie queremos notificar a todos los subscribers
  notify(data: any) {
    this.observers.forEach(observer => observer.update(data))
  }
}

class PriceDisplay implements Observer {
  // Delcaramos `el`
  private el: HTMLElement;
  constructor() {
    this.el = document.querySelector("#price")
  }
  // Como PriceDisplay implementa Observer esto quiere decir que tiene un método update.
  update(data: any) {
    this.el.innerText = data;
  }
}

// Vamos a crear instancias para poder suscribirlas.
const value = new BitcoinPrice();
const display = new PriceDisplay();

// Suscribimos el display a los cambios en value.
value.subscribe(display);

// Desuscribimos a display del valor después de 5 segundos
setTimeout(() => {
  value.unsubscribe(display);
}, 5000);