const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const scoreDisplay = document.getElementById('score');
        const usernameInput = document.getElementById('username');

        const box = 20;
        let snake;
        let food;
        let d;
        let game;
        let score;
        let leaderboard = [];

        function initializeGame() {
            snake = [];
            snake[0] = { x: 9 * box, y: 10 * box };

            food = {
                x: Math.floor(Math.random() * 19 + 1) * box,
                y: Math.floor(Math.random() * 19 + 1) * box
            };

            d = null;
            score = 0;
            updateScore();
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
                food = {
                    x: Math.floor(Math.random() * 19 + 1) * box,
                    y: Math.floor(Math.random() * 19 + 1) * box
                };
            } else {
                snake.pop();
            }

            let newHead = { x: snakeX, y: snakeY };

            if (snakeX < 0 || snakeX > 19 * box || snakeY < 0 || snakeY > 19 * box || collision(newHead, snake)) {
                clearInterval(game);
                updateLeaderboard(); 
            }

            snake.unshift(newHead);
        }

        function updateLeaderboard() {
            leaderboard.push(score);
            leaderboard.sort((a, b) => b - a); 
            displayLeaderboard();
        }

        function displayLeaderboard() {
            const username = usernameInput.value.trim() || 'Anonymous';
            const topScoresList = document.getElementById('topScores');
            topScoresList.innerHTML = '';

            for (let i = 0; i < leaderboard.length; i++) {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.innerText = `${username}: ${leaderboard[i]}`;
                topScoresList.appendChild(li);
            }
        }
        function setMode(mode) {
            const controls = document.getElementById('control_buttons');
            if (mode === 'pc') {
                controls.style.display = 'none';
            } else if (mode === 'mobile') {
                controls.style.display = 'block';
            }
        }
        window.onload = function() {
            setMode('pc'); // Set the mode to PC by default
            initializeGame();
            document.addEventListener('keydown', direction);
            document.getElementById('resetButton').addEventListener('click', initializeGame);
        };
        
        initializeGame();
        document.addEventListener('keydown', direction);
        document.getElementById('resetButton').addEventListener('click', initializeGame);