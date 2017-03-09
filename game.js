'use strict'
const args = process.argv;
let rows = args[2] ? args[2] : 6;
let columns = args[3] ? args[3] : 8;
let count, originalState;

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

function getRandom() {
  return Math.round(Math.random());
}




// originalState = Array.matrix(rows,columns);
originalState = [ [ 1, 0, 0, 0, 0, 0, 1, 1 ],
  [ 1, 1, 0, 1, 0, 0, 1, 0 ],
  [ 1, 1, 0, 1, 1, 0, 0, 0 ],
  [ 1, 1, 0, 1, 1, 1, 0, 0 ],
  [ 0, 0, 1, 0, 1, 0, 1, 0 ],
  [ 1, 1, 0, 0, 0, 1, 1, 0 ] ]
// let expectedOut = 
// [ [ 1, 1, 0, 0, 0, 0, 1, 1 ],
//   [ 0, 0, 0, 1, 1, 1, 1, 1 ],
//   [ 0, 0, 0, 0, 0, 0, 0, 0 ],
//   [ 1, 0, 0, 0, 0, 0, 0, 0 ],
//   [ 0, 0, 1, 0, 0, 0, 1, 0 ],
//   [ 0, 1, 0, 0, 0, 1, 1, 0 ] ]
console.log(originalState); 
console.log('\n'); 

let neighborFunctions = {
     getTopRow: (r,c) => {
        let topIndex = r - 1;
        let startIndex = c === 0 ? 0 : c-1;
        let endIndex = c === columns -1 ? columns-1 : c+1; 

        if(topIndex === -1){
            return;
        }
        for(startIndex; startIndex <= endIndex; startIndex++) {
            neighborCount(topIndex, startIndex);
        }
    },
    getBottomRow: (r,c) => {
        let bottomIndex = r + 1;
        let startIndex = c === 0 ? 0 : c-1;
        let endIndex = c === columns-1 ? columns-1 : c+1;

        if(bottomIndex === originalState.length){
            return;
        }
        for(startIndex; startIndex <= endIndex; startIndex++) {
            neighborCount(bottomIndex,startIndex);
        }
    },
     getSides: (r,c) => {
        var leftIndex = c === 0 ? 'skip' : c-1; 
        var rightIndex = c === columns-1 ? 'skip' : c+1; 
        
        if(leftIndex !== 'skip') {
            neighborCount(r,leftIndex);
        }
        if(rightIndex !== 'skip') {
            neighborCount(r,rightIndex);
        }
    }
};

let rules = {
    rulesForLiveCells: (liveNeighbors) => {
        return (2 === liveNeighbors || liveNeighbors === 3);
    },   
    rulesForDeadCells: (liveNeighbors) => {
        return liveNeighbors === 3;
    }
}


function neighborCount(r, c) {
    if(originalState[r][c] === 1){
        count++;
    }
}


let getNeighbors=(r,c) => {
    count = 0;
    for (var obj in neighborFunctions) {
        neighborFunctions[obj](r,c);
    }
    return count;
}

function gamePlay() {
    let liveNeighborsForCurrentCell;
    
    let newGrid = [];

    for(let i = 0; i <= originalState.length - 1; i++) {
       let newRow = originalState[i].map((x, index)=>{
            liveNeighborsForCurrentCell = getNeighbors(i, index);
            if(x) {
                return +rules.rulesForLiveCells(liveNeighborsForCurrentCell);
            } else {
                return +rules.rulesForDeadCells(liveNeighborsForCurrentCell);
            } 
        });
        newGrid.push(newRow);
    }
    console.log(newGrid)
}

gamePlay();