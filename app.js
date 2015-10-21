$(document).ready(function(){

  // Registration Handler/Callback
  $('#register').on('submit', User.registrationHandler);

  // User Login Handler/Callback
  $('#login').on('submit', User.loginHandler);

});
