const SCREEN_WIDTH = 1000;
const SCREEN_HEIGHT = 1000;

class RandomLine
{
  constructor(x, y, width, height)
  {
    this.x = x;
    this.y = y;
    this.width = this.x + width;
    this.height = this.y + height;
    this.choice = random();
  }

  draw()
  {
    if (this.choice > .5)
    {
      line(this.x, this.y, this.width, this.height);
    }
    else
    {
      line(this.x, this.height, this.width, this.y);
    }
  }
} 

var l;
var num;
var order = 0;
var squares = [];
var squareWidth = SCREEN_WIDTH / num;
var pg;
function setup() {
  createCanvas(SCREEN_WIDTH, SCREEN_HEIGHT);
  initLines(pow(2, order));

}

function initLines(n)
{
  squares = []
  squareWidth = SCREEN_WIDTH / n;
  for(let y = 0; y < n; y++)
  {
    for(let x = 0; x < n; x++)
    {
      squares.push(new RandomLine(y * squareWidth, x * squareWidth, squareWidth, squareWidth));
    }
  }
}

function mouseClicked()
{
  order = (order++ >= 8) ? 0 : order++;
  console.log(order);
  num = pow(2, order);
  initLines(num);
}

function keyTyped()
{
  if (key == 's')
  {
    save();
  }
}

function draw() {
  background(255);

  squares.forEach(function(l)
  {
    l.draw();
  })

}
