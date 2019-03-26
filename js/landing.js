'use strict'

console.log('testing!');
var user_name_LS = [];



var testForm = document.getElementById('user_input');
var formSubmitHandler = function (formSubmit) {
  formSubmit.preventDefault();
  console.log(formSubmit);

  
  var userNameForm = formSubmit.target.user_name.value;
  console.log([userNameForm]);
  user_name_LS = userNameForm;
  localStorage.setItem('user_name', JSON.stringify(user_name_LS));
  
};
 testForm.addEventListener('submit', formSubmitHandler);
 

// ===========================================================//












 
