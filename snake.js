const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

const box = 20;
let snake;
let food;
let d;
let game;
let score;

function initializeGame() {
    snake = [];
    snake[0] = { x: 9 * box, y: 10 * box };

    d = null;
    score = 0;
    updateScore();
    generateFood(); // Generate initial food position
    clearInterval(game);
    game = setInterval(draw, 100);
}

function direction(event) {
    let key = event.keyCode;
    if (key == 37 && d != "RIGHT") {
        d = "LEFT";
    } else if (key == 38 && d != "DOWN") {
        d = "UP";
    } else if (key == 39 && d != "LEFT") {
        d = "RIGHT";
    } else if (key == 40 && d != "UP") {
        d = "DOWN";
    }
}

// Event listeners for direction buttons
document.getElementById('btnUp').addEventListener('click', function() {
    if (d != "DOWN") {
        d = "UP";
    }
});

document.getElementById('btnDown').addEventListener('click', function() {
    if (d != "UP") {
        d = "DOWN";
    }
});

document.getElementById('btnLeft').addEventListener('click', function() {
    if (d != "RIGHT") {
        d = "LEFT";
    }
});

document.getElementById('btnRight').addEventListener('click', function() {
    if (d != "LEFT") {
        d = "RIGHT";
    }
});

function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (head.x == array[i].x && head.y == array[i].y) {
            return true;
        }
    }
    return false;
}

function updateScore() {
    scoreDisplay.innerText = "Score: " + score;
}

function generateFood() {
    let newFood;
    do {
        newFood = {
            x: Math.floor(Math.random() * 19 + 1) * box,
            y: Math.floor(Math.random() * 19 + 1) * box
        };
    } while (collision(newFood, snake)); // Regenerate if food spawns on the snake's body
    food = newFood;
}

function draw() {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = (i == 0) ? "green" : "white";
        ctx.strokeStyle = "red";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (d == "LEFT") snakeX -= box;
    if (d == "UP") snakeY -= box;
    if (d == "RIGHT") snakeX += box;
    if (d == "DOWN") snakeY += box;

    if (snakeX == food.x && snakeY == food.y) {
        score++;
        updateScore();
        generateFood(); // Generate new food position after eating
    } else {
        snake.pop();
    }

    let newHead = { x: snakeX, y: snakeY };

    if (snakeX < 0 || snakeX > 19 * box || snakeY < 0 || snakeY > 19 * box || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over! Press Reset to start again.");
    }

    snake.unshift(newHead);
}

// Initialize game and event listeners
initializeGame();
document.addEventListener('keydown', direction);
document.getElementById('resetButton').addEventListener('click', initializeGame);
