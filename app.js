var testForm = document.getElementById('user_name');
var formSubmitHandler = function (formSubmit) {
  formSubmit.preventDefault();
  var userNameForm = formSubmit.target.username.value;
  
};
 testForm.addEventListener('submit', formSubmitHandler);



