let canvas = makeCanvas("spaceCanvas");
let space = document.getElementById("space");
space.appendChild(canvas);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#000000";

let temporalResolution = 100;

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
  object = new Point(250, 0);
}

function stop() {
  clearInterval(reality);
}

class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  draw() {
    ctx.fillRect(this.x, this.y, 1, 1);
  }
}

let object = new Point(250, 5);

let reality = setInterval(function() {
  ctx.clearRect(0, 0, 501, 501);

  object.draw();

}, temporalResolution);
