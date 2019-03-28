'use strict';

/*==============================================
GLOBAL VARIABLES
================================================*/

var missileDisplay = []; //Current words being displayed
var prevNumArray = []; //Track words to prevent repeats
var tempNumArray = []; //Temp store next words (to prevent duplicates)

var formArray = []; //Store all forms (aka missiles) on page
var inputArray = []; //Store all user guesses
var labelArray = []; //Store all words on label
var highScoresArray = []; //Store the highest scores
var stringyResultsArray = []; //Push results to local storage

var scoreTracker = 0; //Keeps track of score
var numOfMissiles= 5; //Changes number of missiles initiated
var missileTracker = 0; //Used to stop creation of more objects on the DOM (tracker === numMissiles)
var missileStartLocation = 0; //All missiles start at 0px
var missilesLeft = 4; //Num guesses given to the user

var numHighScoreDisplayed = 5; //Changes number of high scores being displayed

var tableHeaderArray = ['Rank', 'Name', 'Score']; //Header values
var rankArray = ['#1', '#2', '#3', '#4', '#5']; //Rank values
var userResultsObjArray = []; //Stores user data as objects in an array

/*==============================================
DOM REFERENCES
================================================*/

//This loop will create DOM references for the first missiles being initialized
//Stores them in an array
for(var i = 0; i < numOfMissiles; i++){
  var form = document.getElementById(i);
  formArray.push(form);
}
var stylesheet = document.getElementById('theme-stylesheet');

//This loop adds event listeners for each of the missile forms
for(var j = 0; j < formArray.length; j++){
  formArray[j].addEventListener('submit', handleUserInput);
}

//Reference table element for score board
var scoreBoardTable = document.getElementById('scoreBoard');

/*==============================================
CONSTRUCTOR FUNCTION
================================================*/

//Constructor for User Results
//Stores user name and their score
var UserResultsObject = function(userName, score){
  this.userName = userName;
  this.score = score;
};

/*==============================================
LOCAL STORAGE
================================================*/

//Retrieves language and theme chosen by user from storage
var language = localStorage.getItem('language');
var themeChosen = localStorage.getItem('theme');

//Retrieves array with all word objects
var stringyWordArray = localStorage.getItem('wordArray');
var wordObjectArray = JSON.parse(stringyWordArray);

//Function to access data from local storage
//Adds new user & score
//Shows array with all user data objects
function getDataFromStorage(){
  //Translate score - adds to local storage
  var userScore = scoreTracker;
  var stringyScore = JSON.stringify(userScore);
  localStorage.setItem('Score', stringyScore);

  //Translate user name - adds to local storage
  var getName = localStorage.getItem('user');
  var unStringName = JSON.parse(getName);
  var getScore = localStorage.getItem('Score');
  var unStringScore = JSON.parse(getScore);

  //Check if storage is empty
  //Yes? - initialize page
  if(localStorage.getItem('Results') === null) {
    userResultsObjArray.push(new UserResultsObject(unStringName, unStringScore));
    stringyResultsArray = JSON.stringify(userResultsObjArray);
    localStorage.setItem('Results', stringyResultsArray);
  }else {
    //No?- grab data, unstring data, push in new data, restring data, add to storage
    stringyResultsArray = localStorage.getItem('Results');
    userResultsObjArray = JSON.parse(stringyResultsArray);
    userResultsObjArray.push(new UserResultsObject(unStringName, unStringScore));

    stringyResultsArray = JSON.stringify(userResultsObjArray);
    localStorage.setItem('Results', stringyResultsArray);
  }
}

/*==============================================
OTHER FUNCTIONS
================================================*/

//This function produces a random number
//Checks to confirm that number has not been generated yet
function randomizer(){
  do {
    var randomNumber = Math.floor(Math.random() * wordObjectArray.length);
  } while(prevNumArray.includes(randomNumber) || tempNumArray.includes(randomNumber));

  tempNumArray.push(randomNumber);
  return randomNumber;
}

//This function uses the random number to select word being displayed
//Checks to make sure number of missiles is the specified amount
function randomWord(){
  var numGenerated = randomizer();
  var wordGenerated;

  //Use local storage check which language was selected
  //Find the word in the selected lang
  if(language === 'spanish'){
    wordGenerated = wordObjectArray[numGenerated].spanish;
  } else if(language === 'french'){
    wordGenerated = wordObjectArray[numGenerated].french;
  } else if(language === 'latvian'){
    wordGenerated = wordObjectArray[numGenerated].latvian;
  } else if(language === 'german'){
    wordGenerated = wordObjectArray[numGenerated].german;
  }
  //Tracks number of missiles being displayed
  missileTracker++;
  //Stop creating missiles when we reach the specified amount
  if(missileTracker === numOfMissiles){
    prevNumArray = tempNumArray;
    tempNumArray = [];
    missileTracker = 0;
  }
  return wordGenerated;
}

