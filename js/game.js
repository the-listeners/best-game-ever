'use strict';

// Global variables
var prevNumArray = [];
var tempNumArray = [];
var spanishWordlabel = [];
var formInputArray = [];
var formLabelArray = [];

var randomNumber;

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

// Generating word for asteroid // TO DO
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

var moveAsteroidRight = 0;
// var movingPart = document.getElementById('movingPart');

//Function to check
function check(selector, userGuess){
  var grabSelectedWordFromFormLabel = spanishWordlabel[selector];

  for(var i = 0; i < wordObjectArray.length; i++){
    if(grabSelectedWordFromFormLabel === wordObjectArray[i].spanish || grabSelectedWordFromFormLabel === wordObjectArray[i].french || grabSelectedWordFromFormLabel === wordObjectArray[i].latvian){
      var checkWordObject = wordObjectArray[i];
    }
  }

  if (userGuess === checkWordObject.english){
    scoreTracker++;
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
    getHighScores();
    buildHeader();
    for(var i = 0; i < 5; i++){
      addRow(i);
    }
  } else {
    check(selector, userGuess);
  }


}

for(var i = 0; i < formArray.length; i++){
  formArray[i].addEventListener('submit', handleUserInput);
}


var user_name;

// alert(localStorage.user_name);

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


var highScoresArray = [];

//Constructor for User Results
var UserResultsObject = function(userName, score){
  this.userName = userName;
  this.score = score;
};


//function that collects highest scores

function getHighScores() {
  highScoresArray = [];
  userResultsObjArray.sort(function(a, b){return b.score - a.score});
  highScoresArray = userResultsObjArray.slice(0, 6);
  console.log(highScoresArray);
}
