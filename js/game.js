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
var formLabel;
var formInput;
var scoreTracker = 0;

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
  formLabel = document.createElement('Label');
  formInput = document.createElement('input');
  formLabel.innerHTML = randomWord();
  formInput.name = 'formName';
  form.appendChild(formLabel);
  form.appendChild(formInput);
}

//Event handler
function handleUserInput(event){
  event.preventDefault();
  var userGuess = event.target.formName.value.toLowerCase();
  if (userGuess === wordObjectArray[randomNumber].english){
    scoreTracker++;
    form.removeChild(formLabel);
    form.removeChild(formInput);
  } // TODO: else goes here
}

form.addEventListener('submit', handleUserInput);

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
new WordObject('purple', 'púrpura');
new WordObject('car', 'coche');
new WordObject('bathroom', 'baño');
new WordObject('please', 'por favor');
new WordObject('cat', 'gato');
new WordObject('dog', 'perro');
new WordObject('yes', 'sí');
new WordObject('no', 'no');
new WordObject('hello', 'hola');
new WordObject('goodbye', 'adiós');
new WordObject('monkey', 'mono');

renderWord();



//===================================================================//
var user_name; 

console.log(localStorage.getItem('user_name'));
alert(localStorage.user_name);