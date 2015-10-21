$(document).ready(function(){

  // Registration Handler/Callback
  $('#register').on('submit', User.registrationHandler);

  // User Login Handler/Callback
  $('#login').on('submit', User.loginHandler);

  // Create Game Handler/Callback
  $('#create-game').on('submit', Game.createGameHandler);

  $('#game_board').on('click', Board.setCellHandler);

});
