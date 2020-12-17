var NONE = 0;
var X = 1;
var O = 2;
var boardState = [[NONE, NONE, NONE],
                  [NONE, NONE, NONE],
                  [NONE, NONE, NONE]];

var bestMove;
var currentPlayer = X
var isGameOver = false;

function setup() {
  createCanvas(300, 300);
  bestMove();
}

function draw() {
  background(220);
  drawBoard(boardState);

  if (checkWin(boardState) != -1)
  {
    isGameOver = true;
  }
  if (isGameOver)
  {
    noStroke();
    fill(0, 0, 0, 150);
    rect(0, height / 6, width, height - (2 * height / 6) );
    textSize(32);
    textAlign(CENTER);
    if (checkWin(boardState) == X)
    {
      fill('red');
      text("X Wins", width / 2, height / 2);
    }
    else if (checkWin(boardState) == O)
    {
      fill('blue');
      text('O Wins', width / 2, height / 2);
    }
    else
    {
      fill('black');
      text('Draw', width / 2, height / 2);
    }
  }
}

function mousePressed()
{
  if (currentPlayer == O)
  {
    let x = floor(mouseX / (width / 3));
    let y = floor(mouseY / (height / 3));

    if (boardState[y][x] == NONE)
    {
      boardState[y][x] = currentPlayer;
      currentPlayer = X;
      bestMove();
    }
  }
}

function gameOver()
{
  let result = checkWin(boardState);
  if (result != -1)
  {
    print(result);
    isGameOver = true;
    draw();
    noLoop();
  }
}

// Render a board state
function drawBoard(boardState)
{
  let padWidth = width * .05;
  let padHeight = height * .05;
  stroke(0);
  strokeCap(ROUND);
  strokeWeight(5);
  line(width / 3, padHeight, width / 3, height - padHeight);
  line(width / 3 * 2, padHeight, width / 3 * 2, height - padHeight);
  line(padWidth, height / 3, width - padWidth, height / 3);
  line(padWidth, height / 3 * 2, width - padWidth, height / 3 * 2);

  let squareWidth = width / 3;
  let squareHeight = height / 3;
  let halfSquareWidth = squareWidth / 2;
  let halfSquareHeight = squareHeight / 2;

  for (let y = 0; y < 3; y++)
  {
    for (let x = 0; x < 3; x++)
    {
      let xp = halfSquareWidth + (x * width / 3);
      let yp = halfSquareHeight + (y * height / 3);
      //print(xp, yp, "\n");

      if (boardState[y][x] == X)
      {
        // Draw an X
        stroke('red');
        strokeWeight(2);
        smooth();
        line(xp - halfSquareWidth + padWidth, yp - halfSquareHeight + padHeight, 
             xp + halfSquareWidth - padWidth, yp + halfSquareHeight - padHeight);
        line(xp - halfSquareWidth + padWidth, yp + halfSquareHeight - padHeight,
             xp + halfSquareWidth - padWidth, yp - halfSquareHeight + padHeight);
        
      }
      else if (boardState[y][x] == O)
      {
        // Draw an O
        stroke('blue');
        strokeWeight(2);
        smooth();
        noFill();
        ellipse(xp, yp, halfSquareWidth + padWidth, halfSquareHeight + padHeight);
      }
    }
  }
}

function bestMove()
{
  let gameState = checkWin(boardState);
  if (gameState != -1)
  {
    gameOver();
    return;
  }
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++)
  {
    for (let j = 0; j < 3; j++)
    {
      if (boardState[i][j] == NONE)
      {
        boardState[i][j] = X;
        let score = minimax(boardState, 0, false)
        boardState[i][j] = NONE;
        if (score > bestScore)
        {
          bestScore = score;
          move = {i, j};
        }
      }
    }
  }
  boardState[move.i][move.j] = X
  currentPlayer = O
}

