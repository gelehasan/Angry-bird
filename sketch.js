// add also Benedict Gross credit

var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Body = Matter.Body;
var Constraint = Matter.Constraint;
var Mouse = Matter.Mouse;
var MouseConstraint = Matter.MouseConstraint;

var engine;
var propeller;
var boxes = [];
var birds = [];
var colors = [];
var ground;
var slingshotBird, slingshotConstraint;
var angle=0;
var angleSpeed=0;
var canvas;
let birdImage;
let startBird;
let time = 60;
let gameOver = false;


function preload (){

  birdImage= loadImage('./angryBird.png');
 

}
////////////////////////////////////////////////////////////

function setup() {
  canvas = createCanvas(1000, 600);

  engine = Engine.create();  // create an engine

  setupGround();

  setupPropeller();

  setupTower();

  setupSlingshot();

  setupMouseInteraction();
}

////////////////////////////////////////////////////////////
function draw() {
  background(0);

  Engine.update(engine);

  drawGround();
  checkTime();
  showTimer();
  drawPropeller();

  drawTower();

  drawBirds();

  if (!gameOver && boxes.length == 0) {
    gameOver = true;
    fill(255);
    textSize(24);
    text("You won!", width/2 -70, height/2-40);
    text("Press R to restart", width/2-70 , height/2);
  }

  // Display game over message if game is over
  if (gameOver) {
    fill(255);
    textSize(24);
    text("GAME OVER", width/2 -70, height/2-40);
    text("Press R to restart", width/2-70 , height/2);
  }

  drawSlingshot();
}
////////////////////////////////////////////////////////////
//use arrow keys to control propeller
function keyPressed(){
  if (keyCode == LEFT_ARROW){
    angleSpeed += 0.01;
  }
  else if (keyCode == RIGHT_ARROW){
    angleSpeed -= 0.01;
  }

 
}
////////////////////////////////////////////////////////////
function keyTyped(){
  //if 'b' create a new bird to use with propeller
  if (key==='b'){
    setupBird();
  }
  if(key === "r"){
    window.location.reload();
  }
  //if 'r' reset the slingshot
  if (key==='r'){
    removeFromWorld(slingshotBird);
    removeFromWorld(slingshotConstraint);
    setupSlingshot();
  }
}

//checks each time is over
function checkTime() {
  
  if (!gameOver) {
    time -= 1/60; 
    if (time < 0) {
      time = 0; 
      gameOver = true; 
    }
  }

}

  function showTimer (){
    textSize(20);
  
    fill(255);
    text("Time", width/2-100,22);
    textAlign(CENTER);
    text(Math.round(time), width /2-50, 23);
 
  }


//**********************************************************************
//  HELPER FUNCTIONS - DO NOT WRITE BELOW THIS line
//**********************************************************************

//if mouse is released destroy slingshot constraint so that
//slingshot bird can fly off
function mouseReleased(){
  setTimeout(() => {
    slingshotConstraint.bodyB = null;
    slingshotConstraint.pointA = { x: 0, y: 0 };
  }, 100);
}
////////////////////////////////////////////////////////////
//tells you if a body is off-screen
function isOffScreen(body){
  var pos = body.position;
  return (pos.y > height || pos.x<0 || pos.x>width);
}
////////////////////////////////////////////////////////////
//removes a body from the physics world
function removeFromWorld(body) {
  World.remove(engine.world, body);
}
////////////////////////////////////////////////////////////
function drawVertices(vertices) {
  beginShape();
  for (var i = 0; i < vertices.length; i++) {
    vertex(vertices[i].x, vertices[i].y);
  }
  endShape(CLOSE);
}
////////////////////////////////////////////////////////////
function drawConstraint(constraint) {
  push();
  var offsetA = constraint.pointA;
  var posA = {x:0, y:0};
  if (constraint.bodyA) {
    posA = constraint.bodyA.position;
  }
  var offsetB = constraint.pointB;
  var posB = {x:0, y:0};
  if (constraint.bodyB) {
    posB = constraint.bodyB.position;
  }
  strokeWeight(5);
  stroke(255);
  line(
    posA.x + offsetA.x,
    posA.y + offsetA.y,
    posB.x + offsetB.x,
    posB.y + offsetB.y
  );
  pop();
}
