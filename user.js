var User = function(){

};

User.registrationHandler = function(event){
  event.preventDefault();
  console.log("Clicked on the registration button");

  // get the DOM element for the registration form
  var $form = $('#register');
  // get the DOM element for the email input field
  var $email = $form.find('[name="email"]');
  // get the DOM element for the password input field
  var $pw = $form.find('[name="password"]');
   // get the DOM element for the password input field
  var $pw_confirm = $form.find('[name="password_confirmation"]');

  // Fill the object cred with the values I entered in the 
  // form fields
  var cred = {
    "credentials": {
      "email": $email.val(),
      "password": $pw.val(),
      "password_confirmation": $pw_confirm.val()
    }
  };  

  // Initiate a AJAX HTTP Request to 
  // http://localhost:3000/users
  // It will be a POST
  // It's sending JSON
  var requestObj = $.ajax({
    method: 'POST',
    url: 'http://localhost:3000' + '/users',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify(cred),
    dataType: 'json'
  });
  // When the server replies to the AJAX HTTP Request
  // and is a success then call the function passed to the
  // done method. 
  // The function passed to done, in this case and anonymous function,
  // will get a parameter that is the data being sent back by the server.
  requestObj.done(function(data){
    // If the AJAX works then the server will send back
    // data
    console.log("data from server is " + data);
    var registeredUserEmail = data.user.email;
    var registeredUserID = data.user.id;

    Util.display('Registered user ' + registeredUserEmail);

    // emptys the input fields for registration
    $email.val('');
    $pw.val('');
    $pw_confirm.val('');
  });

  // When the server replies to the AJAX HTTP Request
  // and is a NOT success then call the function passed to the
  // fail method.
  requestObj.fail(function(){
    // If the AJAX fails the server will invoke this function.
    console.error('Failed to register user ', $email.val());
    debugger;
  });





  debugger;
};