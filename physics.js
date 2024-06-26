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
  var bird = Bodies.circle(mouseX, mouseY, 20, {friction: 0,
      restitution: 0.95 });
  Matter.Body.setMass(bird, bird.mass*10);
  World.add(engine.world, [bird]);
  birds.push(bird);
}
////////////////////////////////////////////////////////////////
function drawBirds(){
  push();
  //It draws birds where ever the mouse is pointed at
  //The birds is drawn when user clicks on "b"
  //It removes the birds from the screen when they leave the canvas
 
    for(let i=0; i<birds.length; i++){
      const position=birds[i].position;
      drawVertices(birds[i].vertices);
      //Changes ther style  of the object into a picture
      imageMode(CENTER)   
      image(birdImage, position.x, position.y, 50, 60)
      
      if(isOffScreen(birds[i])){
        removeFromWorld(birds[i]);
        birds.splice(i, 1);
        i--;
      }
    }
    
  
  pop();
}
////////////////////////////////////////////////////////////////
//creates a tower of boxes
function setupTower(){

  //Creates a tower thats high 6 like the provided image in the coursework
  
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 6; j++) {
      const box = Bodies.rectangle(800+i*80, 400-j*80, 80, 80);
      boxes.push(box);
      const shade = random(50, 200); 
    const greenColor = color(0, shade, 0);
      colors.push(greenColor)   
    }
  }
  // Add boxes to the world
  World.add(engine.world, boxes);
}
////////////////////////////////////////////////////////////////
//draws tower of boxes
function drawTower(){
  //Loops over the boxes that has been pushed and draws them on the screen
  push();
  for (var i = 0; i < boxes.length; i++) {
    fill(colors[i]);
    strokeWeight(5);
    stroke(50);
    drawVertices(boxes[i].vertices);
    strokeWeight(5);
    stroke(0);
   
  }
  pop();
}
////////////////////////////////////////////////////////////////
function setupSlingshot(){
//creates a circular body representing the slingshot bird
//sets its mass to be 10 times its original value
//then creates a constraint that connects the bird to a fixed point
slingshotBird = Bodies.circle(200, 150, 20, {
  friction: 0,
  restitution: 0.95
});
Matter.Body.setMass(slingshotBird, slingshotBird.mass * 10);

slingshotConstraint = Constraint.create({
  pointA: { x: 200, y: 180 },
  bodyB: slingshotBird,
  stiffness: 0.01,
  damping: 0.0001
});
World.add(engine.world, [slingshotBird, slingshotConstraint]);
}
////////////////////////////////////////////////////////////////
//draws slingshot bird and its constraint
function drawSlingshot(){
  push();
  //getting the postion so the bird is displayed in the right place
  const point = slingshotBird.position;

  drawVertices(slingshotBird.vertices);
  //displays the bird image
  imageMode(CENTER);
  image(birdImage, point.x, point.y, 80, 80);
  
  drawConstraint(slingshotConstraint, "white");
  pop();
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
