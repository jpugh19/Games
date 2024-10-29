//king: check
//pawn: queening

// 0 = 80
// 1 = 160
// 2 = 240
// 3 = 320
// 4 = 400
// 5 = 480
// 6 = 560
// 7 = 640

let selected = null;
let last = null;
let lastMove = null;
let board;
let animations;
let pieces;
let turn = 'white';
let boardArray = new Array(8);
let numMoves = 0;
let pass;
let wKing;
let bKing;
for (i = 0; i < boardArray.length; i++) {
  boardArray[i] = [];
  for (j = 0; j < boardArray.length; j++) {
    boardArray[i][j] = null;
  }
}

function preload() {
  animations = {
    stay: {row: 0, col: 0, frames: 1}
  };
  pieces = {
    bPawn: {row: 0, col: 0, frames: 1},
    wPawn: {row: 0, col: 1, frames: 1},
    bRook: {row: 0, col: 2, frames: 1},
    wRook: {row: 1, col: 0, frames: 1},
    bKnight: {row: 1, col: 1, frames: 1},
    wKnight: {row: 1, col: 2, frames: 1},
    bBishop: {row: 2, col: 0, frames: 1},
    wBishop: {row: 2, col: 1, frames: 1},
    bQueen: {row: 2, col: 2, frames: 1},
    wQueen: {row: 3, col: 0, frames: 1},
    bKing: {row: 3, col: 1, frames: 1},
    wKing: {row: 3, col: 2, frames: 1}
  };
}

function setup() {
  createCanvas(720, 720);

  board = new Sprite(width / 2, height / 2, 640, 640);
  board.spriteSheet = 'assets/ChessBoard.png';
  board.addAnis(animations);
  board.changeAni('stay');
  board.collider = 'none';
  board.layer = 1;

  boardArray[0][0] = new Rook('black', convert(0), convert(0));
  boardArray[0][1] = new Knight('black', convert(1), convert(0));
  boardArray[0][2] = new Bishop('black', convert(2), convert(0));
  boardArray[0][3] = new Queen('black', convert(3), convert(0));
  boardArray[0][4] = new King('black', convert(4), convert(0));
  boardArray[0][5] = new Bishop('black', convert(5), convert(0));
  boardArray[0][6] = new Knight('black', convert(6), convert(0));
  boardArray[0][7] = new Rook('black', convert(7), convert(0));
  boardArray[1][0] = new Pawn('black', convert(0), convert(1));
  boardArray[1][1] = new Pawn('black', convert(1), convert(1));
  boardArray[1][2] = new Pawn('black', convert(2), convert(1));
  boardArray[1][3] = new Pawn('black', convert(3), convert(1));
  boardArray[1][4] = new Pawn('black', convert(4), convert(1));
  boardArray[1][5] = new Pawn('black', convert(5), convert(1));
  boardArray[1][6] = new Pawn('black', convert(6), convert(1));
  boardArray[1][7] = new Pawn('black', convert(7), convert(1));
  boardArray[6][0] = new Pawn('white', convert(0), convert(6));
  boardArray[6][1] = new Pawn('white', convert(1), convert(6));
  boardArray[6][2] = new Pawn('white', convert(2), convert(6));
  boardArray[6][3] = new Pawn('white', convert(3), convert(6));
  boardArray[6][4] = new Pawn('white', convert(4), convert(6));
  boardArray[6][5] = new Pawn('white', convert(5), convert(6));
  boardArray[6][6] = new Pawn('white', convert(6), convert(6));
  boardArray[6][7] = new Pawn('white', convert(7), convert(6));
  boardArray[7][0] = new Rook('white', convert(0), convert(7));
  boardArray[7][1] = new Knight('white', convert(1), convert(7));
  boardArray[7][2] = new Bishop('white', convert(2), convert(7));
  boardArray[7][3] = new Queen('white', convert(3), convert(7));
  boardArray[7][4] = new King('white', convert(4), convert(7));
  boardArray[7][5] = new Bishop('white', convert(5), convert(7));
  boardArray[7][6] = new Knight('white', convert(6), convert(7));
  boardArray[7][7] = new Rook('white', convert(7), convert(7));

  boardArray[0][0].build('bRook');
  boardArray[0][1].build('bKnight');
  boardArray[0][2].build('bBishop');
  boardArray[0][3].build('bQueen');
  boardArray[0][4].build('bKing');
  boardArray[0][5].build('bBishop');
  boardArray[0][6].build('bKnight');
  boardArray[0][7].build('bRook');
  boardArray[1][0].build('bPawn');
  boardArray[1][1].build('bPawn');
  boardArray[1][2].build('bPawn');
  boardArray[1][3].build('bPawn');
  boardArray[1][4].build('bPawn');
  boardArray[1][5].build('bPawn');
  boardArray[1][6].build('bPawn');
  boardArray[1][7].build('bPawn');
  boardArray[6][0].build('wPawn');
  boardArray[6][1].build('wPawn');
  boardArray[6][2].build('wPawn');
  boardArray[6][3].build('wPawn');
  boardArray[6][4].build('wPawn');
  boardArray[6][5].build('wPawn');
  boardArray[6][6].build('wPawn');
  boardArray[6][7].build('wPawn');
  boardArray[7][0].build('wRook');
  boardArray[7][1].build('wKnight');
  boardArray[7][2].build('wBishop');
  boardArray[7][3].build('wQueen');
  boardArray[7][4].build('wKing');
  boardArray[7][5].build('wBishop');
  boardArray[7][6].build('wKnight');
  boardArray[7][7].build('wRook');

  bKing = boardArray[0][4];
  wKing = boardArray[7][4];
  console.log('branch check');
}

