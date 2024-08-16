//king: check
//pawn: enpassante, queening

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

  let qBlackRook = new Rook('black', convert(0), convert(0));
  let qBlackKnight = new Knight('black', convert(1), convert(0));
  let qBlackBishop = new Bishop('black', convert(2), convert(0));
  let blackQueen = new Queen('black', convert(3), convert(0));
  let blackKing = new King('black', convert(4), convert(0));
  let kBlackBishop = new Bishop('black', convert(5), convert(0));
  let kBlackKnight = new Knight('black', convert(6), convert(0));
  let kBlackRook = new Rook('black', convert(7), convert(0));
  let qBlackPawnR = new Pawn('black', convert(0), convert(1));
  let qBlackPawnK = new Pawn('black', convert(1), convert(1));
  let qBlackPawnB = new Pawn('black', convert(2), convert(1));
  let qBlackPawn = new Pawn('black', convert(3), convert(1));
  let kBlackPawn = new Pawn('black', convert(4), convert(1));
  let kBlackPawnB = new Pawn('black', convert(5), convert(1));
  let kBlackPawnK = new Pawn('black', convert(6), convert(1));
  let kBlackPawnR = new Pawn('black', convert(7), convert(1));
  let qWhitePawnR = new Pawn('white', convert(0), convert(6));
  let qWhitePawnK = new Pawn('white', convert(1), convert(6));
  let qWhitePawnB = new Pawn('white', convert(2), convert(6));
  let qWhitePawn = new Pawn('white', convert(3), convert(6));
  let kWhitePawn = new Pawn('white', convert(4), convert(6));
  let kWhitePawnB = new Pawn('white', convert(5), convert(6));
  let kWhitePawnK = new Pawn('white', convert(6), convert(6));
  let kWhitePawnR = new Pawn('white', convert(7), convert(6));
  let qWhiteRook = new Rook('white', convert(0), convert(7));
  let qWhiteKnight = new Knight('white', convert(1), convert(7));
  let qWhiteBishop = new Bishop('white', convert(2), convert(7));
  let whiteQueen = new Queen('white', convert(3), convert(7));
  let whiteKing = new King('white', convert(4), convert(7));
  let kWhiteBishop = new Bishop('white', convert(5), convert(7));
  let kWhiteKnight = new Knight('white', convert(6), convert(7));
  let kWhiteRook = new Rook('white', convert(7), convert(7));
  
  qBlackRook.build('bRook');
  qBlackKnight.build('bKnight');
  qBlackBishop.build('bBishop');
  blackQueen.build('bQueen');
  blackKing.build('bKing');
  kBlackBishop.build('bBishop');
  kBlackKnight.build('bKnight');
  kBlackRook.build('bRook');
  qBlackPawnR.build('bPawn');
  qBlackPawnK.build('bPawn');
  qBlackPawnB.build('bPawn');
  qBlackPawn.build('bPawn');
  kBlackPawn.build('bPawn');
  kBlackPawnB.build('bPawn');
  kBlackPawnK.build('bPawn');
  kBlackPawnR.build('bPawn');
  qWhitePawnR.build('wPawn');
  qWhitePawnK.build('wPawn');
  qWhitePawnB.build('wPawn');
  qWhitePawn.build('wPawn');
  kWhitePawn.build('wPawn');
  kWhitePawnB.build('wPawn');
  kWhitePawnK.build('wPawn');
  kWhitePawnR.build('wPawn');
  qWhiteRook.build('wRook');
  qWhiteKnight.build('wKnight');
  qWhiteBishop.build('wBishop');
  whiteQueen.build('wQueen');
  whiteKing.build('wKing');
  kWhiteBishop.build('wBishop');
  kWhiteKnight.build('wKnight');
  kWhiteRook.build('wRook');

  boardArray[0][0] = qBlackRook;
  boardArray[0][1] = qBlackKnight;
  boardArray[0][2] = qBlackBishop;
  boardArray[0][3] = blackQueen;
  boardArray[0][4] = blackKing;
  boardArray[0][5] = kBlackBishop;
  boardArray[0][6] = kBlackKnight;
  boardArray[0][7] = kBlackRook;
  boardArray[1][0] = qBlackPawnR;
  boardArray[1][1] = qBlackPawnK;
  boardArray[1][2] = qBlackPawnB;
  boardArray[1][3] = qBlackPawn;
  boardArray[1][4] = kBlackPawn;
  boardArray[1][5] = kBlackPawnB;
  boardArray[1][6] = kBlackPawnK;
  boardArray[1][7] = kBlackPawnR;
  boardArray[6][0] = qWhitePawnR;
  boardArray[6][1] = qWhitePawnK;
  boardArray[6][2] = qWhitePawnB;
  boardArray[6][3] = qWhitePawn;
  boardArray[6][4] = kWhitePawn;
  boardArray[6][5] = kWhitePawnB;
  boardArray[6][6] = kWhitePawnK;
  boardArray[6][7] = kWhitePawnR;
  boardArray[7][0] = qWhiteRook;
  boardArray[7][1] = qWhiteKnight;
  boardArray[7][2] = qWhiteBishop;
  boardArray[7][3] = whiteQueen;
  boardArray[7][4] = whiteKing;
  boardArray[7][5] = kWhiteBishop;
  boardArray[7][6] = kWhiteKnight;
  boardArray[7][7] = kWhiteRook;
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
          break;
        }
      }
      else if (selected != null) {
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
}

class Pawn extends Piece {

  constructor(team, xPos, yPos) {
    super(team, xPos, yPos);
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
    if (turn === 'white') {

    }
    else if (turn === 'black') {

    }
  }
}

class Rook extends Piece {

  constructor(team, xPos, yPos) {
    super(team, xPos, yPos);
  }

  moves(xNew, yNew) {
    if (xNew === this.xArr || yNew === this.yArr) {
      return true;
    }
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
  }

  moves(xNew, yNew) {
    if (Math.abs(xNew - this.xArr) === Math.abs(yNew - this.yArr)) {
      return true;
    }
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
  }

  moves(xNew, yNew) {
    if (xNew === this.xArr || yNew === this.yArr || Math.abs(xNew - this.xArr) === Math.abs(yNew - this.yArr)) {
      return true;
    }
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
      if (!far.moved && yNew === this.yArr && xNew === 1) {
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
      else if (!near.moved && yNew === this.yArr && xNew === 6) {
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

  }
}