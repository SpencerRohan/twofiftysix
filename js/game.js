function Game(board) {
  this.board = this.generateBoard(board);
}

Game.prototype = {
  generateBoard: function(board){
    if (!board) {
      var board = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      var index1 = this.generateIndex();
      var index2 = this.generateIndex();
      while (index1 === index2){
        index2 = this.generateIndex();
      }
      board.splice(index1, 1, 2);
      board.splice(index2, 1, 2);
    }
    else {
      board = board.split("").map(function(item) {
        return parseInt(item);
      });
    }
    return this.make2D(board);
  },

  make2D: function(board) {
    var newArray = [];
    newArray.push(board.slice(0, 4));
    newArray.push(board.slice(4, 8));
    newArray.push(board.slice(8, 12));
    newArray.push(board.slice(12, 16));
    return newArray;
  },

  toString: function(){
    var stringArray = this.board.map(function(row) {
      return row.join("");
    });
    return stringArray.join("\n");
  },

  toStringRaw: function() {
    var stringArray = this.board.map(function(row) {
      return row.join("");
    });
    return stringArray.join("").replace(/(.{4})/g, "$1");
  },

  generateIndex: function(){
    return Math.floor(Math.random() * 15);
  },

  generateRowColIndex: function() {
    return Math.floor(Math.random() * 3.9);
  },

  replaceCell: function(row, col, value) {
    this.board[row][col] = value;
  },

  stripEmptyCells: function(board) {
    return board.map(function(chunk) {
      return chunk.filter(function(tile) {
        return tile !== 0;
      });
    });
  },

  reduceChunk: function(chunk) {
    for (var i=0; i < chunk.length-1; i++) {
      if (chunk[i] === chunk[i+1]) {
        chunk[i] = chunk[i] * 2;
        chunk.splice(i+1, 1);
      }
    }
    return chunk;
  },

  reverseReduceChunk: function(chunk) {
    var originalChunk = chunk.map(function(i) { return i; });
    this.reduceChunk(chunk.reverse());
    if (originalChunk.toString() != chunk.toString()) {
      return chunk.reverse();
    }
    else {
      return chunk;
    }
  },

  padZerosForLeftUp: function(chunk) {
    while (chunk.length < 4) {
      chunk.push(0);
    }
    return chunk;
  },

  padZerosForRightDown: function(chunk) {
    while (chunk.length < 4) {
      chunk.unshift(0);
    }
    return chunk;
  },

  transposeBoard: function(board) {
    var transposedBoard = [[],[],[],[]];
    for (var row=0; row < board.length; row++) {
      for (var col=0; col < board.length; col++) {
        transposedBoard[col][row] = board[row][col];
      }
    }
    return transposedBoard;
  },

  move: function(direction) {
    var strippedArray = this.stripEmptyCells(this.board);
    var transposedBoard = this.transposeBoard(this.board);
    var strippedBoard = this.stripEmptyCells(transposedBoard);
    if (direction === 'left') {
      var newBoard = strippedArray.map(this.reduceChunk);
      return newBoard.map(this.padZerosForLeftUp);
    }
    else if (direction === 'right') {
      var newBoard = strippedArray.map(this.reverseReduceChunk.bind(this));
      return newBoard.map(this.padZerosForRightDown);
    }
    else if (direction === 'up') {
      var reducedBoard = strippedBoard.map(this.reduceChunk);
      var paddedBoard = reducedBoard.map(this.padZerosForLeftUp);
      return this.transposeBoard(paddedBoard);
    }
    else {
      var reducedBoard = strippedBoard.map(this.reverseReduceChunk.bind(this));
      var paddedBoard = reducedBoard.map(this.padZerosForRightDown);
      return this.transposeBoard(paddedBoard);
    }
  },

  spawnNumber: function() {
    var rowIndex = this.generateRowColIndex();
    var colIndex = this.generateRowColIndex();
    while (this.board[rowIndex][colIndex] != 0) {
      rowIndex = this.generateRowColIndex();
      colIndex = this.generateRowColIndex();
    }
    this.replaceCell(rowIndex, colIndex, 2);
  },

  checkWinner: function() {
    if (this.toString().match(/256/)){
      return true
    }
    else {
      return false
    }
  },

  checkLoser: function() {
    var boardString = this.board.toString();
    if (boardString === this.move("up").toString() &&
        boardString === this.move("down").toString() &&
        boardString === this.move("left").toString() &&
        boardString === this.move("right").toString()) {
      return true;
    }
    else {
      return false;
    }
  },

  checkForZeros: function() {
    if (this.toString().match(/0/)) {
      return true;
    }
    else {
      return false;
    }
  }
}
