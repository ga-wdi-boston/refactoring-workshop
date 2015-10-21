var Game = function(id){
  this.id = id;
};

Game.prototype.setPlayerX = function(player){
  this.player1 = player;
};

Game.prototype.setPlayerO = function(player){
  this.player2 = player;
};

Game.prototype.changeCurrentPlayer = function(){

  if (Game.currentPlayer === this.player1){
    Game.currentPlayer = this.player2;
  }else{
    Game.currentPlayer = this.player2;
  }
  return Game.currentPlayer;
};

Game.currentGame = null;
Game.currentPlayer = null;

Game.createGameHandler = function(event){
  event.preventDefault();

  Board.reset('board_game');

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
      Game.currentPlayer = player;

      // fake user for now
      Game.currentGame.setPlayerO(new User('foo@bar.com', -1));

      Util.display('Current Player is '+ player.email + ' Game id is ' + Game.currentGame.id);
      Util.showResult(data);
    })
    .fail(function(){
      console.error("Error creating game");
    });
}; // end of createGameHandler
