// This page instantiates the words that will be used in this game

// Global variables
var wordObjectArray = [];

// Function to store all word objects to local storage
function storeWordArray(){
  var stringyWordArray = JSON.stringify(wordObjectArray);
  localStorage.setItem('wordArray', stringyWordArray);
}

// Constructor function to create words
var WordObject = function(english, spanish, french, latvian, german){
  this.english = english;
  this.spanish = spanish;
  this.french = french;
  this.latvian = latvian;
  this.german = german;
  wordObjectArray.push(this);
};

// Instantiate words
new WordObject('one', 'uno', 'un', 'viens', 'ein');
new WordObject('two', 'dos', 'deux', 'divi', 'zwei');
new WordObject('three', 'tres', 'trois', 'tris', 'drei');
new WordObject('four', 'quatro', 'quatre', 'cetri', 'vier');
new WordObject('five', 'cinco', 'cinq', 'pieci', 'fünf');
new WordObject('red', 'rojo', 'six', 'sarkans', 'rot');
new WordObject('blue', 'azul', 'bleu', 'zils', 'blau');
new WordObject('green', 'verde', 'vert', 'zals', 'grün');
new WordObject('yellow', 'amarillo', 'jaune', 'dzeltens', 'gelb');
new WordObject('purple', 'púrpura', 'violet', 'lila', 'lila');
new WordObject('car', 'coche', 'voiture', 'masina', 'auto');
new WordObject('bathroom', 'baño', 'salle de bains', 'vannas istaba', 'badezimmer');
new WordObject('please', 'por favor', 's\'il vous plaît', 'ludzu', 'bitte');
new WordObject('cat', 'gato', 'chat', 'kakis', 'katze');
new WordObject('dog', 'perro', 'chien', 'suns', 'hund');
new WordObject('yes', 'sí', 'oui', 'ja', 'ja');
new WordObject('no', 'no', 'non', 'ne', 'nein');
new WordObject('hello', 'hola', 'bonjour', 'cau', 'hallo');
new WordObject('bye', 'adiós', 'au revoir', 'atta', 'tschüss');
new WordObject('monkey', 'mono', 'singe', 'pertikis', 'affe');
