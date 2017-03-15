describe("Game", function() {
    var game = require('../Game');
    var grid = 
    [ [ 1, 0, 0, 0, 0, 0, 1, 1 ],
    [ 1, 1, 0, 1, 0, 0, 1, 0 ],
    [ 1, 1, 0, 1, 1, 0, 0, 0 ],
    [ 1, 1, 0, 1, 1, 1, 0, 0 ],
    [ 0, 0, 1, 0, 1, 0, 1, 0 ],
    [ 1, 1, 0, 0, 0, 1, 1, 0 ] ];
    var expectedGrid =
    [ [ 1, 1, 0, 0, 0, 0, 1, 1 ],
    [ 0, 0, 0, 1, 1, 1, 1, 1 ],
    [ 0, 0, 0, 0, 0, 0, 0, 0 ],
    [ 1, 0, 0, 0, 0, 0, 0, 0 ],
    [ 0, 0, 1, 0, 0, 0, 1, 0 ],
    [ 0, 1, 0, 0, 0, 1, 1, 0 ] ]
  describe('rulesForLiveCells', function() {
      it('Should return true when input is 2', function() {
          expect(game.rulesForLiveCells(2)).toBeTruthy();
      });
      it('Should return true when input is 3', function() {
          expect(game.rulesForLiveCells(3)).toBeTruthy();
      });
      it('Should return false when input is empty', function() {
          expect(game.rulesForLiveCells()).toBeFalsy();
      });
      it('Should return false when input is greater than 3', function() {
          expect(game.rulesForLiveCells(5)).toBeFalsy();
      });
      it('Should return false when input is less than 2', function() {
          expect(game.rulesForLiveCells(-1)).toBeFalsy();
      });
  });
  describe('rulesForDeadCells', function() {
      it('Should return true when input is 3', function() {
          expect(game.rulesForDeadCells(3)).toBeTruthy();
      });
      it('Should return false when input is empty', function() {
          expect(game.rulesForDeadCells()).toBeFalsy();
      });
      it('Should return false when input is greater than 3', function() {
          expect(game.rulesForDeadCells(5)).toBeFalsy();
      });
      it('Should return false when input is less than 3', function() {
          expect(game.rulesForDeadCells(-1)).toBeFalsy();
      });
  });
  describe('returnCellValue', function(){

      it('retrieve a specific cell value that is 1', function(){
          expect(game.returnCellValue(1,1,grid)).toEqual(1);
      })
      it('retrieve a specific cell value that is 0', function(){
          expect(game.returnCellValue(0,1,grid)).toEqual(0);
      })
  });

  describe('neighborFunctions', function(){
      it('Expect neighborFunctions to have be of length 3', function(){
          expect(Object.keys(game.neighborFunctions).length).toEqual(3);
      });
      describe('getTopRow', function(){
          it('return early if we are in top row', function(){
            var cellData = {
               r : 0,
               c : 0,
               startIndex: 0,
               endIndex : 1,
               originalState : grid
            };
              expect(game.neighborFunctions.getTopRow(cellData)).toEqual(0);
          });
          it('return 1 for a row with [1,0,0]', function(){
            var cellData = {
               r : 1,
               c : 1,
               startIndex: 0,
               endIndex : 2,
               originalState : grid
            };
              expect(game.neighborFunctions.getTopRow(cellData)).toEqual(1);
          });
          it('return 2 for a row with [1,1]', function(){
            var cellData = {
               r : 1,
               c : 7,
               startIndex: 6,
               endIndex : 7,
               originalState : grid
            };
              expect(game.neighborFunctions.getTopRow(cellData)).toEqual(2);
          });
      });
      describe('getBottomRow', function(){
          it('return early if we are in bottom row', function(){
            var cellData = {
               r : 5,
               c : 0,
               startIndex: 0,
               endIndex : 1,
               originalState : grid
            };
              expect(game.neighborFunctions.getBottomRow(cellData)).toEqual(0);
          });
          it('return 2 for a row with [1,1,0]', function(){
            var cellData = {
               r : 4,
               c : 1,
               startIndex: 0,
               endIndex : 2,
               originalState : grid
            };
              expect(game.neighborFunctions.getBottomRow(cellData)).toEqual(2);
          });
          it('return 1 for a row with [1,0]', function(){
            var cellData = {
               r : 4,
               c : 7,
               startIndex: 6,
               endIndex : 7,
               originalState : grid
            };
              expect(game.neighborFunctions.getBottomRow(cellData)).toEqual(1);
          });
      });
      describe('getSides', function(){
          var grid;
          beforeEach(function(){
            grid =    [ [ 1, 0, 0, 0, 0, 0, 1, 1 ],
                        [ 1, 1, 0, 1, 0, 0, 1, 0 ],
                        [ 1, 1, 0, 1, 1, 0, 0, 0 ],
                        [ 1, 1, 0, 1, 1, 1, 0, 0 ],
                        [ 0, 0, 1, 0, 1, 0, 1, 0 ],
                        [ 1, 1, 0, 0, 0, 1, 1, 0 ] ]
          })
          it('return 1 for a row with [1,1,0]', function(){
            var cellData = {
               r : 1,
               c : 1,
               originalState : grid
            };
              expect(game.neighborFunctions.getSides(cellData)).toEqual(1);
          });
          it('return 2 for a row with [1,1,1]', function(){
            var cellData = {
               r : 3,
               c : 4,
               originalState : grid
            };
              expect(game.neighborFunctions.getSides(cellData)).toEqual(2);
          });
      });
  });

  describe('getLiveCellCount',function(){
      it('return 3 for an array of [1,1,1]',function(){
        expect(game.getLiveCellCount(3,3,5,grid)).toEqual(3);
      });
      it('return 1 for an array of [1,0,0]',function(){
        expect(game.getLiveCellCount(0,0,2,grid)).toEqual(1);
      });
      it('return 1 for an array of [1]',function(){
        expect(game.getLiveCellCount(0,7,7,grid)).toEqual(1);
      });
  });
  describe('getNeighbors', function(){
    it('expect Game.neighborFunctions to be called 3 times', function(){
        spyOn(game.neighborFunctions, "getBottomRow");
        spyOn(game.neighborFunctions, "getTopRow");
        spyOn(game.neighborFunctions, "getSides");

            var cellData = {
               r : 3,
               c : 4,
               originalState : grid
            };
        game.getNeighbors(cellData);
        expect(game.neighborFunctions.getBottomRow).toHaveBeenCalled();
        expect(game.neighborFunctions.getTopRow).toHaveBeenCalled();
        expect(game.neighborFunctions.getSides).toHaveBeenCalled();
    });
  });
  describe('gamePlay', function(){
      it('Expect output of one tick to equal expected output', function(){
          expect(game.gamePlay(grid)).toEqual(expectedGrid);
      });
      it('check the input of getNeighbors from gamePlay', function(){
          spyOn(game, "getNeighbors");
          var expectedCall = {
               r : 0,
               c : 0,
               startIndex: 0,
               endIndex : 1,
               originalState : grid
            };
           var expectedCall1 = {
               r : 1,
               c : 1,
               startIndex: 0,
               endIndex : 2,
               originalState : grid
            };
           var expectedCall2 = {
               r : 1,
               c : 7,
               startIndex: 6,
               endIndex : 7,
               originalState : grid
            };
            game.gamePlay(grid);
            expect(game.getNeighbors).toHaveBeenCalledWith(expectedCall);
            expect(game.getNeighbors).toHaveBeenCalledWith(expectedCall1);
            expect(game.getNeighbors).toHaveBeenCalledWith(expectedCall2);
      });
  });
});
