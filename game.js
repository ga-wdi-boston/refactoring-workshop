var Game = function(id){
  this.id = id;
};

Game.prototype.setPlayerX = function(player){
  this.player1 = player;
};

Game.currentGame = null;

Game.createGameHandler = function(event){
  event.preventDefault();

  if(User.currentUser === undefined){
    Util.display('You Must Login before creating a game');
    return;
  };

  $.ajax({
    method: 'POST',
    // TODO: remove hardcoded URL
    url: 'http://localhost:3000' + '/games',
    headers: {
      Authorization: 'Token token=' + User.currentUser.token
    },
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({}),
    dataType: 'json'
  })
    .done(function(data){
      console.log("Create game data is ", data);
      Game.currentGame = new Game(data.game.id);
      var player = new User(data.game.player_x.email, data.game.player_x.id);
      Game.currentGame.setPlayerX(player);
      Util.display('Current Player is '+ player.email + ' Game id is ' + Game.currentGame.id);
      Util.showResult(data);
    })
    .fail(function(){
      console.error("Error creating game");
    });
}; // end of createGameHandler
