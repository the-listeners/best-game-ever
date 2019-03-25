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
var selectedWord;

// DOM REFERENCES
var form = document.getElementById('asteroids');

// Constructor function to create words
var WordObject = function(english, spanish){
  this.english = english;
  this.spanish = spanish;
  wordObjectArray.push(this);
};

// Random number function
function randomizer(){
  randomNumber = Math.floor(Math.random() * wordObjectArray.length);
  console.log(randomNumber);
}

// Generating word for asteroid // TO DO
function randomWord(){
  randomizer();
  var selectedWord = wordObjectArray[randomNumber].spanish;
  return selectedWord;
}

// Function to create form
function renderWord(){
  var formLabel = document.createElement('Label');
  formLabel.innerHTML = randomWord();
  form.appendChild(formLabel);
}

function handleUserInput1(){
  //check
  
}

form.addEventListener('submit', handleUserInput1);

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


renderWord();