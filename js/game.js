'use strict';

// Global variables
var prevNumArray = [];
var tempNumArray = [];
var missileDisplay = [];
var inputArray = [];
var labelArray = [];
var highScoresArray = [];
var stringyResultsArray = [];
var formArray = [];

var scoreTracker = 0;
var numOfMissiles= 5;
var missileTracker = 0;
var missileLocation = 0;

var missilesLeft = 4;

var numHighScoreDisplayed = 5;

// DOM REFERENCES
for(var i = 0; i < numOfMissiles; i++){
  var form = document.getElementById(i);
  formArray.push(form);
}
var stylesheet = document.getElementById('theme-stylesheet');

// Retrieves language and theme chosen by user
var language = localStorage.getItem('language');
var themeChosen = localStorage.getItem('theme');

// Retrieves word array
var stringyWordArray = localStorage.getItem('wordArray');
var wordObjectArray = JSON.parse(stringyWordArray);

// Random number function
function randomizer(){
  do {
    var randomNumber = Math.floor(Math.random() * wordObjectArray.length);
  } while(prevNumArray.includes(randomNumber) || tempNumArray.includes(randomNumber));

  tempNumArray.push(randomNumber);
  return randomNumber;
}

// Generating word for missile
function randomWord(){
  var numGenerated = randomizer();
  var wordGenerated;

  if(language === 'spanish'){
    wordGenerated = wordObjectArray[numGenerated].spanish;
  } else if(language === 'french'){
    wordGenerated = wordObjectArray[numGenerated].french;
  } else if(language === 'latvian'){
    wordGenerated = wordObjectArray[numGenerated].latvian;
  } else if(language === 'german'){
    wordGenerated = wordObjectArray[numGenerated].german;
  }

  missileTracker++;

  if(missileTracker === numOfMissiles){
    prevNumArray = tempNumArray;
    tempNumArray = [];
    missileTracker = 0;
  }
  return wordGenerated;
}

// Function to choose theme background for word
function addTheme(){
  if(themeChosen === 'missiles'){
    stylesheet.href = '../css/game-missiles.css';
  } else if(themeChosen === 'snakes'){
    stylesheet.href = '../css/game-snakes.css';
  }
}

// Function to create form
function renderWord(index){
  var formLabel = document.createElement('Label');
  labelArray.push(formLabel);
  var formInput = document.createElement('input');
  inputArray.push(formInput);
  formLabel.innerHTML = randomWord();
  missileDisplay.push(formLabel.innerHTML);
  formInput.name = 'formName';
  addTheme();
  formArray[index].appendChild(formLabel);
  formArray[index].appendChild(formInput);
}

// Function to move missile
function moveMissile(){
  missileLocation += 100;
  for(var i = 0; i < formArray.length; i++){
    formArray[i].style.left = missileLocation + 'px';
  }
}

//Function to check
function check(selector, userGuess){
  var userSelectedMissile = missileDisplay[selector];

  for(var i = 0; i < wordObjectArray.length; i++){
    if(userSelectedMissile === wordObjectArray[i].spanish || userSelectedMissile === wordObjectArray[i].french || userSelectedMissile === wordObjectArray[i].latvian || userSelectedMissile === wordObjectArray[i].german){
      var chosenWord = wordObjectArray[i];
    }
  }

  if (userGuess === chosenWord.english){
    moveMissile();
    scoreTracker = scoreTracker + 1000;
    missilesLeft -= 1;
    formArray[selector].className = 'mover';

    formArray[selector].removeChild(labelArray[selector]);
    formArray[selector].removeChild(inputArray[selector]);
  } else{
    moveMissile();
  }
}

function end(){


  var userScore = scoreTracker;
  var stringyScore = JSON.stringify(userScore);
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
  endGame();
  getHighScores();
  buildHeader();
  for(var i = 0; i < numHighScoreDisplayed; i++){
    addRow(i);
  }
  playAgain();
}

//Event handler
function handleUserInput(event){
  event.preventDefault();
  var selector = event.target.id;
  var userGuess = event.target.formName.value.toLowerCase();
  if (missilesLeft === 0 || missileLocation > 700){
    // Store score to local storage
    check(selector, userGuess);
    setTimeout(end, 3000);

  } else {
    check(selector, userGuess);
  }
}

for(var j = 0; j < formArray.length; j++){
  formArray[j].addEventListener('submit', handleUserInput);
}

// Loop to render all words into array and stores it
for (var k = 0; k < numOfMissiles; k++){
  renderWord(k);
}

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

function addRow(index) {
  var next_tr = document.createElement('tr');

  var rank_td = document.createElement('td');
  rank_td.textContent = rankArray[index];
  next_tr.appendChild(rank_td);

  var userName_td = document.createElement('td');
  userName_td.textContent = highScoresArray[index].userName;
  next_tr.appendChild(userName_td);

  var score_td = document.createElement('td');
  score_td.textContent = highScoresArray[index].score;
  next_tr.appendChild(score_td);

  scoreBoardTable.appendChild(next_tr);
}

//Constructor for User Results
var UserResultsObject = function(userName, score){
  this.userName = userName;
  this.score = score;
};

//function that collects highest scores
function getHighScores() {
  highScoresArray = [];

  userResultsObjArray.sort(function(a, b){return b.score - a.score;});
  highScoresArray = userResultsObjArray.slice(0, numHighScoreDisplayed + 1);
}

function endGame() {
  var removeGame = document.getElementById('gameBackground').remove();
  // removeGame.visibility = hidden;
  for(var i = 0; i < formArray.length; i++){
    formArray[i].removeEventListener('submit', handleUserInput);
  }
}

function playAgain(){
  var endOfGameOptions = document.getElementById('endGame');
  var playAgainLink = document.createElement('a');
  playAgainLink.href='../index.html';
  playAgainLink.textContent = 'Play Again?';
  endOfGameOptions.appendChild(playAgainLink);
}
