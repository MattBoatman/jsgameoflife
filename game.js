'use strict'
const args = process.argv;
let rows = 6; //check if int
let columns = 8;
let repeat = false;
let iterations = 0;
let playUntilDead = false;
// let originalState;

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

//Crockfords
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
    count: 0,
     getTopRow(r, c, originalState) {
        let topIndex = r - 1;
        let startIndex = c === 0 ? 0 : c-1;
        let endIndex = c === columns -1 ? columns-1 : c+1; 

        if(topIndex === -1){
            return;
        }
        for(startIndex; startIndex <= endIndex; startIndex++) {
            this.count += +neighborCount(topIndex, startIndex, originalState);
        }
    },
    getBottomRow(r, c, originalState) {
        let bottomIndex = r + 1;
        let startIndex = c === 0 ? 0 : c-1;
        let endIndex = c === columns-1 ? columns-1 : c+1;

        if(bottomIndex === rows){
            return;
        }
        for(startIndex; startIndex <= endIndex; startIndex++) {
            this.count += +neighborCount(bottomIndex, startIndex, originalState);
        }
    },
     getSides(r, c, originalState) {
        var leftIndex = c === 0 ? 'skip' : c-1; 
        var rightIndex = c === columns-1 ? 'skip' : c+1; 
        
        if(leftIndex !== 'skip') {
            this.count += +neighborCount(r, leftIndex, originalState);
        }
        if(rightIndex !== 'skip') {
            this.count += +neighborCount(r, rightIndex, originalState);
        }
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


let getNeighbors = (r, c, originalState) => {
    neighborFunctions.count = 0;
    for (var obj in neighborFunctions) {
        if (typeof neighborFunctions[obj] == "function") {
            neighborFunctions[obj](r, c, originalState);
        }
    }
    return neighborFunctions.count;
}

function gamePlay(originalState) {
    let liveNeighborsForCurrentCell;
    let deadYet = 0;
    let newCell;
    let newGrid = [];

    // console.log(originalState); 
    
    
    for(let i = 0; i <= originalState.length - 1; i++) {
       let newRow = originalState[i].map((x, index)=>{
            liveNeighborsForCurrentCell = getNeighbors(i, index, originalState);
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

