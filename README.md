# jsgameoflife

## Background
The playing field for Conway’s game of life consists of a two dimensional grid of cells. Each cell is identified as either alive or dead. For this exercise, let’s assume the playing field is an 8x6 grid of cells (i.e. 8 columns, 6 rows).
The challenge is to calculate the next state of the playing field given any initial grid state. To find the next state, follow these rules:
1. Any live cell with fewer than two live neighbors dies, as if caused by under- population.
2. Any live cell with more than three live neighbors dies, as if by overcrowding.
3. Any live cell with two or three live neighbors lives on to the next generation.
4. Any dead cell with exactly three live neighbors becomes a live cell.
5. A cell’s neighbors are those cells which are horizontally, vertically or
diagonally adjacent. Most cells will have eight neighbors. Cells placed on the edge of the grid will have fewer.

## How to Run
This was built using node version 4.4.3, using vscode as editor of choice. 
The basic game can be run using `node game` which will then use the default parameters. This will create a randomly seeded 6x8 matrix and play for one generation.

From here you can start adding parameters:

`node game [rows:int] [columns:int] [repeat:boolean] [extinction:boolean] [iterations:number]` 

### Rows and Columns Example

`node game 6 8`

#### Output
```
SEED STATE
[ [ 1, 1, 0, 1, 0, 0, 1, 0 ],
  [ 0, 1, 1, 0, 1, 1, 0, 1 ],
  [ 1, 0, 0, 1, 1, 0, 1, 0 ],
  [ 0, 0, 1, 0, 0, 1, 1, 1 ],
  [ 1, 0, 0, 0, 0, 1, 1, 1 ],
  [ 0, 0, 1, 0, 1, 1, 1, 0 ] ]


[ [ 1, 1, 0, 1, 1, 1, 1, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 1, 0, 1, 0, 0, 0, 0 ],
  [ 0, 1, 0, 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 1, 0, 0, 1 ] ]
  ```
  
### Repeat
  
`node game 6 8 true`

#### Output
```
node game 6 8 true
SEED STATE
[ [ 0, 0, 0, 0, 1, 0, 1, 1 ],
  [ 0, 0, 0, 1, 0, 1, 1, 0 ],
  [ 1, 1, 0, 0, 0, 0, 1, 1 ],
  [ 0, 0, 0, 1, 1, 0, 1, 1 ],
  [ 0, 1, 0, 1, 1, 1, 0, 1 ],
  [ 0, 0, 0, 0, 1, 0, 1, 0 ] ]


[ [ 0, 0, 0, 0, 1, 0, 1, 1 ],
  [ 0, 0, 0, 0, 1, 0, 0, 0 ],
  [ 0, 0, 1, 1, 0, 0, 0, 0 ],
  [ 1, 1, 0, 1, 0, 0, 0, 0 ],
  [ 0, 0, 1, 0, 0, 0, 0, 1 ],
  [ 0, 0, 0, 1, 1, 0, 1, 0 ] ]


[ [ 0, 0, 0, 0, 0, 1, 0, 0 ],
  [ 0, 0, 0, 0, 1, 1, 0, 0 ],
  [ 0, 1, 1, 1, 1, 0, 0, 0 ],
  [ 0, 1, 0, 1, 0, 0, 0, 0 ],
  [ 0, 1, 1, 0, 1, 0, 0, 0 ],
  [ 0, 0, 0, 1, 0, 0, 0, 0 ] ]


[ [ 0, 0, 0, 0, 0, 1, 0, 0 ],
  [ 0, 0, 0, 0, 1, 1, 0, 0 ],
  [ 0, 1, 1, 1, 1, 0, 0, 0 ],
  [ 0, 1, 0, 1, 0, 0, 0, 0 ],
  [ 0, 1, 1, 0, 1, 0, 0, 0 ],
  [ 0, 0, 0, 1, 0, 0, 0, 0 ] ]
  ...
  ...
  This will keep repeating indefinitely and your computer blows up
  ```
  
  ### Play Until Extinct
  `node game 6 8 true true`
  
  #### Output 
  Would be same as above but keep playing until the board shows all 0
  
  ### Specify Iterations
  `node game 6 8 true false 4`
  
  #### NOTE play until extinct needs to be false
  
  #### Output
  ```
  SEED STATE
[ [ 1, 1, 1, 0, 1, 1, 1, 1 ],
  [ 0, 1, 0, 1, 0, 0, 0, 1 ],
  [ 0, 1, 0, 1, 0, 0, 0, 1 ],
  [ 0, 1, 1, 1, 0, 0, 0, 1 ],
  [ 0, 1, 0, 1, 1, 0, 1, 0 ],
  [ 1, 1, 0, 1, 1, 1, 1, 0 ] ]


[ [ 1, 1, 1, 1, 1, 1, 1, 1 ],
  [ 0, 0, 0, 1, 0, 1, 0, 1 ],
  [ 1, 1, 0, 1, 1, 0, 1, 1 ],
  [ 1, 1, 0, 0, 0, 0, 1, 1 ],
  [ 0, 0, 0, 0, 0, 0, 1, 1 ],
  [ 1, 1, 0, 1, 0, 0, 1, 0 ] ]


[ [ 0, 1, 1, 1, 0, 1, 0, 1 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 1, 1, 0, 1, 1, 0, 0, 0 ],
  [ 1, 1, 1, 0, 0, 0, 0, 0 ],
  [ 0, 0, 1, 0, 0, 1, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 1, 1 ] ]


[ [ 0, 0, 1, 0, 0, 0, 0, 0 ],
  [ 1, 0, 0, 0, 0, 0, 0, 0 ],
  [ 1, 0, 0, 1, 0, 0, 0, 0 ],
  [ 1, 0, 0, 0, 1, 0, 0, 0 ],
  [ 0, 0, 1, 0, 0, 0, 1, 0 ],
  [ 0, 0, 0, 0, 0, 0, 1, 0 ] ]


[ [ 0, 0, 0, 0, 0, 0, 0, 0 ],
  [ 0, 1, 0, 0, 0, 0, 0, 0 ],
  [ 1, 1, 0, 0, 0, 0, 0, 0 ],
  [ 0, 1, 0, 1, 0, 0, 0, 0 ],
  [ 0, 0, 0, 0, 0, 1, 0, 0 ],
  [ 0, 0, 0, 0, 0, 0, 0, 0 ] ]
  ```
