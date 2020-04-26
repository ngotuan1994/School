// JavaScript Snake example
// CPSC254: project

// Variables of Frame
var canvas;
var ctx;

// Variables of Characters
var redApple;
var poison;
var head;
var greenApple;
var tail;
var paint;

// Variables of Characters' Position
var dots;
var greenApple_x;
var greenApple_y;
var poison_x;
var poison_y;
var redApple_x;
var redApple_y;

// Variables of Control Game
var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var enterPressed = false;
var hitWall = false;
var hitYourself = false;
var hitPosion = false;
var inGame = true;
var samePosition = false;
var score=0;
var increasedSpeed = 0;
var randomValue;
var setRedApple = false;

// Variables of Creating Frame and Hot Key
var DOT_SIZE = 10;
var ALL_DOTS;
var MAX_RAND;
var DELAY;
var tempDELAY;
var C_HEIGHT;
var C_WIDTH;
const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
const ENTER_KEY = 13;
const a=65;
const w=87;
const d=68;
const s=83;

// Variables of Length of Snake
var x;
var y;

// Create the frame and properties of the game
function canvasFrame(w, h) {
  var myFrame = document.getElementById('myCanvas');
  if (w == 400) {
    ALL_DOTS = 1600;
    MAX_RAND = 39;
    x = new Array(ALL_DOTS);
    y = new Array(ALL_DOTS);
  } else if (w == 500) {
    ALL_DOTS = 2500;
    MAX_RAND = 49;
    x = new Array(ALL_DOTS);
    y = new Array(ALL_DOTS);
  } else if (w == 600) {
    ALL_DOTS = 3600;
    MAX_RAND = 59;
    x = new Array(ALL_DOTS);
    y = new Array(ALL_DOTS);
  } else {
    ALL_DOTS = 900;
    MAX_RAND = 29;
    x = new Array(ALL_DOTS);
    y = new Array(ALL_DOTS);
  }
  C_HEIGHT = h;
  C_WIDTH = w;
  myFrame.width = C_WIDTH;
  myFrame.height = C_HEIGHT;
}

function speed(a) {
  DELAY = a;
  tempDELAY = DELAY;
}

function increasingSpeed() {
  if (increasedSpeed >= 10) {
    tempDELAY -= 5;
    increasedSpeed = 0;
  }
}

function init() {
  canvas = document.getElementById('myCanvas');
  ctx = canvas.getContext('2d');
  loadImages();
  createSnake();
  locateGreenApple();
  locatePoison();
  locateRedApple();
  setTimeout("gameCycle()", DELAY);
}

function again() {
  score=0;
  increasedSpeed = 0;
  tempDELAY = DELAY;
  if (hitWall) {
    hitWall = false;
  } else if (hitPosion) {
    hitPosion = false;
  } else if (hitYourself) {
    hitYourself = false;
  }
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  canvas.width=C_WIDTH;
  canvas.height=C_HEIGHT;
  inGame=true;
  loadImages();
  createSnake();
  locateGreenApple();
  locatePoison();
  locateRedApple();
  setTimeout("gameCycle()", DELAY);
}

function loadImages() {
  head = new Image();
  head.src = 'lib/image/snake-head.png';

  tail = new Image();
  if (paint == "blue") {
    tail.src = 'lib/image/blue-dot.png';
  } else if (paint == "green") {
    tail.src = 'lib/image/green-dot.png';
  } else if (paint == "orange") {
    tail.src = 'lib/image/orange-dot.png';
  } else if (paint == "purple") {
    tail.src = 'lib/image/purple-dot.png';
  } else if (paint == "red") {
    tail.src = 'lib/image/red-dot.png';
  } else {
    tail.src = 'lib/image/yellow-dot.png';
  }

  greenApple = new Image();
  greenApple.src = "lib/image/green-apple.png";

  poison = new Image();
  poison.src = "lib/image/poison.png";

  redApple = new Image();
  redApple.src = "lib/image/red-apple.png";
}

function paintedBall(color) {
  paint = color;
}

