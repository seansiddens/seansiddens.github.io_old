var _ = 0;
var o = 1;
var x = 2;
var gridWidth;
var gridSize = 6;
var renderMode = true;
var unknot1 = [[x, o],
              [o, x]];

var unknot2 = [[_, x, o, _],
            [x, _, _, o],
            [o, _, x, _],
            [_, o, _, x]];

var trefoil = [[_, x, _, _, o],
                [o, _, x, _, _],
                [_, o, _, x, _],
                [_, _, o, _, x],
                [x, _, _, o, _]];

var kinoshitaTerasaka = [[_, _, _, _, o, _, _, _, _, _, x],
                         [_, _, _, x, _, o, _, _, _, _, _],
                         [_, _, _, _, x, _, _, _, _, o, _],
                         [_, x, _, _, _, _, _, o, _, _, _],
                         [o, _, _, _, _, _, _, _, x, _, _],
                         [_, _, o, _, _, _, _, _, _, x, _],
                         [_, _, _, _, _, x, _, _, _, _, o],
                         [x, _, _, _, _, _, o, _, _, _, _],
                         [_, _, _, o, _, _, _, x, _, _, _],
                         [_, _, x, _, _, _, _, _, o, _, _],
                         [_, o, _, _, _, _, x, _, _, _, _]];

var figureEight = [[_, o, _, x, _, _],
                   [x, _, o, _, _, _],
                   [_, x, _, _, o, _],
                   [_, _, _, o, _, x],
                   [o, _, _, _, x, _],
                   [_, _, x, _, _, o]];

var cinquefoil = [[o, _, x, _, _, _, _],
                  [_, o, _, x, _, _, _],
                  [_, _, o, _, x, _, _],
                  [_, _, _, o, _, x, _],
                  [_, _, _ ,_ ,o, _, x],
                  [x, _, _, _, _, o, _],
                  [_, x, _, _, _, _, o]];

var knot = cinquefoil;

function setup() {
  createCanvas(400, 400);
  stroke(255, 255, 255, 255);
} // END setup()

function draw() {
  background(51);
  if (renderMode)
  {
    renderCurvedKnot(knot);
  }
  else
  {
    renderGridKnot(knot);
  }
} // END draw()

function keyPressed()
{
  if (keyCode == LEFT_ARROW | keyCode == RIGHT_ARROW | keyCode == UP_ARROW | keyCode == DOWN_ARROW)
  {
    knot = trans(knot, keyCode);
  }
  else if (keyCode == 77)
  {
    renderMode = !renderMode;
  }
  else if (keyCode == 82)
  {
    knot = genGrid();
  }
  else if (keyCode == 190)
  {
    if (gridSize + 1 <= 20)
    {
      gridSize += 1;
    }
    else
    {
      gridSize = 20;
    }
  }
  else if (keyCode == 188)
  {
    if (gridSize - 1 >= 2)
    {
      gridSize -= 1;
    }
    else
    {
      gridSize = 2;
    }
  }
  else
  {
    switch (keyCode)
    {
      case 49:
        knot = unknot1;
        break;
      
      case 50:
        knot = unknot2;
        break;
      
      case 51:
        knot = trefoil;
        break;

      case 52:
        knot = figureEight;
        break;

      case 53:
        knot = cinquefoil;
        break;

      case 54:
        knot = kinoshitaTerasaka;
        break;
    }

  }

  return false;
}

