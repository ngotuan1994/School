// JavaScript Snake example
// CPSC254: project

var canvas;
var ctx;

var poison;
var head;
var apple;
var ball;

var dots;
var apple_x;
var apple_y;
var poison_x;
var poison_y;

var leftDirection = false;
var rightDirection = true;
var upDirection = false;
var downDirection = false;
var inGame = true;
var score=0;

var DOT_SIZE = 10;
const ALL_DOTS = 900;
const MAX_RAND = 29;
var DELAY;
var C_HEIGHT = 500;
var C_WIDTH = 500;

const LEFT_KEY = 37;
const RIGHT_KEY = 39;
const UP_KEY = 38;
const DOWN_KEY = 40;
const a=65;
const w=87;
const d=68;
const s=83;



var x = new Array(ALL_DOTS);
var y = new Array(ALL_DOTS);

function speed(a){
  DELAY = a;
}

function getNewRandomColor()
{
    var myArray = ['red', 'green', 'blue'];
    var rand = myArray[Math.floor(Math.random() * myArray.length)];
    document.getElementById("color").background = rand;
}
function init() {

    canvas = document.getElementById('myCanvas');
    ctx = canvas.getContext('2d');

    loadImages();
    createSnake();
    locateApple();
    locatePoison();
    setTimeout("gameCycle()", DELAY);
}

function again() {
  score=0;
  ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
  canvas.width=C_WIDTH;
  canvas.height=C_HEIGHT;
  inGame=true;
  loadImages();
  createSnake();
  locateApple();
  locatePoison();
  setTimeout("gameCycle()", DELAY);
}

function loadImages() {

    head = new Image();
    head.src = 'head1.png';

    ball = new Image();
    ball.src = 'dot.png';

    apple = new Image();
    apple.src = "apple.png";

    poison = new Image();
    poison.src = "poison.png";
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
    ctx.fillText("Score:" ,10,10);
    ctx.fillText(score ,50,10);

    if (inGame) {

        ctx.drawImage(apple, apple_x, apple_y);
        ctx.drawImage(poison, poison_x, poison_y);

        for (var z = 0; z < dots; z++) {

            if (z == 0) {
                ctx.drawImage(head, x[z], y[z]);
            } else {
                ctx.drawImage(ball, x[z], y[z]);
            }
        }
    } else {
        gameOver();
    }
}

function gameOver() {
    ctx.fillStyle = 'yellow';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'normal bold 20px serif';

    ctx.fillText('Game Over', C_WIDTH/2, C_HEIGHT/2);

    ctx.fillStyle="white";
    ctx.fillText("Click play again to play game again",C_WIDTH/2+15,C_HEIGHT/2+15);
    ctx.fillStyle= "yellow";
    ctx.fillText('Your Score is: ' + score,C_WIDTH/2+15,C_HEIGHT/2+35);
}

function checkApple() {

    if ((x[0] == apple_x) && (y[0] == apple_y)) {

        dots++;
        score++;
        locateApple();
        locatePoison();
    }
}
function checkPoison() {

    if ((x[0] == poison_x) && (y[0] == poison_y)) {

        dots= dots - 3;
        score--;
        locatePoison();
        locateApple();
        if((score < 0) || (dots < 0)){
          gameOver();
          inGame = false;
        }
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
        }
    }

    if (y[0] >= C_HEIGHT) {
        inGame= false;
    }

    if (y[0] < 0) {
       inGame = false;
    }

    if (x[0] >= C_WIDTH) {
      inGame = false;
    }

    if (x[0] < 0) {
      inGame = false;
    }
}

function locateApple() {

    var r = Math.floor(Math.random() * MAX_RAND);
    apple_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    apple_y = r * DOT_SIZE;
}

function locatePoison() {

    var r = Math.floor(Math.random() * MAX_RAND);
    poison_x = r * DOT_SIZE;

    r = Math.floor(Math.random() * MAX_RAND);
    poison_y = r * DOT_SIZE;
}

function gameCycle() {
    if (inGame) {

        checkApple();
        checkCollision();
        checkPoison();
        checkCollision();
        move();
        doDrawing();
        //doDrawing2();
        setTimeout("gameCycle()", DELAY);
    }
}

onkeydown = function(e) {

    var key = e.keyCode;

    if ((key == LEFT_KEY || key==a) && (!rightDirection)) {

        leftDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == RIGHT_KEY || key==d) && (!leftDirection)) {

        rightDirection = true;
        upDirection = false;
        downDirection = false;
    }

    if ((key == UP_KEY || key==w) && (!downDirection)) {

        upDirection = true;
        rightDirection = false;
        leftDirection = false;
    }

    if ((key == DOWN_KEY || key==s) && (!upDirection)) {

        downDirection = true;
        rightDirection = false;
        leftDirection = false;
    }
};
