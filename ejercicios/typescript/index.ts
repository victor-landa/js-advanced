// console.log('Hello TS');

// function add(a: number, b: number) {
//   return a + b;
// }

// const sum = add(2, 3);

// -- -- -- Boolean -- -- -- //
let muted: boolean = true;
muted = false;

// -- -- -- Números -- -- -- //
let numerador: number = 42;
let denominador: number = 6;
let resultado = numerador / denominador;

// -- -- -- Nombre -- -- -- //
let nombre: string = 'Pez';
let especie: string = `Este es un ${nombre}`;

// -- -- -- Arrays -- -- -- //
let authors: string[] = [];
// authors = ['Poe', 3, 'Wolf']; // ❌
authors = ['Poe', 'Wilde', 'Wolf']; // ✅

let authorsAndYears: Array< string | number > = [];
authorsAndYears.push('Hemingway');
authorsAndYears.push(1899);

// -- -- -- Enum -- -- -- //
enum Color {
  Rojo = "Rojo", 
  Verde = "Verde", 
  Azul = "Azul"
}

let colorFavorito: Color = Color.Azul;
console.log(`Color favorito: ${colorFavorito}`);

// -- -- -- Any -- -- -- //
let book: any = "Old book";   // => ✅
book = { type: "Notebook" };  // => ✅

// let book = "Old book";   // => ❌
// book = { type: "Notebook" };  // => ❌

// -- -- -- Object -- -- -- //
let someObject: object = { name: 'Poe' };