// This page instantiates the words that will be used in this game

// Global variables
var wordObjectArray = [];

// Function to store all word objects to local storage
function storeWordArray(){
  var stringyWordArray = JSON.stringify(wordObjectArray);
  localStorage.setItem('wordArray', stringyWordArray);
}

// Constructor function to create words
var WordObject = function(english, spanish, french){
  this.english = english;
  this.spanish = spanish;
  this.french = french;
  wordObjectArray.push(this);
};

// Instantiate words
new WordObject('one', 'uno', 'un');
new WordObject('two', 'dos', 'deux');
new WordObject('three', 'tres', 'trois');
new WordObject('four', 'quatro', 'quatre');
new WordObject('five', 'cinco', 'cinq');
new WordObject('red', 'rojo', 'six');
new WordObject('blue', 'azul', 'bleu');
new WordObject('green', 'verde', 'vert');
new WordObject('yellow', 'amarillo', 'jaune');
new WordObject('purple', 'púrpura', 'violet');
new WordObject('car', 'coche', 'voiture');
new WordObject('bathroom', 'baño', 'salle de bains');
new WordObject('please', 'por favor', 's\'il vous plait');
new WordObject('cat', 'gato', 'chat');
new WordObject('dog', 'perro', 'chien');
new WordObject('yes', 'sí', 'oui');
new WordObject('no', 'no', 'non');
new WordObject('hello', 'hola', 'bonjour');
new WordObject('goodbye', 'adiós', 'au revoir');
new WordObject('monkey', 'mono', 'singe');

// Stores word array to local storage
storeWordArray();