function genGrid()
{
  let indices = [];
  for (let i = 0; i < gridSize; i++)
  {
    indices.push(i);
  }
  let grid = [];
  let temp;
  for (let i = 0; i < indices.length; i++)
  {
    grid.push([]);
    for(let j = 0; j < indices.length; j++)
    {
      grid[i].push(_);
    }
  }

  // Insert random x's
  temp = [...indices];
  for (let i = 0; i < grid.length; i++)
  {
    print(temp);
    let j;
    print('temp length: ', temp.length);
    if (temp.length == 0)
    {
      break;
    }
    let choice = random(temp);
    print('choice: ', choice);
    for (j = 0; j < temp.length; j++)
    {
      if (choice == temp[j])
      {
        break;
      }
    }
    print('index: ', j);
    if (possible(grid, i, choice, x))
    {
      grid[i][choice] = x;
    }
    temp.splice(j, 1);
  }

  // Insert random o's
  temp = [...indices];
  for (let i = 0; i < grid.length; i++)
  {
    print(temp);
    let j;
    print('temp length: ', temp.length);
    if (temp.length == 0)
    {
      break;
    }
    let choice = random(temp);
    print('choice: ', choice);
    for (j = 0; j < temp.length; j++)
    {
      if (choice == temp[j])
      {
        break;
      }
    }
    print('index: ', j);
    if (possible(grid, i, choice, o))
    {
      grid[i][choice] = o;
    }
    temp.splice(j, 1);
  }

  return grid;
}

function possible(grid, i, j, sym)
{
  if (grid[i][j] != _)
  {
    return false;
  }
  for(let x = 0; x < grid.length; x++)
  {
    if (x != j && grid[i][x] == sym)
    {
      return false;
    }
  }
  
  for(let y = 0; y < grid.length; y++)
  {
    if (y != i && grid[y][j] == sym)
    {
      return false;
    }
  }
  return true;
}

function trans(grid, keyCode)
{
  let newGrid = [];
  for (let i = 0; i < grid.length; i++)
  {
    newGrid.push([]);
    for(let j = 0; j < grid.length; j++)
    {
      newGrid[i].push(grid[i][j]);
    }
  }
  if (keyCode == RIGHT_ARROW)
  {
    for (let i = 0; i < grid.length; i++)
    {
      for (let j = 0; j < grid.length; j++)
      {
        if (i - 1 >= 0)
        {
          newGrid[j][i] = grid[j][i - 1]
        }
        else if (i - 1 < 0)
        {
          newGrid[j][i] = grid[j][grid.length - 1]
        }
      }
    }
  }
  else if (keyCode == LEFT_ARROW)
  {
    for (let i = 0; i < grid.length; i++)
    {
      for (let j = 0; j < grid.length; j++)
      {
        if (i + 1 < grid.length)
        {
          newGrid[j][i] = grid[j][i + 1]
        }
        else if (i + 1 >= grid.length)
        {
          newGrid[j][i] = grid[j][0]
        }
      }
    }
  }
  else if (keyCode == UP_ARROW)
  {
    for (let i = 0; i < grid.length; i++)
    {
      for (let j = 0; j < grid.length; j++)
      {
        if (i + 1 < grid.length)
        {
          newGrid[i][j] = grid[i+1][j]
        }
        else if (i + 1 >= grid.length)
        {
          newGrid[i][j] = grid[0][j]
        }
      }
    }
  }
  else if (keyCode == DOWN_ARROW)
  {
    for (let i = 0; i < grid.length; i++)
    {
      for (let j = 0; j < grid.length; j++)
      {
        if (i - 1 >= 0)
        {
          newGrid[i][j] = grid[i-1][j]
        }
        else if (i - 1 < 0)
        {
          newGrid[i][j] = grid[grid.length-1][j]
        }
      }
    }

  }
  return newGrid;
} // END trans()

function stabilize(grid, i, j)
{
  let newGrid = [];
  for (let i = 0; i < grid.length + 1; i++)
  {
    newGrid.push([]);
    for(let j = 0; j < grid.length + 1; j++)
    {
      newGrid[i].push(_);
    }
  }
}

