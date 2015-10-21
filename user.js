var User = function(email, id, token){
  this.email = email;
  this.id = id;
  this.token = token;
};


User.loginHandler = function(event){
  event.preventDefault();
  var $form = $('#login');
  var $email = $form.find("[name='email']");
  var $pw = $form.find("[name='password']");

  var cred = {
    "credentials": {
      "email": $email.val(),
      "password": $pw.val()
    }
  };

  $.ajax({
    method: 'POST',
    // TODO: remove hardcoded URL
    url: 'http://localhost:3000' + '/login',
    contentType: 'application/json',
    data: JSON.stringify(cred),
    dataType: 'json'
  })
    .done(function(data){
      console.log('login data is ', data);
      User.current_user = new User(data.user.email, data.user.id, data.user.id);

      Util.display('Logged In User '+ data.user.email);
      Util.showResult(data);

      $email.val('');
      $pw.val('');

    })
    .fail(function(){
      console.error('Failed to login user ' + $email.val());
      Util.display('Failed to Login User '+ $email.val());
    });
};

User.registrationHandler = function(event){
  event.preventDefault();

  var $form = $('#register');
  var $email = $form.find("[name='email']");
  var $pw = $form.find("[name='password']");
  var $pw_confirm = $form.find("[name='password_confirmation']");

  var cred = {
    "credentials": {
      "email": $email.val(),
      "password": $pw.val(),
      "password_confirmation": $pw_confirm.val()
    }
  };


  $.ajax({
    method: 'POST',
    // TODO: remove hardcoded URL
    url: 'http://localhost:3000' + '/users',
    contentType: 'application/json',
    data: JSON.stringify(cred),
    dataType: 'json'
  })
    .done(function(data){
      console.log('Data is ', data);
      Util.display('Registered user '+ data.user.email);
      Util.showResult(data);
      $email.val('');
      $pw.val('');
      $pw_confirm.val('');
    })
    .fail(function(){
      console.error('Failed to register user');
    });

};
