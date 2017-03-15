'use strict'
const args = process.argv;
let rows = 6; 
let columns = 8;
let repeat = false;
let iterations = 0;
let playUntilDead = false;

if (args.length > 2) {
    let parsedRows = parseInt(args[2]);
    let parsedColumns = parseInt(args[3]);
    rows = parsedRows ? parsedRows : 6;
    columns = parsedColumns ? parsedColumns : 8;
    repeat = (args[4] == 'true');
    playUntilDead = (args[5] == 'true');
    if(!playUntilDead && repeat) {
        let parsedIterations = parseInt(args[6]);
        iterations = parsedIterations ? parsedIterations : false;
    }
}


Array.matrix = (numrows, numcols) => {
    let arr = [];
    for (let i = 0; i < numrows; ++i) {
        let columns = [];
        for (let j = 0; j < numcols; ++j) {
            columns[j] = Math.round(Math.random());
        }
        arr[i] = columns;
    }
    return arr;
};
let originalState = Array.matrix(rows,columns);
console.log('SEED STATE');
console.log(originalState);
console.log('\n'); 
var Game = {
 neighborFunctions : {
     getTopRow(cellData) {
        let topIndex = cellData.r - 1;

        if(topIndex === -1){
            return 0;
        } 
        return Game.getLiveCellCount(topIndex, cellData.startIndex, cellData.endIndex, cellData.originalState);
    },
    getBottomRow(cellData) {
        let bottomIndex = cellData.r + 1;

        if(bottomIndex === rows){
            return 0;
        }
        return Game.getLiveCellCount(bottomIndex, cellData.startIndex, cellData.endIndex, cellData.originalState);
    },
     getSides(cellData) {
        let leftIndex = cellData.c === 0 ? 'skip' : cellData.c-1; 
        let rightIndex = cellData.c === columns-1 ? 'skip' : cellData.c+1; 
        let count = 0;
        
        if(leftIndex !== 'skip') {
            count += Game.returnCellValue(cellData.r, leftIndex, cellData.originalState);
        }
        if(rightIndex !== 'skip') {
            count += Game.returnCellValue(cellData.r, rightIndex, cellData.originalState);
        }
        return count;
    }
},

 getLiveCellCount(rowIndex, startIndex, endIndex, grid) {
   let newArray = grid[rowIndex].slice(startIndex, endIndex+1)
    let numOfLiveCells = newArray.reduce((acc, val) => {
        return acc + val;
    }, 0);
    return numOfLiveCells;
},


 rulesForLiveCells(liveNeighbors) {
    return(liveNeighbors === 2 || liveNeighbors === 3);
},  
rulesForDeadCells(liveNeighbors) {
    return liveNeighbors === 3;
},
 returnCellValue(r, c, originalState){
    return originalState[r][c];
},
getNeighbors(cellData){
    let count = 0;
    
    for (var obj in Game.neighborFunctions) {
        if (typeof Game.neighborFunctions[obj] == "function") {
            count += Game.neighborFunctions[obj](cellData);
        }
    }
    return count;
},
gamePlay(originalState) {
    let deadYet = 0;
    let newCell;
    let newGrid = [];
    
    for(let i = 0; i <= originalState.length - 1; i++) {
       let newRow = originalState[i].map((x, index)=>{
            let startIndex = index === 0 ? 0 : index-1;
            let endIndex = index === columns-1 ? columns-1 : index+1;
            let cellData = {
               r : i,
               c : index,
               startIndex: startIndex,
               endIndex : endIndex,
               originalState : originalState
            }
            let liveNeighborsForCurrentCell = Game.getNeighbors(cellData);
            if(x) {
                newCell = +Game.rulesForLiveCells(liveNeighborsForCurrentCell);
                if(newCell && playUntilDead) {
                    deadYet++;
                }
                return newCell;
            } else {
                newCell = +Game.rulesForDeadCells(liveNeighborsForCurrentCell)
                if(newCell && playUntilDead) {
                    deadYet++;
                }
                return newCell;
            } 
        });
        newGrid.push(newRow);
    }

    console.log(newGrid)
    console.log('\n'); 

    if(deadYet === 0 && playUntilDead){
        repeat = false;
    }
    return newGrid;
}
};
if(repeat) {
    if(!iterations || playUntilDead) {
        while(repeat) {
            originalState = Game.gamePlay(originalState)
            Game.gamePlay(originalState);
        }
    }
    for(let x = 0; x < iterations; x++) {
        originalState = Game.gamePlay(originalState)
    }
} else {
    Game.gamePlay(originalState);
}

module.exports = Game;