//Function to choose theme background for word
function addTheme(){
  if(themeChosen === 'missiles'){
    stylesheet.href = '../css/game-missiles.css';
  } else if(themeChosen === 'snakes'){
    stylesheet.href = '../css/game-snakes.css';
  } else if(themeChosen === 'cat'){
    stylesheet.href = '../css/game-cats.css';
  }
}

//This function will render the word to the DOM
//Adds a label (the random word in specified lang)
//Adds an input (where the user inputs correct english answer)
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

//This function will move the missiles
//On each turn (aka form submit) move all remaining missiles 100px
function moveMissile(){
  missileStartLocation += 100;
  for(var i = 0; i < formArray.length; i++){
    formArray[i].style.left = missileStartLocation + 'px';
  }
}

//This function will check user input with correct answer
//Search array were all word objects are stored
//Takes in form id (selector) as a parameter - used to identify which missle was selected
//Once that is identified, grab english translation of that selector
//Takes in user input (userGuess) as a parameter - used to check answer
function check(selector, userGuess){
  var userSelectedMissile = missileDisplay[selector];

  //Finds object to compare with user guess
  for(var i = 0; i < wordObjectArray.length; i++){
    if(userSelectedMissile === wordObjectArray[i].spanish
      || userSelectedMissile === wordObjectArray[i].french
      || userSelectedMissile === wordObjectArray[i].latvian
      || userSelectedMissile === wordObjectArray[i].german){
      var chosenWord = wordObjectArray[i];
    }
  }

  //Compare user guess
  if (userGuess === chosenWord.english){
    moveMissile();
    scoreTracker = scoreTracker + 1000; //If correct - increase score
    missilesLeft -= 1; //Tracks available guesses
    formArray[selector].className = 'mover';

    formArray[selector].removeChild(labelArray[selector]); //Remove from DOM
    formArray[selector].removeChild(inputArray[selector]);
  } else{
    //If wrong move all missiles
    moveMissile();
  }
}

//This function will sort the user data objects according to their score key value pair
//then slice off the top 5 objects
function getHighScores() {
  highScoresArray = [];

  userResultsObjArray.sort(function(a, b){return b.score - a.score;});
  highScoresArray = userResultsObjArray.slice(0, numHighScoreDisplayed + 1);
}

//This function will remove the game from the DOM
//and turn off the event listeners
function endGame() {
  var removeGame = document.getElementById('gameBackground').remove();
  for(var i = 0; i < formArray.length; i++){
    formArray[i].removeEventListener('submit', handleUserInput);
  }
}

//This function contains all the functions that will end game
function end(){
  getDataFromStorage();
  endGame();
  getHighScores();
  buildHeader();
  //This loop will add top players - specified by global variable
  for(var i = 0; i < numHighScoreDisplayed; i++){
    addRow(i);
  }
}

/*==============================================
FUNCTIONS FOR EVENT LISTENER
================================================*/

//Submit event handler
function handleUserInput(event){
  event.preventDefault();
  var selector = event.target.id; //Grab id of form selected
  var userGuess = event.target.formName.value.toLowerCase(); //translate user guess
  
  //Check if any missiles are left, or if missiles have reached the planet
  //Yes? - get scores from local storage, end the game, sort high scores, render scoreboard
  //Set timer to allow animation to complete before finishing game
  if (missilesLeft === 0 || missileStartLocation > 700){ 
    check(selector, userGuess);
    setTimeout(end, 3000);
  } else {
    //No? - game is not over, keep checking answers
    check(selector, userGuess);
  }
}

/*==============================================
BUILD TABLE
================================================*/

//This function will build the header for the score board
function buildHeader() {
  var header_tr = document.createElement('tr');
  for(var i = 0; i < tableHeaderArray.length; i++){
    var header_td = document.createElement('td');
    header_td.textContent = tableHeaderArray[i];

    header_tr.appendChild(header_td);
  }
  scoreBoardTable.appendChild(header_tr);
}

//This function will add rows to the able
//Takes an index as a parameter - used to access rank#, user name, and
//scores from thier arrays
function addRow(index) {
  var next_tr = document.createElement('tr');

  //Adds rank
  var rank_td = document.createElement('td');
  rank_td.textContent = rankArray[index];
  next_tr.appendChild(rank_td);

  //Adds user name
  var userName_td = document.createElement('td');
  userName_td.textContent = highScoresArray[index].userName;
  next_tr.appendChild(userName_td);

  //Adds score
  var score_td = document.createElement('td');
  score_td.textContent = highScoresArray[index].score;
  next_tr.appendChild(score_td);

  scoreBoardTable.appendChild(next_tr);
}

/*==============================================
INITIALIZE PAGE
================================================*/

//This loop will render all words to the page
for (var k = 0; k < numOfMissiles; k++){
  renderWord(k);
}
