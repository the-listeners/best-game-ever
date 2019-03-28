'use strict'
myMove();
// Global variables
var userName;
var stringyUser;

// DOM references
var testForm = document.getElementById('user_input');

// redirects when
function redirect(){
  window.location.href='pages/game.html';
}

// Event handler for username and language selection
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


// Username submit listener
testForm.addEventListener('submit', formSubmitHandler);

// Stores word array to local storage
storeWordArray();

 // ===========================================================//
// chet moving around after clicking enter
// ===========================================================//

function myMove() {
  var elem = document.getElementById("myAnimation");   
  var pos = 0;
  var id = setInterval(frame, 100);
  function frame() {
    if (pos == 300) {
      clearInterval(id);
    } else {
      pos++; 
      elem.style.bottom = pos + 'px'; 
      elem.style.right = pos + 'px'; 
    }
  }
}


// redirects when
function redirect(){
  window.location.href="pages/game.html";
}



