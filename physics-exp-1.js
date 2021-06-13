let canvas = makeCanvas("spaceCanvas");
let space = document.getElementById("space");
space.appendChild(canvas);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#ffffff";

const G = 6.674 * (10 ** -11);

let temporalResolution = 10;

function makeCanvas(id, height = 501, width = 501) {
  //----------------------------------------------------//
  //Makes a canvas element                              //
  //----------------------------------------------------//
  //id(string)-> id of the canvas element               //
  //height(integer)-> height of the canvas element      //
  //width(integer)-> width of the canvas element        //
  //----------------------------------------------------//
  //return(element)-> canvas element                    //
  //----------------------------------------------------//

  var canvas = document.createElement("canvas");
  canvas.id = id;
  canvas.classList.add("canvas");
  canvas.height = height;
  canvas.width = width;

  return canvas;
}

function reset() {
  //ctx.clearRect(0, 0, 501, 501);
  object = new Point(5, 5);
}

function stop() {
  clearInterval(reality);
}

function accelerate(object) {
  object.velocityY += .098; //zdqe32;
}

function move(object) {
  object.x += object.velocityX;
  object.y += object.velocityY;
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.velocityX = 2;
    this.velocityY = 0;
  }

  draw() {
    ctx.fillRect(this.x, this.y, 1, 1);
  }
}

let object = new Point(5, 5);

let reality = setInterval(function() {
  ctx.clearRect(0, 0, 501, 501);

  accelerate(object);
  move(object);

  object.draw();

  if (object.x > 501 || object.x < 0 || object.y > 501 || object.y < 0) {
    reset();
  }

}, temporalResolution);
