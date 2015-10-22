var User = function(email, id, token){
  this.email = email;
  this.id = id;
  this.token = token;
};

// NOt for a specific its for all Users
//User.currentUser = null;

User.loginHandler = function(event){
  event.preventDefault();

  var $form = $('#login');
  var $email = $form.find('[name="email"]');
  var $pw = $form.find('[name="password"]'); 
  
  // construct a object that will be sent to the server
  // to login a User.
  var cred= {
    "credentials": {
      "email": $email.val(),
      "password": $pw.val()
    }
   };

   // Send cred to the server at a specific url
   var reqObj = $.ajax({
      method: 'POST',
      // TODO: remove the hardcoded server URL
      url: 'http://localhost:3000' + '/login',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify(cred),
      dataType: 'json'
   });

   reqObj.done(function(serverData){
    User.currentUser = new User(serverData.user.email, serverData.user.id, serverData.user.token);
    Util.display("Logged In User is " + User.currentUser.email);
    debugger;
   });

   reqObj.fail(function(){
    console.log('failed to login user');
    debugger;
   });
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