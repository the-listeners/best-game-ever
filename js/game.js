'use strict';


//This is where are the start button is being modified
var startButton = document.getElementById('startButton');

function handleStartGame(){
  console.log('The game has begun!');
}

startButton.addEventListener('click', handleStartGame);

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

var language;

var formLabel;
var formInput;
var scoreTracker = 0;
var userScore;
var stringyScore;
var stringyResultsArray = [];

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
var WordObject = function(english, spanish, french){
  this.english = english;
  this.spanish = spanish;
  this.french = french;
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

  language = localStorage.getItem('language');
  var selectedWord;

  if(language === 'spanish'){
    selectedWord = wordObjectArray[numSelected].spanish;
  } else if(language === 'french'){
    selectedWord = wordObjectArray[numSelected].french;
  }

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

// Function to store all word objects to local storage
function storeWordArray(){
  var stringyWordArray = JSON.stringify(wordObjectArray);
  localStorage.setItem('wordArray', stringyWordArray);
}

var moveAsteroidRight = 0;
// var movingPart = document.getElementById('movingPart');

//Function to check
function check(selector, userGuess){
  var grabSelectedWordFromFormLabel = spanishWordlabel[selector];

  for(var i = 0; i < wordObjectArray.length; i++){
    if(grabSelectedWordFromFormLabel === wordObjectArray[i].spanish || grabSelectedWordFromFormLabel === wordObjectArray[i].french){
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
    // localStorage.setItem('Score', scoreTracker);
    userScore = scoreTracker;
    stringyScore = JSON.stringify(userScore);
    localStorage.setItem('Score', stringyScore);


    var getName = localStorage.getItem('user');
    var unStringName = JSON.parse(getName);
    var getScore = localStorage.getItem('Score');
    var unStringScore = JSON.parse(getScore);

    if(localStorage.getItem('Results') === null) {
      userResultsObjArray.push(new UserResultsObject(unStringName, unStringScore));
      stringyResultsArray = JSON.stringify(userResultsObjArray);
      localStorage.setItem('Results', stringyResultsArray);
    }else {
      stringyResultsArray = localStorage.getItem('Results');
      userResultsObjArray = JSON.parse(stringyResultsArray);
      userResultsObjArray.push(new UserResultsObject(unStringName, unStringScore));

      stringyResultsArray = JSON.stringify(userResultsObjArray);
      localStorage.setItem('Results', stringyResultsArray);
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
new WordObject('please', 'por favor', 's \'il vous plait');
new WordObject('cat', 'gato', 'chat');
new WordObject('dog', 'perro', 'chien');
new WordObject('yes', 'sí', 'oui');
new WordObject('no', 'no', 'non');
new WordObject('hello', 'hola', 'bonjour');
new WordObject('goodbye', 'adiós', 'au revoir');
new WordObject('monkey', 'mono', 'singe');


var user_name;

// alert(localStorage.user_name);

// Loop to render all words into array and stores it
for (var i = 0; i < numOfAsteroids; i++){
  renderWord(i);
}

// Stores word array to local storage
storeWordArray();

var tableHeaderArray = ['Rank', 'User Name', 'Score'];
var rankArray = ['#1', '#2', '#3', '#4', '#5'];
var userResultsObjArray = [];

// Table for score
var scoreBoardTable = document.getElementById('scoreBoard');
function buildHeader() {
  var header_tr = document.createElement('tr');
  for(var i = 0; i < tableHeaderArray.length; i++){
    var header_td = document.createElement('td');
    header_td.textContent = tableHeaderArray[i];

    header_tr.appendChild(header_td);
  }
  scoreBoardTable.appendChild(header_tr);
}

function addRow() {

  var next_tr = document.createElement('tr');

  var rank_td = document.createElement('td');
  rank_td.textContent = rankArray[0];
  next_tr.appendChild(rank_td);

  var userName_td = document.createElement('td');
  userName_td.textContent = userResultsObjArray[0].userName;
  next_tr.appendChild(userName_td);

  var score_td = document.createElement('td');
  score_td.textContent = userResultsObjArray[0].score;
  next_tr.appendChild(score_td);

  scoreBoardTable.appendChild(next_tr);
}


var highScoresArray = [];

//Constructor for User Results
var UserResultsObject = function(userName, score){
  this.userName = userName;
  this.score = score;

};


//function that collects highest scores

function getHighScores() {
  highScoresArray = [];
  userResultsObjArray.sort(function(a, b){return a.score - b.score});
  highScoresArray = userResultsObjArray.slice(0, 6);
}
