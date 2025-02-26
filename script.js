// Game setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

// Player settings
let player = { x: 175, y: 550, width: 50, height: 20, speed: 5, movingLeft: false, movingRight: false };

// Falling blocks
let blocks = [];
let score = 0;
let gameSpeed = 2;

// Cloud settings
let clouds = [{ x: 50, y: 100, size: 80 }, { x: 250, y: 200, size: 100 }];

// Draw player
function drawPlayer() {
    ctx.fillStyle = "blue";
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

// Draw falling blocks
function drawBlocks() {
    ctx.fillStyle = "red";
    blocks.forEach(block => {
        ctx.fillRect(block.x, block.y, block.width, block.height);
    });
}

// Draw clouds
function drawClouds() {
    ctx.fillStyle = "white";
    clouds.forEach(cloud => {
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.size / 2, 0, Math.PI * 2);
        ctx.arc(cloud.x + 30, cloud.y + 10, cloud.size / 2.5, 0, Math.PI * 2);
        ctx.arc(cloud.x - 30, cloud.y + 10, cloud.size / 2.5, 0, Math.PI * 2);
        ctx.fill();
    });

    // Move clouds slowly for animation effect
    clouds.forEach(cloud => {
        cloud.x += 0.2;
        if (cloud.x > canvas.width + 50) {
            cloud.x = -50;
        }
    });
}

// Update block positions
function updateBlocks() {
    blocks.forEach(block => {
        block.y += gameSpeed;
    });

    if (Math.random() < 0.03) {
        blocks.push({ x: Math.random() * (canvas.width - 50), y: 0, width: 50, height: 50 });
    }

    blocks = blocks.filter(block => block.y < canvas.height);
}

// Check collision
function checkCollision() {
    for (let i = 0; i < blocks.length; i++) {
        let block = blocks[i];
        if (
            player.x < block.x + block.width &&
            player.x + player.width > block.x &&
            player.y < block.y + block.height &&
            player.y + player.height > block.y
        ) {
            score += 10;
            document.getElementById("score").textContent = score;
            blocks.splice(i, 1);
            gameSpeed += 0.1;
        }
    }
}

// Smooth player movement
function updatePlayerPosition() {
    if (player.movingLeft && player.x > 0) {
        player.x -= player.speed;
    }
    if (player.movingRight && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
}

// Event listeners for holding keys
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
        player.movingLeft = true;
    }
    if (event.key === "ArrowRight") {
        player.movingRight = true;
    }
});

document.addEventListener("keyup", (event) => {
    if (event.key === "ArrowLeft") {
        player.movingLeft = false;
    }
    if (event.key === "ArrowRight") {
        player.movingRight = false;
    }
});

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawClouds();
    drawPlayer();
    drawBlocks();
    updateBlocks();
    checkCollision();
    updatePlayerPosition();
    requestAnimationFrame(gameLoop);
}

// Start game
gameLoop();
