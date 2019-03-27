'use strict';


//This is where are the start button is being modified
var startButton = document.getElementById('startButton');
startButton.addEventListener('click', handleStartGame);

function handleStartGame(){
  console.log('The game has begun!');
}

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
var prevNumArray = [];
var tempNumArray = [];
var spanishWordlabel = [];
var formInputArray = [];
var formLabelArray = [];

var randomNumber;
var formLabel;
var formInput;
var scoreTracker = 0;
var scoresArray = [];
var stringyScore;

var numOfAsteroids= 6;
var asteroidsTracker = 0;
var formArray = [];

var formsLeft = 5;

// DOM REFERENCES
for(var i = 0; i < numOfAsteroids; i++){
  var form = document.getElementById(i);
  formArray.push(form);
}

// Constructor function to create words
var WordObject = function(english, spanish){
  this.english = english;
  this.spanish = spanish;
  wordObjectArray.push(this);
};

// Random number function
function randomizer(){
  do{
    randomNumber = Math.floor(Math.random() * wordObjectArray.length);
  }while(prevNumArray.includes(randomNumber) || tempNumArray.includes(randomNumber));

  tempNumArray.push(randomNumber);
  return randomNumber;
}

// Generating word for asteroid // TO DO
function randomWord(){
  var numSelected = randomizer();
  var selectedWord = wordObjectArray[numSelected].spanish;
  asteroidsTracker++;

  if(asteroidsTracker === numOfAsteroids){
    prevNumArray = tempNumArray;
    tempNumArray = [];
    asteroidsTracker = 0;
  }
  return selectedWord;
}

// Function to create form
function renderWord(index){
  formLabel = document.createElement('Label');
  formLabelArray.push(formLabel);
  formInput = document.createElement('input');
  formInputArray.push(formInput);
  formLabel.innerHTML = randomWord();
  spanishWordlabel.push(formLabel.innerHTML);
  formInput.name = 'formName';
  formArray[index].appendChild(formLabel);
  formArray[index].appendChild(formInput);
}

var moveAsteroidRight = 0;
// var movingPart = document.getElementById('movingPart');

//Function to check
function check(selector, userGuess){
  var grabSelectedWordFromFormLable = spanishWordlabel[selector];

  for(var i = 0; i < wordObjectArray.length; i++){
    if(grabSelectedWordFromFormLable === wordObjectArray[i].spanish){
      var checkWordObject = wordObjectArray[i];
    }
  }
  if (userGuess === checkWordObject.english){
    scoreTracker++;
    formsLeft -= 1;

    formArray[selector].removeChild(formLabelArray[selector]);
    formArray[selector].removeChild(formInputArray[selector]);

    moveAsteroidRight += 100;
    for(var i = 0; i < formArray.length; i++){
      formArray[i].style.left = moveAsteroidRight + 'px';
    }
  } else{
    moveAsteroidRight += 100;
    for(var i = 0; i < formArray.length; i++){
      formArray[i].style.left = moveAsteroidRight + 'px';
      // if(moveAsteroidRight >= 700){
      //   moveAsteroidRight -= 100;
      // }
    }
  }
}


//Event handler
function handleUserInput(event){
  event.preventDefault();
  var selector = event.target.id;
  var userGuess = event.target.formName.value.toLowerCase();
  console.log(formsLeft);
  if (formsLeft === 0 || moveAsteroidRight > 100){
    console.log('done');
    // Store score to local storage
    console.log(scoreTracker);
    // debugger;
    // localStorage.setItem('Score', scoreTracker);
    if(localStorage.getItem('Score') === null){
      scoresArray.push(scoreTracker);
      stringyScore = JSON.stringify(scoresArray);
      localStorage.setItem('Score', stringyScore);
    }else{
      stringyScore = localStorage.getItem('Score');
      scoresArray = JSON.parse(stringyScore);
      scoresArray.push(scoreTracker);
      stringyScore = JSON.stringify(scoresArray);
      localStorage.setItem('Score', stringyScore);
    }
    // TODO: pop up with score
    buildHeader();
    addRow();
  } else {
    check(selector, userGuess);
  }


}

for(var i = 0; i < formArray.length; i++){
  formArray[i].addEventListener('submit', handleUserInput);
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


var user_name;

console.log(localStorage.getItem('user_name'));
// alert(localStorage.user_name);
for (var i = 0;  i < numOfAsteroids; i++){

  renderWord(i);
}


var table_El = document.getElementById('scoreBoard');
function buildHeader() {
  var tr_El = document.createElement('tr');
  var tdOne_El = document.createElement('td');
  tdOne_El.textContent = 'rank';
  var tdTwo_El = document.createElement('td');
  tdTwo_El.textContent = 'username';
  var tdThree_El = document.createElement('td');
  tdThree_El.textContent = 'score';
  tr_El.appendChild(tdOne_El);
  tr_El.appendChild(tdTwo_El);
  tr_El.appendChild(tdThree_El);
  table_El.appendChild(tr_El);
}

function addRow() {
  for(var i = 0; i < 5; i++){
    var next_tr = document.createElement('tr');
    for(var j = 0; j < 3; j++){
      var next_td = document.createElement('td');
      next_td.textContent = scoresArray[i];
      next_tr.appendChild(next_td);
    }
    table_El.appendChild(next_tr);
  }
}