function createSnake() {
  dots = 3;

  for (var z = 0; z < dots; z++) {
    x[z] = C_WIDTH/2 - z * 10;
    y[z] = C_HEIGHT/2;
  }
}

function doDrawing() {
  ctx.clearRect(0, 0, C_WIDTH, C_HEIGHT);

  ctx.fillStyle="white";
  ctx.font="10x Changa One";
  ctx.fillText("Score:", 10, 10);
  ctx.fillText(score, 50, 10);
  if (C_WIDTH == 600) {
    ctx.fillText("Speed:", 535, 10);
    ctx.fillText(tempDELAY, 575, 10);
    if ((x[0] == greenApple_x) && (y[0] == greenApple_y)) {
      ctx.fillText("You ate a green apple (+1 point)", 225, 10);
    } else if ((x[0] == redApple_x) && (y[0] == redApple_y)) {
      ctx.fillText("You ate a red apple (+2 point)", 225, 10);
    }
  } else if (C_WIDTH == 400) {
    ctx.fillText("Speed:", 335, 10);
    ctx.fillText(tempDELAY, 375, 10);
    if ((x[0] == greenApple_x) && (y[0] == greenApple_y)) {
      ctx.fillText("You ate a green apple (+1 point)", 125, 10);
    } else if ((x[0] == redApple_x) && (y[0] == redApple_y)) {
      ctx.fillText("You ate a red apple (+2 point)", 125, 10);
    }
  } else if (C_WIDTH == 500) {
    ctx.fillText("Speed:", 435, 10);
    ctx.fillText(tempDELAY, 475, 10);
    if ((x[0] == greenApple_x) && (y[0] == greenApple_y)) {
      ctx.fillText("You ate a green apple (+1 point)", 175, 10);
    } else if ((x[0] == redApple_x) && (y[0] == redApple_y)) {
      ctx.fillText("You ate a red apple (+2 point)", 175, 10);
    }
  } else {
    ctx.fillText("Speed:", 235, 10);
    ctx.fillText(tempDELAY, 275, 10);
    if ((x[0] == greenApple_x) && (y[0] == greenApple_y)) {
      ctx.fillText("You ate a green apple (+1 point)", 75, 10);
    } else if ((x[0] == redApple_x) && (y[0] == redApple_y)) {
      ctx.fillText("You ate a red apple (+2 point)", 75, 10);
    }
  }

  if (inGame) {
    ctx.drawImage(greenApple, greenApple_x, greenApple_y);
    ctx.drawImage(poison, poison_x, poison_y);
    if (setRedApple) {
      ctx.drawImage(redApple, redApple_x, redApple_y);
    }
    for (var z = 0; z < dots; z++) {
      if (z == 0) {
        ctx.drawImage(head, x[z], y[z]);
      } else {
        ctx.drawImage(tail, x[z], y[z]);
      }
    }
  } else {
    gameOver();
  }
}

function gameOver() {
  enterPressed = true;
  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';
  ctx.font = 'normal bold';
  ctx.font = '20px Courier View';
  ctx.fillStyle = 'white';
  if (hitWall) {
    ctx.fillText("You Hit The Wall", C_WIDTH/2, C_HEIGHT/2-30);
  } else if (hitYourself) {
    ctx.fillText("You Hit Yourself", C_WIDTH/2, C_HEIGHT/2-30);
  } else if (hitPosion) {
    ctx.fillText("You Ate The Poison", C_WIDTH/2, C_HEIGHT/2-30);
  }
  ctx.fillStyle = 'red';
  ctx.fillText('GAME OVER', C_WIDTH/2+3, C_HEIGHT/2);
  ctx.fillStyle = 'yellow';
  ctx.fillText('Score: ' + score, C_WIDTH/2+3, C_HEIGHT/2+30);
}

function checkGreenApple() {
  if ((x[0] == greenApple_x) && (y[0] == greenApple_y)) {
    dots++;
    score++;
    increasedSpeed++;
    if (setRedApple) {
      setRedApple = false;
    }
    locateGreenApple();
    locatePoison();
    locateRedApple();
  }
}
function checkPoison() {
  if ((x[0] == poison_x) && (y[0] == poison_y)) {
    inGame = false;
    hitPosion = true;
  }
}

