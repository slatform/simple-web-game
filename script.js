// Game setup
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 400;
canvas.height = 600;

let player = { x: 175, y: 550, width: 50, height: 20, speed: 20 };
let blocks = [];
let score = 0;
let gameSpeed = 2;

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

// Update block positions
function updateBlocks() {
    blocks.forEach(block => {
        block.y += gameSpeed;
    });

    if (Math.random() < 0.03) { // Spawn new blocks randomly
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
            blocks.splice(i, 1); // Remove block
            gameSpeed += 0.1; // Increase difficulty
        }
    }
}

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPlayer();
    drawBlocks();
    updateBlocks();
    checkCollision();
    requestAnimationFrame(gameLoop);
}

// Player movement
document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" && player.x > 0) {
        player.x -= player.speed;
    }
    if (event.key === "ArrowRight" && player.x < canvas.width - player.width) {
        player.x += player.speed;
    }
});

// Start game
gameLoop();
