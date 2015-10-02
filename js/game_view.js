var GameView = function() {

}

GameView.prototype = {
  renderBoard: function(board) {
    for (var row=0; row < board.length; row++ ){
      for (var col=0; col < board[0].length; col++){
        if (board[row][col] == 0){
          this.renderCell(row, col, "" );
        }
        else {
          this.renderCell(row, col, board[row][col]);
        };
      };
    };
  },

  renderCell: function(row, col, value) {
    var cell = $(".row" + row + " > .col" + col);
    cell.text(value);
    var newClassAttr = "col" + col;
    if (value !== ""){
      newClassAttr += " val-" + value;
    }
    else {
      newClassAttr += " empty";
    }
    cell.attr("class", newClassAttr);
  },

  renderMessage: function(message) {
    $(".status").text(message);
  },

  removeListeners: function() {
    $(document).off();
  }
}
