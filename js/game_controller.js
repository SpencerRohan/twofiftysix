var GameController = function() {
  this.game = new Game();
  this.view = new GameView();
}

GameController.prototype = {
  start: function() {
    this.bindEvents();
    this.view.renderBoard(this.game.board);
  },

  bindEvents: function (){
    $(document).on("keyup", this.handleInput.bind(this));
  },

  handleInput: function(event) {
    var keyBindings = {
      37: this.operateLeft,
      38: this.operateUp,
      39: this.operateRight,
      40: this.operateDown
    }
    keyBindings[event.keyCode].bind(this).apply();
    this.updateGame();
    this.view.renderBoard(this.game.board);
  },

  operateLeft: function(){
    this.game.board = this.game.move('left');
  },

  operateUp: function(){
    this.game.board = this.game.move('up');
  },

  operateRight: function(){
    this.game.board = this.game.move('right');
  },

  operateDown: function(){
    this.game.board = this.game.move('down');
  },

  updateGame: function() {
    if (this.game.checkForZeros()) {
      this.game.spawnNumber();
    }
    if (this.game.checkWinner()) {
      this.view.renderMessage("YOU HAVE DEFEATED ME!");
      this.view.removeListeners();
    }
    else if (this.game.checkLoser()) {
      this.view.renderMessage("PUNY HUMAN! I KNEW YOU'D FAIL.");
      this.view.removeListeners();
    }
  }

}
