document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const startButton = document.getElementById('startButton');
    const scoreText = document.getElementById('score');

    const gridSize = 20;
    let snake = [{ x: gridSize * 5, y: gridSize * 5 }];
    let direction = { x: 0, y: 0 };
    let food = { x: gridSize * 10, y: gridSize * 10 };
    let score = 0;
    let gameInterval;

    const drawRect = (x, y, color) => {
        ctx.fillStyle = color;
        ctx.fillRect(x, y, gridSize, gridSize);
    };

    const drawSnake = () => {
        snake.forEach(segment => drawRect(segment.x, segment.y, 'black'));
    };

    const drawFood = () => {
        drawRect(food.x, food.y, 'red');
    };

    const moveSnake = () => {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score += 10;
            scoreText.textContent = `Score: ${score}`;
            placeFood();
        } else {
            snake.pop();
        }
    };

    const placeFood = () => {
        food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
        food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;

        snake.forEach(segment => {
            if (segment.x === food.x && segment.y === food.y) {
                placeFood();
            }
        });
    };

    const checkCollision = () => {
        const head = snake[0];

        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            return true;
        }

        for (let i = 4; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }

        return false;
    };

    const update = () => {
        if (checkCollision()) {
            clearInterval(gameInterval);
            alert('Game Over! Press Start Game to play again.');
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        moveSnake();
        drawSnake();
        drawFood();
    };

    const changeDirection = (event) => {
        const keyPressed = event.keyCode;

        const UP = 38;
        const DOWN = 40;
        const LEFT = 37;
        const RIGHT = 39;

        const goingUp = direction.y === -gridSize;
        const goingDown = direction.y === gridSize;
        const goingLeft = direction.x === -gridSize;
        const goingRight = direction.x === gridSize;

        if (keyPressed === UP && !goingDown) {
            direction = { x: 0, y: -gridSize };
        }
        if (keyPressed === DOWN && !goingUp) {
            direction = { x: 0, y: gridSize };
        }
        if (keyPressed === LEFT && !goingRight) {
            direction = { x: -gridSize, y: 0 };
        }
        if (keyPressed === RIGHT && !goingLeft) {
            direction = { x: gridSize, y: 0 };
        }
    };

    const startGame = () => {
        snake = [{ x: gridSize * 5, y: gridSize * 5 }];
        direction = { x: 0, y: 0 };
        food = { x: gridSize * 10, y: gridSize * 10 };
        score = 0;
        scoreText.textContent = `Score: 0`;

        if (gameInterval) {
            clearInterval(gameInterval);
        }
        gameInterval = setInterval(update, 200);
    };

    document.addEventListener('keydown', changeDirection);
    startButton.addEventListener('click', startGame);
});
