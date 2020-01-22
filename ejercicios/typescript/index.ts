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



// -- -- -- Functions -- -- -- //
// Añadimos :number después de los parámetros para especificar
// que tipo de dato va a regresar.
function add(a: number, b: number): number {
  return a + b;
}

const sum = add(1982, 1456);

// -- -- ¿Qué pasa si una función regresa otra función? -- --
// Después de los dos puntos representa la función, qué toma? un number y.. qué regresa? un number!
function createAdder(a: number): (number) => number {
  return function(b: number) {
    return b + a;
  }
}

const addFour = createAdder(4);
const fourPlusSix = addFour(6);

// -- -- -- Function with optional parameters -- -- --
// Con ?: estamos permitiendo que el argumento que se reciba pueda ser undefined.
// function showFullName(firstName: string, lastName?: string): string {
// En este caso si no se provee un parámetro, la función tomará un argumento como placeholder.
function showFullName(firstName: string, lastName: string = "Smith"): string {
  return `${firstName} ${lastName}`;
}

const carl = showFullName("Carl");
console.log(carl);