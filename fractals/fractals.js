let myShader;
let aspectRatio;
let offsetX;
let offsetY;
let scaleX;
let scaleY;
let startPanX;
let startPanY;

function screenToWorld(screenX, screenY) {
  let worldCoordsX = (screenX / scaleX) + offsetX;
  let worldCoordsY = (screenY / scaleY) + offsetY;

  return createVector(worldCoordsX, worldCoordsY);
}


function preload() {
  myShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  aspectRatio = width / height;

  offsetX = -2.5;
  offsetY = .75;
  scaleX = 0.25;
  scaleY = scaleX * aspectRatio;
}

function draw() {
  background(51);
  shader(myShader);

  myShader.setUniform("u_resolution", [width, height]);
  myShader.setUniform("u_time", millis());
  myShader.setUniform("u_offset", [offsetX, offsetY]);
  myShader.setUniform("u_scale", [scaleX, -scaleY]);


  rect(0, 0, width, height);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  aspectRatio = width / height;
  scaleY = scaleX * aspectRatio;
}

function mousePressed() {
  if (mouseButton == LEFT) {
    startPanX = map(mouseX, 0, width, 0, 1);
    startPanY = map(mouseY, 0, height, 0, 1);
  }
}

function mouseDragged() {
  offsetX -= (map(mouseX, 0, width, 0, 1) - startPanX) / scaleX;
  offsetY -= (map(mouseY, 0, height, 0, 1) - startPanY) / scaleY;

  console.log("offset: ", offsetX, offsetY);

  startPanX = map(mouseX, 0, width, 0, 1);
  startPanY = map(mouseY, 0, height, 0, 1);
}

function mouseWheel(event) {
  let screenMouseX = map(mouseX, 0, width, 0, 1);
  let screenMouseY = map(mouseY, height, 0, 0, 1);
  let mouseWorldBeforeZoom = screenToWorld(screenMouseX, screenMouseY);
  console.log("Mouse world before: ", mouseWorldBeforeZoom.x, mouseWorldBeforeZoom.y);
  // console.log("scroll delta: ", event.delta);
  // console.log("before zoom: ", mouseWorldBeforeZoom);

  if (event.delta > 1) {
    scaleX *=  (1.1);
    scaleY *=  (1.1);
  }
  else {
    scaleX *=  (0.9);
    scaleY *=  (0.9);
  }
  // console.log("scale:", scaleX, scaleY);

  let mouseWorldAfterZoom = screenToWorld(screenMouseX, screenMouseY);
  console.log("Mouse world after", mouseWorldAfterZoom.x, mouseWorldAfterZoom.y);

  offsetX -= (mouseWorldAfterZoom.x - mouseWorldBeforeZoom.x);
  offsetY += (mouseWorldAfterZoom.y - mouseWorldBeforeZoom.y);

  // console.log("offset: ", offsetX, offsetY);

  return false;
}

function keyPressed() {
  switch(key) {
    case 's': 
      saveCanvas("mandelbrot");
      break;
  }

}

