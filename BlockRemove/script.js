const gameBoard = document.getElementById('gameBoard');
const colors = ['red', 'green', 'blue', 'yellow'];
const rows = 10;
const cols = 10;

let board = [];

// Initialize the game board with random colors
function initializeBoard() {
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            const color = colors[Math.floor(Math.random() * colors.length)];
            row.push(color);
        }
        board.push(row);
    }
    renderBoard();
}

// Render the game board
function renderBoard() {
    gameBoard.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const block = document.createElement('div');
            block.className = `block ${board[i][j]}`;
            block.addEventListener('click', () => handleBlockClick(i, j));
            gameBoard.appendChild(block);
        }
    }
}

// Handle block click event
function handleBlockClick(row, col) {
    const color = board[row][col];
    const toClear = [];
    clearBlocks(row, col, color, toClear);
    if (toClear.length > 1) {
        toClear.forEach(([r, c]) => board[r][c] = null);
        collapseBoard();
        renderBoard();
    }
}

// Clear connected blocks of the same color
function clearBlocks(row, col, color, toClear) {
    if (row < 0 || row >= rows || col < 0 || col >= cols) return;
    if (board[row][col] !== color) return;
    if (toClear.some(([r, c]) => r === row && c === col)) return;

    toClear.push([row, col]);
    board[row][col] = null;

    clearBlocks(row - 1, col, color, toClear);
    clearBlocks(row + 1, col, color, toClear);
    clearBlocks(row, col - 1, color, toClear);
    clearBlocks(row, col + 1, color, toClear);
}

// Collapse the board after blocks are cleared
function collapseBoard() {
    for (let col = 0; col < cols; col++) {
        let emptySpaces = 0;
        for (let row = rows - 1; row >= 0; row--) {
            if (board[row][col] === null) {
                emptySpaces++;
            } else if (emptySpaces > 0) {
                board[row + emptySpaces][col] = board[row][col];
                board[row][col] = null;
            }
        }
    }
}

initializeBoard();
