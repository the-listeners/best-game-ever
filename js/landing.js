'use strict'

console.log('testing!');
var userArray = [];
var stringyUser;


var testForm = document.getElementById('user_input');
var formSubmitHandler = function (formSubmit) {
  formSubmit.preventDefault();
  console.log(formSubmit);

  
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




  console.log([userNameForm]);
  
  
  
};
 testForm.addEventListener('submit', formSubmitHandler);
 














 
// ===========================================================//
       // Toggle about mee//
// ===========================================================//
function aboutMeToggle() {
  var x = document.getElementById("info");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}


 
