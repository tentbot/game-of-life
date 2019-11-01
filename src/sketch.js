let grid;
let step = 20;
let cols;
let rows;
let playing = false;

function setup() {
    createCanvas(800, 800);
    cols = floor(width / step);
    rows = floor(height / step);
    frameRate(20);
    newGame();
}

function draw() {
    background(0);

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            //Draws the current generation
            let x = i * step;
            let y = j * step;
            if (grid[i][j] === 1) {
                fill(255);
                stroke(0);
                rect(x, y, step - 1, step - 1);
            }
        }
    }

    if (playing) {
        let temp = make2DArray(cols, rows);
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                //Counts the neighbours
                let neighbours = countNeighbours(grid, i, j);
                //Applies the rules of the game
                if (neighbours === 2) temp[i][j] = grid[i][j];
                else if (neighbours === 3) temp[i][j] = 1;
                else temp[i][j] = 0;
            }
        }
        grid = temp;
    }
}

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }
    return arr;
}

function countNeighbours(grid, x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols;
            let row = (y + j + rows) % rows;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function newGame() {
    grid = make2DArray(cols, rows);
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = floor(random(2) * 0.9);
        }
    }
}

function clearGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = 0;
        }
    }
}

function mousePressed() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let x = i * step;
            let y = j * step;
            if (mouseX > x && mouseX < x + step) {
                if (mouseY > y && mouseY < y + step) {
                    if (grid[i][j] === 1) {
                        grid[i][j] = 0;
                    } else {
                        grid[i][j] = 1;
                    }
                }
            }
        }
    }
}
