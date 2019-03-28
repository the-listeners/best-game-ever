'use strict'

/*==============================================
GLOBAL VARIABLES
================================================*/

var userName;
var stringyUser;

/*==============================================
DOM REFERENCES
================================================*/

//Reference form
var testForm = document.getElementById('user_input');

/*==============================================
FUNCTIONS AND SUBMIT EVENT LISTENER
================================================*/
//Redirects to game page after user inputs name, selects language, and hits enter
function redirect(){
  window.location.href='pages/game.html';
}

//Submit event handler
var formSubmitHandler = function (formSubmit) {
  formSubmit.preventDefault();

  // Storing username to local storage
  var userNameForm = formSubmit.target.user_name.value;
  userName = userNameForm;
  stringyUser = JSON.stringify(userName);
  localStorage.setItem('user', stringyUser);

  // Storing language chosen to local storage
  var languageChosen = formSubmit.target.languageSelection.value;
  localStorage.setItem('language', languageChosen);
};
//Add listener for form submit
testForm.addEventListener('submit', formSubmitHandler);

//This function adds some fun!
//Special effects - Meteor moving in background
function myMove() {
  var elem = document.getElementById('myAnimation');   
  var pos = 0;
  var id = setInterval(frame, 15);
  function frame() {
    if (pos == 8000
    ) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.bottom = pos + 'px'; 
      elem.style.right = pos + 'px'; 
    }
  }
}

/*==============================================
INITIALIZE PAGE
================================================*/


//Stores array with word objects to local
storeWordArray();
myMove();

