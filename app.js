var testForm = document.getElementById('user_input');
var formSubmitHandler = function (formSubmit) {
  formSubmit.preventDefault();
  console.log(formSubmit);
  var userNameForm = formSubmit.target.user_name.value;
  console.log(userNameForm);
};
 testForm.addEventListener('submit', formSubmitHandler);