function draw() {
  if (turn === 'white') {
    background('blue');
  }
  else if (turn === 'black') {
    background('red');
  }
}

function mouseClicked() {
  for (i = 0; i < boardArray.length; i++) {
    for (j = 0; j < boardArray.length; j++) {
      if (boardArray[i][j] != null) {
        if (boardArray[i][j].team === turn && contains(boardArray[i][j].xPos, boardArray[i][j].yPos)) {
          selected = boardArray[i][j];
          last = selected;
          console.log(last);
          break;
        }
      }
      else if (selected != null && (boardArray[i][j] === null || boardArray[i][j].team != turn)) {
        console.log('moving');
        move();
      }
    }
  }
}

function move() {
  if (valid())
  {
    boardArray[selected.yArr][selected.xArr] = null;
    selected.xArr = middlify(mouseX);
    selected.yArr = middlify(mouseY);
    selected.xPos = convert(selected.xArr);
    selected.yPos = convert(selected.yArr);
    selected.token.x = selected.xPos;
    selected.token.y = selected.yPos;
    selected.moved = true;
    boardArray[selected.yArr][selected.xArr] = selected;
    //selected.promotion();
    if (turn === 'white') {
      turn = 'black';
    }
    else if (turn === 'black') {
      turn = 'white';
    }
    lastMove = selected;
    selected = null;
    numMoves++;
  }
}

function contains(objectX, objectY) {
  if (objectX - 40 <= mouseX && mouseX < objectX + 40 && objectY - 40 <= mouseY && mouseY < objectY + 40) {
    return true;
  }
  return false;
}

