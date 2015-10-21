var Board = {
  cells: [],
  reset: function(boardID){
    this.cells = [];
    var board = $('#game_board').find('.box_cell').html('');
  },

  setCellHandler: function(event){
    event.preventDefault();
    var $target = $(event.target),
        cellID = $target.data('cell');
        //         cell = new Cell(id, Game.currentPlayer);
    console.log("you clicked on ",cellID );

    //    cell.render();
    Game.changeCurrentPlayer();
    $target.html('X');
  }
};
