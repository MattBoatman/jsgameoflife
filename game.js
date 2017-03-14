'use strict'
const args = process.argv;
let rows = 6; 
let columns = 8;
let repeat = false;
let iterations = 0;
let playUntilDead = false;

if (process.argv.length > 2) {
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
            columns[j] = getRandom();
        }
        arr[i] = columns;
    }
    return arr;
};

let getRandom = () => {
  return Math.round(Math.random());
}

let neighborFunctions = {
     getTopRow(cellData) {
        let topIndex = cellData.r - 1;
        let startIndex = cellData.c === 0 ? 0 : cellData.c-1;
        let endIndex = cellData.c === columns -1 ? columns-1 : cellData.c+1; 

        if(topIndex === -1){
            return 0;
        }
        for(startIndex; startIndex <= endIndex; startIndex++) {
            cellData.count += neighborCount(topIndex, startIndex, cellData.originalState);
        }
        return cellData.count;
    },
    getBottomRow(cellData) {
        let bottomIndex = cellData.r + 1;
        let startIndex = cellData.c === 0 ? 0 : cellData.c-1;
        let endIndex = cellData.c === columns-1 ? columns-1 : cellData.c+1;

        if(bottomIndex === rows){
            return 0;
        }
        for(startIndex; startIndex <= endIndex; startIndex++) {
            cellData.count += neighborCount(bottomIndex, startIndex, cellData.originalState);
        }
        return cellData.count;
    },
     getSides(cellData) {
        var leftIndex = cellData.c === 0 ? 'skip' : cellData.c-1; 
        var rightIndex = cellData.c === columns-1 ? 'skip' : cellData.c+1; 
        
        if(leftIndex !== 'skip') {
            cellData.count += neighborCount(cellData.r, leftIndex, cellData.originalState);
        }
        if(rightIndex !== 'skip') {
            cellData.count += neighborCount(cellData.r, rightIndex, cellData.originalState);
        }
        return cellData.count;
    }
};

let rules = {
    rulesForLiveCells: (liveNeighbors) => {
        return(2 === liveNeighbors || liveNeighbors === 3);
    },   
    rulesForDeadCells: (liveNeighbors) => {
        return liveNeighbors === 3;
    }
}


let neighborCount = (r, c, originalState) => {
    return originalState[r][c];
}


let getNeighbors = (cellData) => {
    for (var obj in neighborFunctions) {
        if (typeof neighborFunctions[obj] == "function") {
            // neighborFunctions[obj](this.r, this.c, this.originalState);
            neighborFunctions[obj](cellData);
            // let x = neighborFunctions.getBottomRow.bind(this);
        }
    }
    return cellData.count;
}

function gamePlay(originalState) {
    let liveNeighborsForCurrentCell;
    let deadYet = 0;
    let newCell;
    let newGrid = [];
    
    for(let i = 0; i <= originalState.length - 1; i++) {
       let newRow = originalState[i].map((x, index)=>{
           let cellData = {
               r : i,
               c : index,
               count: 0,
               originalState : originalState
           }
           liveNeighborsForCurrentCell = getNeighbors(cellData);
            // liveNeighborsForCurrentCell = getNeighbors(i, index, originalState);
            if(x) {
                newCell = +rules.rulesForLiveCells(liveNeighborsForCurrentCell);
                if(newCell) {
                    deadYet++;
                }
                return newCell;
            } else {
                newCell = +rules.rulesForDeadCells(liveNeighborsForCurrentCell)
                if(newCell) {
                    deadYet++;
                }
                return newCell;
            } 
        });
        newGrid.push(newRow);
    }

    console.log(newGrid)
    console.log('\n'); 

    if(deadYet === 0){
        repeat = false;
    }
    return newGrid;
}
    let originalState = Array.matrix(rows,columns);
//    let originalState = [ [ 1, 0, 0, 0, 0, 0, 1, 1 ],
//   [ 1, 1, 0, 1, 0, 0, 1, 0 ],
//   [ 1, 1, 0, 1, 1, 0, 0, 0 ],
//   [ 1, 1, 0, 1, 1, 1, 0, 0 ],
//   [ 0, 0, 1, 0, 1, 0, 1, 0 ],
//   [ 1, 1, 0, 0, 0, 1, 1, 0 ] ]
// let expectedOut = 
// [ [ 1, 1, 0, 0, 0, 0, 1, 1 ],
//   [ 0, 0, 0, 1, 1, 1, 1, 1 ],
//   [ 0, 0, 0, 0, 0, 0, 0, 0 ],
//   [ 1, 0, 0, 0, 0, 0, 0, 0 ],
//   [ 0, 0, 1, 0, 0, 0, 1, 0 ],
//   [ 0, 1, 0, 0, 0, 1, 1, 0 ] ]
console.log('SEED STATE');
// neighborFunctions.getBottomRow(1,1,originalState)
// console.log(neighborFunctions.count);
console.log(originalState);
console.log('\n'); 
if(repeat) {
    if(!iterations || playUntilDead) {
        while(repeat) {
            originalState = gamePlay(originalState)
            gamePlay(originalState);
        }
    }
    for(let x = 0; x < iterations; x++) {
        originalState = gamePlay(originalState)
    }
} else {
    gamePlay(originalState);
}