function checkRedApple() {
  if ((x[0] == redApple_x) && (y[0] == redApple_y)) {
    dots+=2;
    score+=2;
    increasedSpeed+=2;
    if (setRedApple) {
      setRedApple = false;
    }
    locateGreenApple();
    locatePoison();
    locateRedApple();
  }
}

function move() {
  for (var z = dots; z > 0; z--) {
    x[z] = x[(z - 1)];
    y[z] = y[(z - 1)];
  }


  if (leftDirection) {
    x[0] -= DOT_SIZE;
  }

  if (rightDirection) {
    x[0] += DOT_SIZE;
  }

  if (upDirection) {
    y[0] -= DOT_SIZE;
  }

  if (downDirection) {
    y[0] += DOT_SIZE;
  }
}

function checkCollision() {
  for (var z = dots; z > 0; z--) {
    if ((z > 4) && (x[0] == x[z]) && (y[0] == y[z])) {
      inGame = false;
      hitYourself = true;
    }
  }

  if (y[0] >= C_HEIGHT) {
    inGame= false;
    hitWall = true;
  }

  if (y[0] < 10) {
    inGame = false;
    hitWall = true;
  }

  if (x[0] >= C_WIDTH) {
    inGame = false;
    hitWall = true;
  }

  if (x[0] < 0) {
    inGame = false;
    hitWall = true;
  }
}

function locateGreenApple() {
  greenApple_x = (Math.floor(Math.random() * MAX_RAND)) * DOT_SIZE;
  greenApple_y = (Math.floor(Math.random() * MAX_RAND) + 1) * DOT_SIZE;
}

function locatePoison() {
  poison_x = (Math.floor(Math.random() * MAX_RAND)) * DOT_SIZE;
  poison_y = (Math.floor(Math.random() * MAX_RAND) + 1) * DOT_SIZE;
}

function checkSamePosition(x_axis, y_axis, z) {
  switch (z) {
    case 1:
      if (x_axis == greenApple_x && y_axis == greenApple_y) {
        samePosition = true;
      }
      break;
    case 2:
      if (x_axis == poison_x && y_axis == poison_y) {
        samePosition = true;
      }
      break;
  }
}

function locateRedApple() {
  randomValue = Math.floor((Math.random() * 10) + 1);
  if (randomValue > 7) {
    setRedApple = true;
  }
  if (setRedApple) {
    setLocateRedApple();
  }
}

function setLocateRedApple() {
  redApple_x = (Math.floor(Math.random() * MAX_RAND)) * DOT_SIZE;
  redApple_y = (Math.floor(Math.random() * MAX_RAND) + 1) * DOT_SIZE;
  checkSamePosition(redApple_x, redApple_y, 1);
  if (samePosition) {
    samePosition = false;
    setLocateRedApple();
  } else {
    checkSamePosition(redApple_x, redApple_y, 2);
    if (samePosition) {
      samePosition = false;
      setLocateRedApple();
    }
  }
}

function gameCycle() {
  if (inGame) {
    checkGreenApple();
    checkPoison();
    checkRedApple();
    increasingSpeed();
    checkCollision();
    move();
    doDrawing();
    setTimeout("gameCycle()", DELAY);
  }
}

onkeydown = function(e) {
  var key = e.keyCode;

  if ((key == LEFT_KEY || key== a) && (!rightDirection)) {
    leftDirection = true;
    upDirection = false;
    downDirection = false;
  }

  if ((key == RIGHT_KEY || key== d) && (!leftDirection)) {
    rightDirection = true;
    upDirection = false;
    downDirection = false;
  }

  if ((key == UP_KEY || key== w) && (!downDirection)) {
    upDirection = true;
    rightDirection = false;
    leftDirection = false;
  }

  if ((key == DOWN_KEY || key== s) && (!upDirection)) {
    downDirection = true;
    rightDirection = false;
    leftDirection = false;
  }

  if (key == ENTER_KEY && enterPressed == true) {
    enterPressed = false;
    again();
  }
};
