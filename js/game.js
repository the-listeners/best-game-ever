'use strict';

// Global variables
var prevNumArray = [];
var tempNumArray = [];
var spanishWordlabel = [];
var formInputArray = [];
var formLabelArray = [];
var highScoresArray = [];

var randomNumber;
var numHighScoreDisplayed = 5;

var formLabel;
var formInput;
var scoreTracker = 0;
var userScore;
var stringyScore;
var stringyResultsArray = [];

var numOfAsteroids= 5;
var asteroidsTracker = 0;
var formArray = [];

var formsLeft = 5;
var moveAsteroidRight = 0;

// DOM REFERENCES
for(var i = 0; i < numOfAsteroids; i++){
  var form = document.getElementById(i);
  formArray.push(form);
}

// Retrieves language:
var language = localStorage.getItem('language');

// Retrieves word array
var stringyWordArray = localStorage.getItem('wordArray');
var wordObjectArray = JSON.parse(stringyWordArray);

// Random number function
function randomizer(){
  do{
    randomNumber = Math.floor(Math.random() * wordObjectArray.length);
  }while(prevNumArray.includes(randomNumber) || tempNumArray.includes(randomNumber));

  tempNumArray.push(randomNumber);
  return randomNumber;
}

// Generating word for asteroid
function randomWord(){
  var numSelected = randomizer();
  var selectedWord;

  if(language === 'spanish'){
    selectedWord = wordObjectArray[numSelected].spanish;
  } else if(language === 'french'){
    selectedWord = wordObjectArray[numSelected].french;
  } else if(language === 'latvian'){
    selectedWord = wordObjectArray[numSelected].latvian;
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

//Function to check
function check(selector, userGuess){
  var grabSelectedWordFromFormLabel = spanishWordlabel[selector];

  for(var i = 0; i < wordObjectArray.length; i++){
    if(grabSelectedWordFromFormLabel === wordObjectArray[i].spanish || grabSelectedWordFromFormLabel === wordObjectArray[i].french || grabSelectedWordFromFormLabel === wordObjectArray[i].latvian){
      var checkWordObject = wordObjectArray[i];
    }
  }

  if (userGuess === checkWordObject.english){
    scoreTracker = scoreTracker + 1000;
    formsLeft -= 1;
    formArray[selector].className = 'mover';

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
  if (formsLeft === 0 || moveAsteroidRight > 100){
    // Store score to local storage
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
    endGame();
    getHighScores();
    buildHeader();
    for(var i = 0; i < numHighScoreDisplayed; i++){
      addRow(i);
    }
    playAgain();
  } else {
    check(selector, userGuess);
  }
}

for(var i = 0; i < formArray.length; i++){
  formArray[i].addEventListener('submit', handleUserInput);
}

// Loop to render all words into array and stores it
for (var i = 0; i < numOfAsteroids; i++){
  renderWord(i);
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
  userResultsObjArray.sort(function(a, b){return b.score - a.score});
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
