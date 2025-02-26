const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.9;
canvas.height = window.innerHeight * 0.9;

let player = { x: canvas.width / 2, y: canvas.height - 50, width: 50, height: 50, speed: 5 };
let obstacles = [];
let gameSpeed = 2;
let score = 0;

function drawPlayer() {
    ctx.fillStyle = "white";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function drawObstacles() {
    ctx.fillStyle = "red";
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });
}

function updateObstacles() {
    obstacles.forEach(obstacle => {
        obstacle.y += gameSpeed;
    });

    if (Math.random() < 0.02) {
        obstacles.push({ x: Math.random() * canvas.width, y: 0, width: 50, height: 50 });
    }

    obstacles = obstacles.filter(obstacle => obstacle.y < canvas.height);
}

function detectCollision() {
    for (let obstacle of obstacles) {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            alert(`Game Over! Score: ${score}`);
            document.location.reload();
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawObstacles();
    updateObstacles();
    detectCollision();
    score++;
    gameSpeed += 0.001;
    requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    }
    if (event.key === "ArrowRight" && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
});

gameLoop();
