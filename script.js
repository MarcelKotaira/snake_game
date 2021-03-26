let pontuacao_input = document.getElementById("pontuacao");
let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
};
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}
function getPontuacao() {
    return parseInt(pontuacao_input.value);
}
function addPontuacao(ponto) {
    pontuacao_input.value = ponto + getPontuacao();
}

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha() {
    let posInicial = 0;
    let posXDraw = 0;
    let posYDraw = 0;
    let tamXDraw = 0;
    let tamYDraw = 0;
    const arc = Math.PI;
    if(direction == "right") {
        posInicial = arc * 1.5;
        posXDraw = snake[0].x;
        posYDraw = snake[0].y;
        tamXDraw = posXDraw + (box / 2);
        tamYDraw = posYDraw + box;
    }
    if(direction == "down") {
        posInicial = 0;
        posXDraw = snake[0].x;
        posYDraw = snake[0].y;
        tamXDraw = posXDraw + box;
        tamYDraw = posYDraw + (box / 2);
    }
    if(direction == "left") {
        posInicial = arc * 0.5;
        posXDraw = snake[0].x + (box / 2);
        posYDraw = snake[0].y;
        tamXDraw = posXDraw + (box / 2);
        tamYDraw = posYDraw + box;
    }
    if(direction == "up") {
        posInicial = arc;
        posXDraw = snake[0].x;
        posYDraw = snake[0].y + (box / 2);
        tamXDraw = posXDraw + box;
        tamYDraw = posYDraw + (box / 2);
    }
    context.fillStyle = "green";
    context.beginPath();
    context.arc(snake[0].x + (box / 2), snake[0].y + (box / 2), box / 2, posInicial, posInicial + arc);
    context.moveTo(posXDraw, posYDraw);
    context.lineTo(tamXDraw, posYDraw);
    context.lineTo(tamXDraw, tamYDraw);
    context.lineTo(posXDraw, tamYDraw);
    context.fill();
    for(i = 1; i < snake.length; i++) {
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}

function iniciarJogo() {

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    switch(direction){
        case "right":
            snakeX += box;
            break;
        case "left":
            snakeX -= box;
            break;
        case "up":
            snakeY -= box;
            break;
        case "down":
            snakeY += box;
            break;
    }

    for(i = 1; i < snake.length; i++) {
        if(snakeX == snake[i].x && snakeY == snake[i].y) {
            clearInterval(jogo);
            alert('Game Over :(\nSua pontuação foi de: ' + getPontuacao());
        }
    }

    if(snakeX > (15 * box) && direction == "right") snakeX = 0;
    if(snakeX < 0 && direction == "left") snakeX = 15 * box;
    if(snakeY > (15 * box) && direction == "down") snakeY = 0;
    if(snakeY < 0 && direction == "up") snakeY = 15 * box;
    
    if(snakeX != food.x || snakeY != food.y) {
        snake.pop();
    }
    else {
        addPontuacao(1);
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    criarBG();
    criarCobrinha();
    drawFood();
}

let jogo = setInterval(iniciarJogo, 100);

document.getElementById("restart").addEventListener("click", function(){
    document.location.reload(true);
});