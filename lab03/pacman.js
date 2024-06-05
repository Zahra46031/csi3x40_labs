let gameState = {
    board: [],
    score: 0,
    remainingPellets: 0
};
const directions = ["left", "right"];

function moveGhost() {
    let randomDirection = directions[Math.floor(Math.random() * directions.length)];

    switch (randomDirection) {
        case "left":
            let ghostIndex = gameState.board.indexOf("^");
            let leftSpot;
            if (ghostIndex === 0) {
                leftSpot = gameState.board[gameState.board.length - 1];
                gameState.board[0] = leftSpot;
                gameState.board[gameState.board.length - 1] = "^";
            } else {
                leftSpot = gameState.board[ghostIndex - 1];
                gameState.board[ghostIndex] = leftSpot;
                gameState.board[ghostIndex - 1] = "^";
            }
            break;
        case "right":
            let ghostIndex2 = gameState.board.indexOf("^");
            let rightSpot;
            if (ghostIndex2 === gameState.board.length - 1) {
                rightSpot = gameState.board[0];
                gameState.board[0] = "^";
                gameState.board[gameState.board.length - 1] = rightSpot;
            } else {
                rightSpot = gameState.board[ghostIndex2 + 1];
                gameState.board[ghostIndex2] = rightSpot;
                gameState.board[ghostIndex2 + 1] = "^";
            }
            break;
        default:
            break;
    }
    
    setTimeout(moveGhost, 2000); 
}

function createGame(n) {
    let board = new Array(n).fill(".");
    let pacmanIndex = Math.floor(Math.random() * n);
    board[pacmanIndex] = "C";

    let ghostIndex;
    do {
        ghostIndex = Math.floor(Math.random() * n);
    } while (ghostIndex === pacmanIndex);
    board[ghostIndex] = "^";

    let fruitIndex;
    do {
        fruitIndex = Math.floor(Math.random() * n);
    } while (fruitIndex === pacmanIndex || fruitIndex === ghostIndex);
    board[fruitIndex] = "@";


    gameState.board = board;
    gameState.remainingPellets = countPellets(board); 
    gameState.score = 0;

    return board;
}

function countPellets(board) {
    return board.filter(spot => spot === ".").length;
}

function moveLeft() {
    let pacmanIndex = gameState.board.indexOf("C");
    let leftSpot;
    if(pacmanIndex === 0){
        leftSpot = gameState.board[gameState.board.length - 1];
        gameState.board[0] = leftSpot;
        gameState.board[gameState.board.length - 1] = "C";

    } else  {
        leftSpot = gameState.board[pacmanIndex - 1];
        gameState.board[pacmanIndex] = leftSpot;
        gameState.board[pacmanIndex - 1] = "C";

    }
    
     return processMove(leftSpot, pacmanIndex);
}

function moveRight() {
    let pacmanIndex = gameState.board.indexOf("C");
    let rightSpot;
    if(pacmanIndex === gameState.board.length - 1){
        rightSpot = gameState.board[0];
        gameState.board[0] = "C";
        gameState.board[gameState.board.length - 1] = rightSpot;
   
    } else  {
        rightSpot = gameState.board[pacmanIndex + 1];
        gameState.board[pacmanIndex] = rightSpot;
        gameState.board[pacmanIndex + 1] = "C"
 
    }
    
    return processMove(rightSpot, pacmanIndex);
}

function processMove(spot, index){
    if (gameState.board[index] === ".") {
        gameState.score += 10;
        gameState.remainingPellets--;
        gameState.board.splice(index, 1);
    }
 
    
    if (gameState.remainingPellets === 0) {
        return advanceLevel();
    }
    console.log(gameState.remainingPellets);
    return gameState.board;
}

function storeScore(){
    return gameState.score;
}

function advanceLevel(){
    game = createGame(10);
    gameState.board = game;
    return gameState.board
}


function updateGameBoard() {
    let gameBoardElement = document.getElementById("game-board");
    gameBoardElement.innerHTML = ""; 

    for (let i = 0; i < gameState.board.length; i++) {
        let cell = document.createElement("div");
        cell.className = "cell";
        cell.textContent = gameState.board[i];
        gameBoardElement.appendChild(cell);
    }
}
function handleKeyDown(event) {
    switch (event.key) {
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;

    }
}


document.addEventListener("keydown", handleKeyDown);

function startGame() {
 
    createGame(10);
    updateGameBoard();
    moveGhost();
}

document.addEventListener("DOMContentLoaded", startGame);