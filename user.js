var User = function(){
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
