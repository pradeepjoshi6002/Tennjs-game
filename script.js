const canvas = document.querySelector("#canvas");

const ctx = canvas.getContext("2d");

let width = canvas.width;
let height = canvas.height;

const BALL_SIZE = 5;
let ballPosition = { x: 20, y: 30 };

let xSpeed = 4;
let ySpeed = 2;

const PADDLE_WIDTH = 5;
const PADDLE_HEIGHT = 20;
const PADDLE_OFFSET = 10;

let leftPaddleTop = 10;
let rightPaddleTop = 30;

document.addEventListener("mousemove", (e) => {
  rightPaddleTop = e.y - canvas.offsetTop;
});

function update() {
  checkCollision();
  ballPosition.x += xSpeed;
  ballPosition.y += ySpeed;
}
function checkPaddleCollision(ball, paddle) {
  return (
    ball.left < paddle.right &&
    ball.right > paddle.left &&
    ball.top < paddle.bottom &&
    ball.bottom > paddle.top
  );
}
function checkCollision() {
  let ball = {
    left: ballPosition.x,
    right: ballPosition.x + BALL_SIZE,
    top: ballPosition.y,
    bottom: ballPosition.y + BALL_SIZE,
  };

  let leftPaddle = {
    left: PADDLE_OFFSET,
    right: PADDLE_OFFSET + PADDLE_WIDTH,
    top: leftPaddleTop,
    bottom: leftPaddleTop + PADDLE_HEIGHT,
  };
  let rightPaddle = {
    left: width - PADDLE_OFFSET - PADDLE_WIDTH,
    right: width - PADDLE_OFFSET,
    top: rightPaddleTop,
    bottom: rightPaddleTop + PADDLE_HEIGHT,
  };

  if (ball.left < 0 || ball.right > width) {
    xSpeed = -xSpeed;
  }
  if (ball.top < 0 || ball.bottom > height) {
    ySpeed = -ySpeed;
  }
  if (checkPaddleCollision(ball, leftPaddle)) {
    // Left paddle collision happened
    xSpeed = Math.abs(xSpeed);
  }

  if (checkPaddleCollision(ball, rightPaddle)) {
    // Right paddle collision happened
    xSpeed = -Math.abs(xSpeed);
  }
}

function draw() {
  //draw playing area
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, width, height);
  //draw ball
  ctx.fillStyle = "red";
  ctx.fillRect(ballPosition.x, ballPosition.y, BALL_SIZE, BALL_SIZE);
  //drawing paddles
  //
  ctx.fillStyle = "orange";
  //left-wall paddle
  ctx.fillRect(PADDLE_OFFSET, leftPaddleTop, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillRect(
    width - PADDLE_WIDTH - PADDLE_OFFSET,
    rightPaddleTop,
    PADDLE_WIDTH,
    PADDLE_HEIGHT
  );
}

function gameLoop() {
  draw();
  update();
  setTimeout(gameLoop, 30);
}

gameLoop();
