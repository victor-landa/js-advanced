import Singleton from './Singleton';

// Debemos recordar que el constructor es privado 
// y que le método público es getInstance para obtener la instancia
const a = Singleton.getInstance();
const b = Singleton.getInstance();

console.log("A es igual a B?", a===b);

// Resultado en consola => true, significa que 
// a es la misma instancia que b 
