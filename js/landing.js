'use strict'

// Global variables
var userArray = [];
var stringyUser;

// DOM references
var testForm = document.getElementById('user_input');

// Event handler for username and language selection
var formSubmitHandler = function (formSubmit) {
  formSubmit.preventDefault();

  // Storing username to local storage
  var userNameForm = formSubmit.target.user_name.value;
  if (localStorage.getItem('user') === null){
    userArray.push(userNameForm);
    stringyUser = JSON.stringify(userArray);
    localStorage.setItem('user', stringyUser);

  } else{
    stringyUser = localStorage.getItem('user');
    userArray = JSON.parse(stringyUser);
    userArray.push(userNameForm);
    stringyUser = JSON.stringify(userArray);
    localStorage.setItem('user', stringyUser);
  }

  // Storing language chosen to local storage
  var languageChosen = formSubmit.target.languageSelection.value;
  localStorage.setItem('language', languageChosen);

};

// Username submit listener
testForm.addEventListener('submit', formSubmitHandler);

// Stores word array to local storage
storeWordArray();

// ===========================================================//
// Toggle about me
// ===========================================================//
function aboutMeToggle() {
  var x = document.getElementById("info");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


 
