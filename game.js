Array.matrix = function(numrows, numcols) {
    var arr = [];
    for (var i = 0; i < numrows; ++i) {
        var columns = [];
        for (var j = 0; j < numcols; ++j) {
            columns[j] = getRandom();
        }
        arr[i] = columns;
    }
    return arr;
};

function getRandom() {
  return Math.round(Math.random());
}



(function foo(){ 
    var start = Array.matrix(6,8);
    var count;

    console.log(start); 

    _getNeighbors(2,2);

    function _getNeighbors(r,c){
        count = 0;
        _getBottomRow(r,c);
        _getTopRow(r,c);
        _getSides(r,c);

    //     console.log('bottom',_getBottomRow(r,c));
    //    console.log('top', _getTopRow(r,c));
    //    console.log('sides', _getSides(r,c));
       console.log(count);
    }

    function _getTopRow(r,c) {
        var topIndex = r - 1;
        var startIndex = c === 0 ? 0 : c-1;
        var endIndex = c === 8 ? 8 : c+1; 

        if(topIndex === -1){
            return;
        }
        // console.log('top row')
        for(startIndex; startIndex <= endIndex; startIndex++) {
            // console.log(start[topIndex][startIndex]);
            // if(start[topIndex][startIndex] === 1){
            //     count++;
            // }
            neighborCount(topIndex, startIndex);
        }
        // return count;
    }

    function _getBottomRow(r,c) {
        var bottomIndex = r + 1;
        var startIndex = c === 0 ? 0 : c-1;
        var endIndex = c === 8 ? 8 : c+1; //fix this when asking user for input

        if(bottomIndex === 9){
            return;
        }
        // console.log('bottom row')
        for(startIndex; startIndex <= endIndex; startIndex++) {
            // console.log(start[bottomIndex][startIndex]);
            // if(start[bottomIndex][startIndex] === 1){
            //     count++;
            // }
            neighborCount(bottomIndex,startIndex);
        }
        // return count;
    }

    function _getSides(r,c) {
        // var bottomIndex = r + 1;
        var leftIndex = c === 0 ? false : c-1;
        var rightIndex = c === 8 ? false : c+1; 
        if(leftIndex) {
            neighborCount(r,leftIndex);
            // if(start[r][leftIndex] === 1){
            //     count++;
            // }
        }
        if(rightIndex) {
            neighborCount(r,rightIndex);
            // if(start[r][rightIndex] === 1){
            //     count++;
            // }
        }
        // return count;
    }

    function neighborCount(r, c) {
        if(start[r][c] === 1){
            count++;
        }
    }

})();
