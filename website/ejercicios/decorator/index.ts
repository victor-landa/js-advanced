// Esta clase va a representar cualquier input.
class Field {
  errors: string[];
  input: HTMLInputElement;

  // El input lo vamos a pasar en el constructor
  constructor(input: HTMLInputElement) {
    this.input = input;
    this.errors = [];

    let errorMessage = document.createElement('p');
    errorMessage.className = 'text-danger';
    this.input.parentNode.insertBefore(errorMessage, this.input.nextSibling);

    // Cada vez que le cambiemos el valor al input vamos a validar
    this.input.addEventListener('input', () => {
      this.errors = [];
      // Si esta función llega a producir un error lo va a añadir al array de this.errors
      this.validate();
      // En caso de que exista un error lo vamos a mostrar
      // errorMessage es un elemento de párrafo que añadimos en el constructor,
      // lo estamos añadiendo como pariente al input,
      // esto está sucediendo dinámicamente en el constructor.
      errorMessage.innerText = this.errors[0] || '';
    })
  }

  validate(){}
}

function RequiredFieldDecorator(field: Field): Field { // Este es nuestro decorator
  let validate = field.validate;

  field.validate = function() {
    validate();
    let value = field.input.value;
    if(!value) {
      field.errors.push("Requerido");
    }
  }

  return field;
};

function EmailFieldDecorator(field: Field): Field { // Este es nuestro decorator
  let validate = field.validate;

  field.validate = function() {
    validate();
    let value = field.input.value;
    // indexOf nos va a decir si hay un caracter 
    // o un string dentro del valor que tenemos a la izquierda
    if(value.indexOf("@") === -1) {
      field.errors.push("Debe ser un email");
    }
  }

  return field;
};

let field = new Field(document.querySelector('#email'));
// EmailFieldDecorator(RequiredFieldDecorator(field));
// también se puede escribir de la siguiente forma.
// El orden es importante
field = RequiredFieldDecorator(field);
field = EmailFieldDecorator(field);