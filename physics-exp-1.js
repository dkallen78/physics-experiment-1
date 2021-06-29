const canvas = makeCanvas("spaceCanvas");
const space = document.getElementById("space");
space.appendChild(canvas);
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#ffffff";

const G = 6.674 * (10 ** -6);

const initX = 20;
const initY = 500;
const initVelX = 0;
const initVelY = -.5;
const solarMass = 100_000_000;
const temporalResolution = 10;

const distance = document.getElementById("dist");
const xVel = document.getElementById("velX");
const yVel = document.getElementById("velY");

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

function dist(obj1, obj2) {
  //----------------------------------------------------//
  //Finds the pixel distance between two points         //
  //----------------------------------------------------//
  //obj1(Point)-> first point                           //
  //obj2(Point)-> second point                          //
  //----------------------------------------------------//
  //return(float)-> pixel distance between two points   //
  //----------------------------------------------------//

  return Math.sqrt(((obj1.x - obj2.x) ** 2) + ((obj1.y - obj2.y) ** 2));
}

function reset() {
  //----------------------------------------------------//
  //Resets the simulation to its starting point         //
  //----------------------------------------------------//

  ctx.clearRect(0, 0, 501, 501);
  object = new Point(initX, initY, initVelX, initVelY);
}

function stop() {
  //----------------------------------------------------//
  //Stops the simulation loop                           //
  //----------------------------------------------------//

  clearInterval(reality);
}

function findGrav(obj1, obj2) {
  //----------------------------------------------------//
  //Finds the gravitational force between two objects   //
  //----------------------------------------------------//
  //obj1(Point)-> first object                          //
  //obj2(Point)-> second object                         //
  //----------------------------------------------------//
  //return(float)-> gravitational force in pixels per   //
  //  loop                                              //
  //----------------------------------------------------//

  return G * ((obj1.mass * obj2.mass) / dist(obj1, obj2));
}

function doGrav(obj1, obj2) {

  //
  //The angle between two objects

  /*if (obj1.x >= 250) {
    angle = Math.atan((obj1.x - obj2.x) / obj1.y - obj2.y);
  } else {
    angle = Math.atan((obj1.y - obj2.y) / (obj1.x - obj2.x));
  }*/
  angle = Math.atan((obj1.y - obj2.y) / (obj1.x - obj2.x));
  //angle = Math.atan((obj1.x - obj2.x) / obj1.y - obj2.y);

  if (angle < -1.5) {
    angle = Math.abs(angle);
  }

  let r = dist(obj1, obj2);
  let grav = G * ((obj1.mass * obj2.mass) / (r ** 2));
  let xChange = grav * Math.cos(angle);
  if (obj1.x >= obj2.x && xChange > 0) {
    xChange *= -1;
  } else if (obj1.x < obj2.x && xChange < 0) {
    xChange *= -1;
  }
  let yChange = grav * Math.sin(angle);
  if (obj1.y >= obj2.y && yChange > 0) {
    yChange *= -1;
  } else if (obj1.y < obj2.y && yChange < 0) {
    yChange *= -1;
  }

  console.log(obj1.x, obj1.x - obj2.x, xChange);
  console.log(obj1.y, obj1.y - obj2.y, yChange);
  console.log(angle);


  obj1.velocityX += xChange;
  obj1.velocityY += yChange;

}

function earthG(object) {
  //----------------------------------------------------//
  //Changes the velocity of an object                   //
  //----------------------------------------------------//
  //object(Point)-> object to change the velocity of    //
  //----------------------------------------------------//

  object.velocityY += .098; //zdqe32;
}

function move(object) {
  //----------------------------------------------------//
  //Changes the x and y values of a Point object based  //
  //  on its velocity                                   //
  //----------------------------------------------------//
  //object(Point)-> object to be moved                  //
  //----------------------------------------------------//

  object.x += object.velocityX;
  object.y += object.velocityY;
}

class Point {
  constructor(x, y, velocityX = 0, velocityY = 0) {
    this.x = x;
    this.y = y;
    this.mass = 1;
    this.velocityX = velocityX;
    this.velocityY = velocityY;
  }

  draw() {
    ctx.fillRect(this.x, this.y, 1, 1);
  }
}

let object = new Point(initX, initY, initVelX, initVelY);
let sol = new Point(250, 250, 0, 0);
sol.mass = solarMass;

let reality = setInterval(function() {
  //----------------------------------------------------//
  //The simulation loop                                 //
  //----------------------------------------------------//

  //ctx.clearRect(0, 0, 501, 501);

  //earthG(object);
  doGrav(object, sol);
  move(object);


  object.draw();
  sol.draw();
  distance.innerHTML = dist(object, sol);
  xVel.innerHTML = object.velocityX;
  yVel.innerHTML = object.velocityY;

  if (object.x > 501 || object.x < 0 || object.y > 501 || object.y < 0) {
    //----------------------------------------------------//
    //If the Point object leaves the field of view of the //
    //  canvas it's reset to its initial state            //
    //----------------------------------------------------//

    stop();
  }

}, temporalResolution);
