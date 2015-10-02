describe( "Game", function () {
  var game;
  var game2

  beforeEach(function(){
    game = new Game();
    game2 = new Game("0000000000000022");
  });

  describe("#generateBoard", function() {
    it("creates a 4-item array", function(){
      expect(game.board.length).toBe(4);
    });

    it("always starts a new board with two '2'", function(){
      var match = game.toStringRaw().match(/0*20*20*/);
      expect(match[0].length).toBe(16);
    });
  });

  describe("#toString", function(){
    it("Breaks up a 16 digit sting into 4 parts", function(){
      expect(game2.toString()).toBe("0000\n0000\n0000\n0022");
    });
  });

  describe("#generateIndex", function(){
    it("returns a random number 0 - 15", function(){
      var number = game2.generateIndex();
      var test = number >= 0 && number <= 15
      expect(test).toBeTruthy();
    });
  });

  describe("#replaceCell", function() {
    it("replaces a cell in the board", function() {
      game2.replaceCell(2, 3, "2");
      expect(game2.toString()).toBe("0000\n0000\n0002\n0022");
    });
  });

  describe("#stripEmptyCells", function() {
    it("Removes all zeros out of board", function() {
      expect(game2.stripEmptyCells(game2.board)[3]).toEqual([ 2,2 ]);
    });
  });


  describe("#padZerosForLeftUp", function() {
    it("Adds zero padding on right side", function() {
      expect(game2.padZerosForLeftUp([2,2])).toEqual([2,2,0,0]);
    });
  });

  describe("#padZerosForRightDown", function() {
    it("Adds zero padding on left side", function() {
      expect(game2.padZerosForRightDown([2,2])).toEqual([0,0,2,2]);
    });
  });

  describe("#reverseReduceChunk", function() {
    it("should return ", function() {
      expect(game2.reverseReduceChunk([2,2,2])).toEqual([2,4]);
    });
  });

  describe("#move", function() {
    it("returns a board that has moved right", function() {
      var board = game2.move("right")
      expect(board).toEqual([[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,4]])
    });

    it("returns a board that has moved left", function() {
      var board = game2.move("left")
      expect(board).toEqual([[0,0,0,0],[0,0,0,0],[0,0,0,0],[4,0,0,0]])
    });

    it("returns a board that has moved up", function() {

    });

    it("returns a board that has moved down", function() {

    });
  });

  describe("#transposeBoard", function() {
    it("#", function() {

    });
  });

  describe("#generateRowColIndex", function() {
    it("#", function() {

    });
  });

  describe("#spawnNumber", function() {
    it("#", function() {

    });
  });

  describe("#checkWinner", function() {
    it("#", function() {

    });
  });

  describe("#checkLoser", function() {
    it("#", function() {

    });
  });

});
