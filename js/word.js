// This page instantiates the words that will be used in this game

// Global variables
var wordObjectArray = [];

// Function to store all word objects to local storage
function storeWordArray(){
  var stringyWordArray = JSON.stringify(wordObjectArray);
  localStorage.setItem('wordArray', stringyWordArray);
}

// Constructor function to create words
var WordObject = function(english, spanish, french, latvian){
  this.english = english;
  this.spanish = spanish;
  this.french = french;
  this.latvian = latvian;
  wordObjectArray.push(this);
};

// Instantiate words
new WordObject('one', 'uno', 'un', 'viens');
new WordObject('two', 'dos', 'deux', 'divi');
new WordObject('three', 'tres', 'trois', 'tris');
new WordObject('four', 'quatro', 'quatre', 'cetri');
new WordObject('five', 'cinco', 'cinq', 'pieci');
new WordObject('red', 'rojo', 'six', 'sarkans');
new WordObject('blue', 'azul', 'bleu', 'zils');
new WordObject('green', 'verde', 'vert', 'zals');
new WordObject('yellow', 'amarillo', 'jaune', 'dzeltens');
new WordObject('purple', 'púrpura', 'violet', 'lila');
new WordObject('car', 'coche', 'voiture', 'masina');
new WordObject('bathroom', 'baño', 'salle de bains', 'vannas istaba');
new WordObject('please', 'por favor', 's\'il vous plait', 'ludzu');
new WordObject('cat', 'gato', 'chat', 'kakis');
new WordObject('dog', 'perro', 'chien', 'suns');
new WordObject('yes', 'sí', 'oui', 'ja');
new WordObject('no', 'no', 'non', 'ne');
new WordObject('hello', 'hola', 'bonjour', 'cau');
new WordObject('goodbye', 'adiós', 'au revoir', 'atta');
new WordObject('monkey', 'mono', 'singe', 'pertikis');
