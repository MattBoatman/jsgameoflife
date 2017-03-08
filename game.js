'use strict'
const args = process.argv;
let count;
let rows = args[2] ? args[2] : 6;
let columns = args[3] ? args[3] : 8;
let originalState;


Array.matrix = function(numrows, numcols) {
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




originalState = Array.matrix(rows,columns);
console.log(originalState); 

let neighborFunctions = [
    function _getTopRow(r,c) {
        let topIndex = r - 1;
        let startIndex = c === 0 ? 0 : c-1;
        let endIndex = c === columns ? columns : c+1; 

        if(topIndex === -1){
            return;
        }
        for(startIndex; startIndex < endIndex; startIndex++) {
            neighborCount(topIndex, startIndex);
        }
    },
    function getBottomRow(r,c) {
        let bottomIndex = r + 1;
        let startIndex = c === 0 ? 0 : c-1;
        let endIndex = c === columns ? columns : c+1;

        if(bottomIndex === originalState.length){
            return;
        }
        for(startIndex; startIndex < endIndex; startIndex++) {
            neighborCount(bottomIndex,startIndex);
        }
    },
    function getSides(r,c) {
        var leftIndex = c === 0 ? false : c-1;
        var rightIndex = c === 8 ? false : c+1; 
        if(leftIndex) {
            neighborCount(r,leftIndex);
        }
        if(rightIndex) {
            neighborCount(r,rightIndex);
        }
    }
];

function rulesForLiveCells(liveNeighbors){
    if( 2 === liveNeighbors || liveNeighbors === 3){
        return 1;
    } else {
        return 0;
    }
}   

function rulesForDeadCells(liveNeighbors) {
    if(liveNeighbors === 3) {
        return 1;
    } else {
        return 0;
    }
}

function neighborCount(r, c) {
    if(originalState[r][c] === 1){
        count++;
    }
}


function getNeighbors(r,c){
    count = 0;
    neighborFunctions.forEach(function(func){func(r,c)});
    return count;
}

function gamePlay() {
    let liveNeighborsForCurrentCell;
    let newGrid = [];

    for(let i = 0; i <= originalState.length - 1; i++) {
       let newRow = originalState[i].map(function(x, index){
            liveNeighborsForCurrentCell = getNeighbors(i, index);
            if(x) {
                return rulesForLiveCells(liveNeighborsForCurrentCell);
            } else {
                return rulesForDeadCells(liveNeighborsForCurrentCell);
            } 
        });
        newGrid.push(newRow);
    }
    console.log(newGrid)
}

gamePlay();