function minimax(board, depth, isMaximizing)
{
  let result = checkWin(board);
  if (result != -1)
  {
    return score(board); // Reached leaf, return score
  }
  
  if (isMaximizing) 
  {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++)
    {
      for (let j = 0; j < 3; j++)
      {
        // Is the spot available?
        if (board[i][j] == NONE)
        {
          board[i][j] = X;
          let score = minimax(board, depth + 1, false);
          board[i][j] = NONE;
          bestScore = max(score, bestScore);
        }
      }
    }
    return bestScore;
  }
  else
  {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++)
    {
      for (let j = 0; j < 3; j++)
      {
        // Is the spot available?
        if (board[i][j] == NONE)
        {
          board[i][j] = O;
          let score = minimax(board, depth + 1, true);
          board[i][j] = NONE;
          bestScore = min(score, bestScore);
        }
      }
    }
    return bestScore;

  }
}
// Checks for win and returns player who won. Returns NONE if game is drawn. Returns -1 if game is not finished
function checkWin(boardState) 
{
  let playerWin = NONE;
  let draw = true;

  // Check columns
  for (let col = 0; col < boardState[0].length; col++)
  {
    let xCount = 0;
    let oCount = 0;
    for(let row = 0; row < boardState.length; row++)
    {
      if (boardState[row][col] == NONE)
      {
        draw = false;
      }
      if (boardState[row][col] == X)
      {
        xCount++;
      }
      else if (boardState[row][col] == O)
      {
        oCount++;
      }
    }
    if (xCount == boardState.length)
    {
      playerWin = X;
      //print("col:", col, "xCount:", xCount, "oCount:", oCount, "playerWin: X", "\n");
      return playerWin;
    }
    else if (oCount == boardState.length)
    {
      playerWin = O;
      // print("col:", col, "xCount:", xCount, "oCount:", oCount, "playerWin: O", "\n");
      return playerWin;
    }
    else
    {
      // print("col:", col, "xCount:", xCount, "oCount:", oCount, "playerWin: none", "\n");
    }
  }
  
  // Check rows
  for (let row = 0; row < boardState.length; row++)
  {
    let xCount = 0;
    let oCount = 0;
    for(let col = 0; col < boardState.length; col++)
    {
      if (boardState[row][col] == X)
      {
        xCount++;
      }
      else if (boardState[row][col] == O)
      {
        oCount++;
      }
    }
    if (xCount == boardState.length)
    {
      playerWin = X;
      // print("row:", row, "xCount:", xCount, "oCount:", oCount, "playerWin: X", "\n");
      return playerWin;
    }
    else if (oCount == boardState.length)
    {
      playerWin = O;
      // print("row:", row, "xCount:", xCount, "oCount:", oCount, "playerWin: O", "\n");
      return playerWin;
    }
    else
    {
      // print("row:", row, "xCount:", xCount, "oCount:", oCount, "playerWin: none", "\n");
    }
  }

  let xCount = 0;
  let oCount = 0;
  // Check diag 1
  for (let row = 0; row < boardState.length; row++)
  {
    if (boardState[row][row] == X)
    {
      xCount++;
    }
    else if (boardState[row][row] == O)
    {
      oCount++;
    }
  }

  if (xCount == boardState.length)
  {
    playerWin = X;
    // print("diag: 1", "xCount:", xCount, "oCount:", oCount, "playerWin: X", "\n");
    return playerWin;
  }
  else if (oCount == boardState.length)
  {
    playerWin = O;
    // print("diag: 1", "xCount:", xCount, "oCount:", oCount, "playerWin: O", "\n");
    return playerWin;
  }
  else
  {
    // print("diag: 1", "xCount:", xCount, "oCount:", oCount, "playerWin: none", "\n");
  }

  xCount = 0;
  oCount = 0;
  // Check diag 2
  for (let row = boardState.length - 1; row >= 0; row--)
  {
    if (boardState[row][boardState.length - 1 - row] == X)
    {
      xCount++;
    }
    else if (boardState[row][boardState.length - 1 - row] == O)
    {
      oCount++;
    }
  }

  if (xCount == boardState.length)
  {
    playerWin = X;
    // print("diag: 2", "xCount:", xCount, "oCount:", oCount, "playerWin: X", "\n");
    return playerWin;
  }
  else if (oCount == boardState.length)
  {
    playerWin = O;
    // print("diag: 2", "xCount:", xCount, "oCount:", oCount, "playerWin: O", "\n");
    return playerWin;
  }
  else
  {
    // print("diag: 2", "xCount:", xCount, "oCount:", oCount, "playerWin: none", "\n");
  }

  if (playerWin == NONE && draw == true)
  {
    return NONE;
  }
  else
  {
    return -1;
  }

}

// Assigned a score value to an endgame, if X wins, +10, if O wins, -10, if draw, 0
function score(boardState)
{
  if (checkWin(boardState) == X)
  {
    return 10;
  }
  else if(checkWin(boardState) == O)
  {
    return -10;
  }
  else if(checkWin(boardState) == NONE)
  {
    return 0;
  }
}