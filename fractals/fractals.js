let myShader;
let offsetX;
let offsetY;
let scaleX;
let scaleY;
let startPanX;
let startPanY;

function screenToWorld(screenX, screenY) {
    let aspectRatio = width / height;
    // screen coords mapped to imaginary plane
    let imagCoordsX = map(screenX, 0, width, -2.5, 1.0);
    let imagCoordsY = map(screenY, 0, height, 1.0, -(3.5 / aspectRatio / 2.0), 3.5 / aspectRatio / 2.0); 

    // Imaginary coords transformed by scale and offset
    let worldCoordsX = imagCoordsX / scaleX + map(offsetX, 0, width, -2.5, 1.0);
    let worldCoordsY = imagCoordsY / scaleY + map(offsetY, 0.0, height, -(3.5 / aspectRatio / 2.0), 3.5 / aspectRatio / 2.0);

    return createVector(worldCoordsX, worldCoordsY);
}

function preload() {
  myShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  offsetX = 0.0;
  offsetY = 0.0;
  scaleX = 1.0;
  scaleY = 1.0;
}

function draw() {
  shader(myShader);

  myShader.setUniform("u_resolution", [width, height]);
  myShader.setUniform("u_time", millis());
  myShader.setUniform("u_offset", [offsetX, offsetY]);
  myShader.setUniform("u_scale", [scaleX, -scaleY]);


  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (mouseButton == LEFT) {
    startPanX = mouseX;
    startPanY = mouseY;
  }
}

function mouseDragged() {
  offsetX -= (mouseX - startPanX) / scaleX;
  offsetY -= (mouseY - startPanY) / scaleY;

  console.log("offset: ", offsetX, offsetY);

  startPanX = mouseX;
  startPanY = mouseY;
}

function mouseWheel(event) {
  console.log("scroll delta: ", event.delta);

  if (event.delta > 1) {
    scaleX *=  1.001 + event.delta * 0.01;
    scaleY *=  1.001 + event.delta * 0.01;
  }
  else {
    scaleX *=  0.999 + event.delta * 0.01;
    scaleY *=  0.999 + event.delta * 0.01;
  }

  return false;
}