function valid() {
  let xSpot = middlify(mouseX);
  let ySpot = middlify(mouseY);
  if (last.xArr === xSpot && last.yArr === ySpot) {
    return false;
  }
  else if (boardArray[ySpot][xSpot] != null && boardArray[ySpot][xSpot].team === selected.team) {
    selected = boardArray[ySpot][xSpot];
  }
  else if ((turn === 'white' && wKing.check()) || (turn === 'black' && bKing.check())) {
    if (safe(xSpot, ySpot)) {
      return true;
    }
    mouseX = -1;
    mouseY = -1;
    return false;
  }
  else if (selected.blocked(xSpot, ySpot)) {
    mouseX = -1;
    mouseY = -1;
    return false;
  }
  else if (selected.moves(xSpot, ySpot)) {
    if (boardArray[ySpot][xSpot] === null) {
      return true;
    }
    else if (boardArray[ySpot][xSpot].team != selected.team) {
      selected.capture(boardArray[ySpot][xSpot]);
      return true;
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}

function safe(xNew, yNew) {
  if (selected.moves(xNew, yNew)) {
    xOld = selected.xArr;
    yOld = selected.yArr;
    boardArray[yNew][xNew] = selected;
    if (turn === 'white') {
      return !wKing.check();
    }
    else if (turn === 'black') {
      return !bKing.check();
    }
    boardArray[yOld][xOld] = selected;
  }
  return false;
}

function middlify(num) {
  let pos = num / 80;
  pos = Math.round(pos);
  pos -= 1;
  return pos;
}

function convert(arrPos) {
  switch(arrPos) {
    case 0:
      boardPos = 80;
      break;
    case 1:
      boardPos = 160;
      break;
    case 2:
      boardPos = 240;
      break;
    case 3:
      boardPos = 320;
      break;
    case 4:
      boardPos = 400;
      break;
    case 5:
      boardPos = 480;
      break;
    case 6:
      boardPos = 560;
      break;
    case 7:
      boardPos = 640;
      break;
    // default:
    //   boardPos = -240;
    //   break;
  }

  return boardPos;
}

function revert(boardPos) {
  switch(boardPos) {
    case 80:
      arrPos = 0;
      break;
    case 160:
      arrPos = 1;
      break;
    case 240:
      arrPos = 2;
      break;
    case 320:
      arrPos = 3;
      break;
    case 400:
      arrPos = 4;
      break;
    case 480:
      arrPos = 5;
      break;
    case 560:
      arrPos = 6;
      break;
    case 640:
      arrPos = 7;
      break;
    // default:
    //   arrPos = 8;
    //   break;
  }

  return arrPos;
}

function recreate(newPiece, xSpot, ySpot) {
  console.log(newPiece);
  if (turn === 'white') {
    if (newPiece === 'Queen') {
      boardArray[ySpot][xSpot] = new Queen('white', convert(xSpot), convert(ySpot));
      boardArray[ySpot][xSpot].build('wQueen');
    }
    else if (newPiece === 'Rook') {
      boardArray[ySpot][xSpot] = new Rook('white', convert(xSpot), convert(ySpot));
      boardArray[ySpot][xSpot].build('wRook');
    }
    else if (newPiece === 'Bishop') {
      boardArray[ySpot][xSpot] = new Bishop('white', convert(xSpot), convert(ySpot));
      boardArray[ySpot][xSpot].build('wBishop');
    }
    else if (newPiece === 'Knight') {
      boardArray[ySpot][xSpot] = new Knight('white', convert(xSpot), convert(ySpot));
      boardArray[ySpot][xSpot].build('wKnight');
    }
    else {
      newPiece = null;
    }
  }
  else if (turn === 'black') {
    if (newPiece === 'Queen') {
      boardArray[ySpot][xSpot] = new Queen('black', convert(xSpot), convert(ySpot));
      boardArray[ySpot][xSpot].build('bQueen');
    }
    else if (newPiece === 'Rook') {
      boardArray[ySpot][xSpot] = new Rook('black', convert(xSpot), convert(ySpot));
      boardArray[ySpot][xSpot].build('bRook');
    }
    else if (newPiece === 'Bishop') {
      boardArray[ySpot][xSpot] = new Bishop('black', convert(xSpot), convert(ySpot));
      boardArray[ySpot][xSpot].build('bBishop');
    }
    else if (newPiece === 'Knight') {
      boardArray[ySpot][xSpot] = new Knight('black', convert(xSpot), convert(ySpot));
      boardArray[ySpot][xSpot].build('bKnight');
    }
    else {
      newPiece = null;
    }
  }
  return newPiece;
}

// function choose() {
//   let qButton = createButton('Queen');
//   let rButton = createButton('Rook');
//   let bButton = createButton('Bishop');
//   let kButton = createButton('Knight');
//   let val = null;
//   while (val === null) {
//     qButton.mousePressed(val = 'Queen');
//     rButton.mousePressed(val = 'Rook');
//     bButton.mousePressed(val = 'Bishop');
//     kButton.mousePressed(val = 'Knight');
//   }
//   return val;
// }

// function made(type) {
//   return type;
// }

class Piece {

  constructor(team, xPos, yPos) {
    this.team = team;
    this.xPos = xPos;
    this.yPos = yPos;
    this.xArr = revert(xPos);
    this.yArr = revert(yPos);
    this.moved = false;
  }

  build(ani) {
    this.token = new Sprite(this.xPos, this.yPos, 80, 80);
    this.token.spriteSheet = 'assets/ChessPieces.png';
    this.token.addAnis(pieces);
    this.token.changeAni(ani);
    this.token.collider = 'dynamic';
    this.token.layer = 2;
  }

  promotion() {}
}

class Pawn extends Piece {

  constructor(team, xPos, yPos) {
    super(team, xPos, yPos);
    this.type = 'Pawn';
  }

  moves(xNew, yNew) {
    if (this.firstMove(xNew, yNew)) {
      return true;
    }
    if (turn === 'white') {
      if (xNew === this.xArr && yNew === this.yArr - 1) {
        return true;
      }
      else if (Math.abs(xNew - this.xArr) === 1 && yNew === this.yArr - 1) {
        if (this.enPassante(xNew, yNew) || boardArray[yNew][xNew].team === 'black') {
          return true
        }
      }
    }
    else if (turn === 'black') {
      if (xNew === this.xArr && yNew === this.yArr + 1) {
        return true;
      }
      else if (Math.abs(xNew - this.xArr) === 1 && yNew === this.yArr + 1) {
        if (this.enPassante(xNew, yNew) || boardArray[yNew][xNew].team === 'white') {
          return true;
        }
      }
    }
  }

  blocked(xNew, yNew) {
    let result = false;
    if (xNew != this.xArr) {
      return result;
    }
    else if (turn === 'white') {
      if (boardArray[this.yArr - 1][this.xArr] != null) {
        result = true;
      }
    }
    else if (turn === 'black') {
      if (boardArray[this.yArr + 1][this.xArr] != null) {
        result = true;
      }
    }
    return result;
  }

  capture(taken) {
    if (turn === 'white') {
      if (Math.abs(taken.xArr - this.xArr) === 1 && taken.yArr === this.yArr - 1) {
        taken.token.remove();
      }
    }
    else if (turn === 'black') {
      if (Math.abs(taken.xArr - this.xArr) === 1 && taken.yArr === this.yArr + 1) {
        taken.token.remove();
      }
    }
  }

  firstMove(xNew, yNew) {
    if (!this.moved) {
      if (turn === 'white') {
        if (xNew === this.xArr && (yNew === this.yArr - 1 || yNew === this.yArr - 2) && boardArray[yNew][xNew] === null) {
          pass = numMoves;
          return true;
        }
      }
      else if (turn === 'black') {
        if (xNew === this.xArr && (yNew === this.yArr + 1 || yNew === this.yArr + 2) && boardArray[yNew][xNew] === null) {
          pass = numMoves;
          return true;
        }
      }
    }
    return false;
  }

  enPassante(xNew, yNew) {
    if (numMoves - 1 === pass) {
      if (turn === 'white') {
        if (this.yArr === 3 && (lastMove.yArr === this.yArr && Math.abs(lastMove.xArr - this.xArr) === 1)) {
          if (Math.abs(xNew - this.xArr) === 1 && yNew === this.yArr - 1 && lastMove.xArr === xNew) {
            boardArray[lastMove.yArr][lastMove.xArr] = null;
            lastMove.token.remove();
            return true;
          }
        }
      }
      else if (turn === 'black') {
        if (this.yArr === 4 && (lastMove.yArr === this.yArr && Math.abs(lastMove.xArr - this.xArr) === 1)) {
          if (Math.abs(xNew - this.xArr) === 1 && yNew === this.yArr + 1 && lastMove.xArr === xNew) {
            boardArray[lastMove.yArr][lastMove.xArr] = null;
            lastMove.token.remove();
            return true;
          }
        }
      }
    }
    return false;
  }

  promotion() {
    let xSpot = this.xArr;
    let ySpot = this.yArr;
    let newPiece;
    if (turn === 'white') {
      if (this.yArr === 0) {
        boardArray[this.yArr][this.xArr] = null;
        selected.token.remove();
        //newPiece = choose();
        do {
          newPiece = prompt("Input Queen, Rook, Bishop, or Knight.");
          console.log(newPiece);
          newPiece = recreate(newPiece, xSpot, ySpot);
        } while(newPiece === null);
      }
    }
    else if (turn === 'black') {
      if (this.yArr === 7) {
        boardArray[this.yArr][this.xArr] = null;
        selected.token.remove();
        do {
          newPiece = prompt("Input Queen, Rook, Bishop, or Knight.");
          newPiece = recreate(newPiece, xSpot, ySpot);
        } while(newPiece === null);
      }
    }
  }
}

class Rook extends Piece {

  constructor(team, xPos, yPos) {
    super(team, xPos, yPos);
    this.type = 'Rook';
  }

  moves(xNew, yNew) {
    if (xNew === this.xArr || yNew === this.yArr) {
      return true;
    }
    return false;
  }

  blocked(xNew, yNew) {
    let result = false;
    if (xNew != this.xArr) {
      if (xNew > this.xArr) {
        this.a = xNew;
        this.b = this.xArr + 1;
      }
      else {
        this.a = this.xArr;
        this.b = xNew + 1;
      }
      for (i = this.b; i < this.a; i++) {
        if (boardArray[yNew][i] != null) {
          result = true;
        }
      }
    }
    else {
      if (yNew > this.yArr) {
        this.a = yNew;
        this.b = this.yArr + 1;
      }
      else {
        this.a = this.yArr;
        this.b = yNew + 1;
      }
      for (i = this.b; i < this.a; i++) {
        if (boardArray[i][xNew] != null) {
          result = true;
        }
      }
    }
    return result;
  }

  capture(taken) {
    taken.token.remove();
  }
}

class Knight extends Piece {

  constructor(team, xPos, yPos) {
    super(team, xPos, yPos);
    this.type = 'Knight';
  }

  moves(xNew, yNew) {
    if ((Math.abs(xNew - this.xArr) === 2 && Math.abs(yNew - this.yArr) === 1) || Math.abs(xNew - this.xArr) === 1 && Math.abs(yNew - this.yArr) === 2) {
      return true;
    }
  }

  blocked(xSpot, ySpot) {
    return false;
  }

  capture(taken) {
    taken.token.remove();
  }
}

class Bishop extends Piece {

  constructor(team, xPos, yPos) {
    super(team, xPos, yPos);
    this.type = 'Bishop';
  }

  moves(xNew, yNew) {
    if (Math.abs(xNew - this.xArr) === Math.abs(yNew - this.yArr)) {
      return true;
    }
    return false;
  }

  blocked(xNew, yNew) {
    let result = false;
    let j = this.yArr + 1;
    let k = this.yArr - 1;
    if (xNew > this.xArr && yNew > this.yArr) {
      for (i = this.xArr + 1; i < xNew; i++) {
        if (boardArray[j][i] != null) {
          result = true;
        }
        j++;
      }
    }
    else if (xNew > this.xArr && yNew < this.yArr) {
      for (i = this.xArr + 1; i < xNew; i++) {
        if (boardArray[k][i] != null) {
          result = true;
        }
        k--;
      }
    }
    else if (xNew < this.xArr && yNew > this.yArr) {
      for (i = this.xArr - 1; i > xNew; i--) {
        if (boardArray[j][i] != null) {
          result = true;
        }
        j++;
      }
    }
    else {
      for (i = this.xArr - 1; i > xNew; i--) {
        if (boardArray[k][i] != null) {
          result = true;
        }
        k--;
      }
    }
    return result;
  }

  capture(taken) {
    taken.token.remove();
  }
}

class Queen extends Piece {

  constructor(team, xPos, yPos) {
    super(team, xPos, yPos);
    this.type = 'Queen';
  }

  moves(xNew, yNew) {
    if (xNew === this.xArr || yNew === this.yArr || Math.abs(xNew - this.xArr) === Math.abs(yNew - this.yArr)) {
      return true;
    }
    return false;
  }

  blocked(xNew, yNew) {
    let result = false;
    let j = this.yArr + 1;
    let k = this.yArr - 1;
    if (xNew > this.xArr && yNew > this.yArr) {
      for (i = this.xArr + 1; i < xNew; i++) {
        if (boardArray[j][i] != null) {
          result = true;
        }
        j++;
      }
    }
    else if (xNew > this.xArr && yNew < this.yArr) {
      for (i = this.xArr + 1; i < xNew; i++) {
        if (boardArray[k][i] != null) {
          result = true;
        }
        k--;
      }
    }
    else if (xNew < this.xArr && yNew > this.yArr) {
      for (i = this.xArr - 1; i > xNew; i--) {
        if (boardArray[j][i] != null) {
          result = true;
        }
        j++;
      }
    }
    else if (xNew < this.xArr && yNew < this.yArr) {
      for (i = this.xArr - 1; i > xNew; i--) {
        if (boardArray[k][i] != null) {
          result = true;
        }
        k--;
      }
    }
    else if (xNew != this.xArr) {
      if (xNew > this.xArr) {
        this.a = xNew;
        this.b = this.xArr + 1;
      }
      else {
        this.a = this.xArr;
        this.b = xNew + 1;
      }
      for (i = this.b; i < this.a; i++) {
        if (boardArray[yNew][i] != null) {
          result = true;
        }
      }
    }
    else {
      if (yNew > this.yArr) {
        this.a = yNew;
        this.b = this.yArr + 1;
      }
      else {
        this.a = this.yArr;
        this.b = yNew + 1;
      }
      for (i = this.b; i < this.a; i++) {
        if (boardArray[i][xNew] != null) {
          result = true;
        }
      }
    }
    return result;
  }

  capture(taken) {
    taken.token.remove();
  }
}

class King extends Piece {

  constructor(team, xPos, yPos) {
    super(team, xPos, yPos);
    this.threatened = false;
    this.type = 'King';
  }

  moves(xNew, yNew) {
    if (this.castle(xNew, yNew)) {
      return true;
    }
    else if (Math.abs(xNew - this.xArr) <= 1 && Math.abs(yNew - this.yArr) <= 1) {
      return true;
    }
    else {
      return false;
    }
  }

  blocked(xNew, yNew) {
    return false;
  }

  capture(taken) {
    taken.token.remove();
  }

  castle(xNew, yNew) {
    let far = boardArray[this.yArr][0];
    let near = boardArray[this.yArr][7];
    if (!this.moved) {
      if (far != null && !far.moved && yNew === this.yArr && xNew === 2) {
        for (i = 1; i < this.xArr; i++) {
          if (boardArray[this.yArr][i] != null) {
            return false;
          }
        }
        boardArray[far.yArr][far.xArr] = null;
        far.xArr = xNew + 1;
        far.yArr = yNew;
        far.xPos = convert(xNew + 1);
        far.yPos = convert(yNew);
        far.token.x = far.xPos;
        far.token.y = far.yPos;
        far.moved = true;
        boardArray[far.yArr][far.xArr] = far;
        return true;
      }
      else if (near != null && !near.moved && yNew === this.yArr && xNew === 6) {
        for (i = this.xArr + 1; i < 7; i++) {
          if (boardArray[this.yArr][i] != null) {
            return false;
          }
        }
        boardArray[near.yArr][near.xArr] = null;
        near.xArr = xNew - 1;
        near.yArr = yNew;
        near.xPos = convert(xNew - 1);
        near.yPos = convert(yNew);
        near.token.x = near.xPos;
        near.token.y = near.yPos;
        near.moved = true;
        boardArray[near.yArr][near.xArr] = near;
        return true;
      }
    }
    return false;
  }

  check() {
    this.threatened = false;
    let up = false;
    let down = false;
    let left = false;
    let right = false;
    let upLeft = false;
    let upRight = false;
    let downLeft = false;
    let downRight = false;
    for (i = this.yArr - 1; i >= 0; i--) {
      if (boardArray[i][this.xArr] != null) {
        if (boardArray[i][this.xArr].team != this.team && (boardArray[i][this.xArr].type === 'Queen' || boardArray[i][this.xArr].type === 'Rook')) {
          up = true;
          break;
        }
        else {
          up = false;
          break;
        }
      }
    }
    for (i = this.yArr + 1; i <= 7; i++) {
      if (boardArray[i][this.xArr] != null) {
        if (boardArray[i][this.xArr].team != this.team && (boardArray[i][this.xArr].type === 'Queen' || boardArray[i][this.xArr].type === 'Rook')) {
          down = true;
          break;
        }
        else {
          down = false;
          break;
        }
      }
    }
    for (i = this.xArr - 1; i >= 0; i--) {
      if (boardArray[this.yArr][i] != null) {
        if (boardArray[this.yArr][i].team != this.team && (boardArray[this.yArr][i].type === 'Queen' || boardArray[this.yArr][i].type === 'Rook')) {
          left = true;
          break;
        }
        else {
          left = false;
          break;
        }
      }
    }
    for (i = this.xArr + 1; i <= 7; i++) {
      if (boardArray[this.yArr][i] != null) {
        if (boardArray[this.yArr][i].team != this.team && (boardArray[this.yArr][i].type === 'Queen' || boardArray[this.yArr][i].type === 'Rook')) {
          right = true;
        }
        else {
          right = false;
        }
      }
    }
    this.threatened = (up || down || left || right);
    console.log(this.team, up, down, left, right, this.threatened);
    return this.threatened;
  }
}