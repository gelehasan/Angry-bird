////////////////////////////////////////////////////////////////
function setupGround(){
  ground = Bodies.rectangle(500, 600, 1000, 40, {
    isStatic: true, angle: 0
  });
  World.add(engine.world, [ground]);
}

////////////////////////////////////////////////////////////////
function drawGround(){
  push();
  fill(128);
  drawVertices(ground.vertices);
  //It draws a propeller 
  // The propeller is controllered by the angle speed
  // depending on the keyword thats been pressed if its left or right
  drawVertices(propeller.vertices);
  Body.setAngle(propeller, angle);
  Body.setAngularVelocity(propeller, angleSpeed);
  angle += angleSpeed;
  pop();
}
////////////////////////////////////////////////////////////////
function setupPropeller(){
  // your code here
  //This rectangular propeller using
  // the Bodies.rectangle() function provided by the Matter.js physics engine.
  //It creates it at location 150, 480 and 200, 15 is the size 
  propeller = Bodies.rectangle(150, 480, 200, 15, { 
    isStatic: true, angle: angle 
  });
  World.add(engine.world, [propeller]);

}
////////////////////////////////////////////////////////////////
//updates and draws the propeller
function drawPropeller(){
  push();
  // your code here
  pop();
}
////////////////////////////////////////////////////////////////
function setupBird(){
 
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){

  //Creates a tower thats high 6 like the provided image in the coursework
  
 
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  //Loops over the boxes that has been pushed and draws them on the screen

}
////////////////////////////////////////////////////////////////
function setupSlingshot(){

}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){

}



/////////////////////////////////////////////////////////////////
function setupMouseInteraction(){
  var mouse = Mouse.create(canvas.elt);
  var mouseParams = {
    mouse: mouse,
    constraint: { stiffness: 0.05 }
  }
  mouseConstraint = MouseConstraint.create(engine, mouseParams);
  mouseConstraint.mouse.pixelRatio = pixelDensity();
  World.add(engine.world, mouseConstraint);
}
