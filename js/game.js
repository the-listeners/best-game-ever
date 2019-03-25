'use strict';


//This is where are the start button is being modified
var startButton = document.getElementById('startButton');
startButton.addEventListener("click", handleStartGame);

function handleStartGame(){
  console.log('The game has begun!');
}

console.log('testing!');

/*
PLANNING:

Store words
  Constructor function for word objects
  Array of word objects?

Function to check word inputted with objects

Instantiate word objects

while loop


*/
// Global variables
var wordObjectArray = [];
var randomNumber;

// Constructor function to create words
var WordObject = function(english, spanish){
  this.english = english;
  this.spanish = spanish;
  wordObjectArray.push(this);
};

// Random number function
function randomizer(){
  randomNumber = Math.floor(Math.random() * wordObjectArray.length);
}

// Generating word for asteroid // TO DO
function generateAsteroidWord (){
  randomizer();
  WordObject.spanish[randomNumber];
}

// Instantiate words
new WordObject('one', 'uno');
new WordObject('two', 'dos');
new WordObject('three', 'tres');
new WordObject('four', 'quatro');
new WordObject('five', 'cinco');
new WordObject('red', 'rojo');
new WordObject('blue', 'azul');
new WordObject('green', 'verde');
new WordObject('yellow', 'amarillo');
new WordObject('purple', 'purpura');
new WordObject('car', 'coche');
new WordObject('bathroom', 'bano');
new WordObject('please', 'por favor');
new WordObject('cat', 'gato');
new WordObject('dog', 'perro');
new WordObject('yes', 'si');
new WordObject('no', 'no');
new WordObject('hello', 'hola');
new WordObject('goodbye', 'adios');
new WordObject('monkey', 'mono');