function renderCurvedKnot(grid)
{
  stroke('cyan');
  strokeWeight(5);
  gridWidth = width / grid.length;
  let oldPointList = [];
  let pointList = [];
 
  // Generate list of world coordinates of each vertice of the grid diagram
  for (let i = 0; i < grid.length; i++)
  {
    for (let j = 0; j < grid.length; j++)
    {

      if (grid[i][j] != _)
      {
        oldPointList.push(createVector(j * gridWidth + gridWidth / 2, i * gridWidth + gridWidth / 2))
      }

    }
  }

  let vert = true;
  pointFound = false;
  let currentPoint;
  for (let i = 0; i < grid.length; i++)
  {
    if (grid[i][0] == x)
    {
      for (let j = 0; j < oldPointList.length; j++)
      {
        if (oldPointList[j].y == (i * gridWidth + gridWidth / 2))
        {
          currentPoint = oldPointList[j].copy();
        }
      }
    }
  }
  // let currentPoint = oldPointList[0].copy();
  pointList.push(currentPoint);
  for (let i = 0; i < oldPointList.length; i++)
  {
    if (vert)
    {
      for (let j = 0; j < oldPointList.length; j++)
      {
        if (oldPointList[j].y != currentPoint.y && oldPointList[j].x == currentPoint.x) 
        {
          currentPoint = createVector(currentPoint.x, oldPointList[j].y);
          break;
        }
      }
      vert = false;
    }
    else
    {
      for (let j = 0; j < oldPointList.length; j++)
      {
        if (oldPointList[j].x != currentPoint.x && oldPointList[j].y == currentPoint.y) 
        {
          currentPoint = createVector(oldPointList[j].x, currentPoint.y);
          break;
        }
      }
      vert = true
    }
    pointList.push(currentPoint);
  }

  pointList.pop();

  noFill();
  for (let i = 0; i < pointList.length; i++)
  {
    //stroke(i * 360 / pointList.length, 100, 100, 1);
    if (i + 3 < pointList.length)
    {
      curve(pointList[i].x, pointList[i].y, pointList[i+1].x, pointList[i+1].y, 
            pointList[i+2].x, pointList[i+2].y, pointList[i+3].x, pointList[i+3].y);
    }
    else if (i == pointList.length - 3)
    {
      curve(pointList[i].x, pointList[i].y, pointList[i+1].x, pointList[i+1].y, 
            pointList[i+2].x, pointList[i+2].y, pointList[0].x, pointList[0].y);
    }
    else if (i == pointList.length - 2)
    {
      curve(pointList[i].x, pointList[i].y, pointList[i+1].x, pointList[i+1].y, 
            pointList[0].x, pointList[0].y, pointList[1].x, pointList[1].y);
    }
    else if (i == pointList.length - 1)
    {
      curve(pointList[i].x, pointList[i].y, pointList[0].x, pointList[0].y, 
            pointList[1].x, pointList[1].y, pointList[2].x, pointList[2].y);
    }
  }

} // END renderGrid()

function renderGridKnot(grid)
{
  gridWidth = width / grid.length;
  strokeWeight(5);
  // Horizontal lines
  stroke('purple');
  for (let i = 0; i < grid.length; i++)
  {
    for (let j = 0; j < grid.length; j++)
    {

      if (grid[i][j] == o)
      {
        for (let k = 0; k < grid.length; k++)
        {
          if (grid[i][k] == x)
          {
            line(gridWidth * j + gridWidth / 2, gridWidth * i + gridWidth / 2,
                 gridWidth * k + gridWidth / 2, gridWidth * i + gridWidth / 2);
            break;
          }
        }
        break;
      }
    }
  }
  
  // Vertical lines
  stroke('cyan');
  for (let i = 0; i < grid.length; i++)
  {
    for (let j = 0; j < grid.length; j++)
    {

      if (grid[j][i] == x)
      {
        for (let k = 0; k < grid.length; k++)
        {
          if (grid[k][i] == o)
          {
            line(gridWidth * i + gridWidth / 2, gridWidth * j + gridWidth / 2,
                 gridWidth * i + gridWidth / 2, gridWidth * k + gridWidth / 2);
            break;
          }
        }
        break;
      }
    }
  }
}
