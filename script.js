
const cells = document.querySelectorAll('.cell');
const restartButton = document.getElementById('restart');
const startGameButton = document.getElementById('startGame');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const resultDisplay = document.getElementById('result');
const gameArea = document.querySelector('.game-area');

let player1 = '';
let player2 = '';
let currentPlayer = '';
let currentSymbol = '';
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');
    
    if (gameState[index] !== '' || checkWinner()) {
        return;
    }
    
    gameState[index] = currentSymbol;
    cell.textContent = currentSymbol;
    
    if (checkWinner()) {
        resultDisplay.textContent = `${currentPlayer} (${currentSymbol}) wins!`;
        gameArea.classList.add('game-over');
    } else if (!gameState.includes('')) {
        resultDisplay.textContent = 'It\'s a tie!';
        gameArea.classList.add('game-over');
    } else {
        switchPlayer();
    }
}

function checkWinner() {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return gameState[index] === currentSymbol;
        });
    });
}

function switchPlayer() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
        currentSymbol = 'O';
    } else {
        currentPlayer = player1;
        currentSymbol = 'X';
    }
}

function restartGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = '';
    });
    resultDisplay.textContent = '';
    gameArea.classList.remove('game-over');
    currentPlayer = player1;
    currentSymbol = 'X';
}

function startGame() {
    player1 = player1Input.value.trim();
    player2 = player2Input.value.trim();
    
    if (!player1 || !player2) {
        alert('Please enter names for both players.');
        return;
    }
    
    currentPlayer = player1;
    currentSymbol = 'X';
    gameArea.style.display = 'block';
    document.querySelector('.player-inputs').style.display = 'none';
    restartGame();
}

cells.forEach(cell => cell.addEventListener('click', handleClick));
restartButton.addEventListener('click', restartGame);
startGameButton.addEventListener('click', startGame);
