import {
  calculateWhitePawnMoves,
  calculateBlackPawnMoves,
  calculateKnightMoves,
  calculateDiagonalMoves,
  calculateHorizontalMoves,
  calculateKingMoves,
} from './calculateMoves.js'

const calculateMoves = function(y,x,cb,board) {
  if(!board){
    board = this.state.board;
  }
  var list = [];
  var piece = board[y][x];
  if(piece === 11){
    list = list.concat(calculateWhitePawnMoves.call(this, y, x, board, piece));
  } else if(piece === 21){
    list = list.concat(calculateBlackPawnMoves.call(this, y, x, board, piece));
  } else if(piece === 13 || piece === 23){
    list = list.concat(calculateKnightMoves.call(this, y, x, board, piece));
  } else if(piece === 12 || piece === 15 || piece === 22 || piece === 25){
    list = list.concat(calculateDiagonalMoves.call(this, y, x, board, piece));
  }
  if(piece === 14 || piece === 15 || piece === 24 || piece === 25){
    list = list.concat(calculateHorizontalMoves.call(this, y, x, board, piece));
  } else if(piece === 16 || piece === 26){
    list = list.concat(calculateKingMoves.call(this, y, x, board, piece));
  }
  if(!cb){
    this.setState({
      moves: list
    })
  }
  return list;
};

const checkCheck = function(board){
  if(!board){
    board = this.state.board;
  }
  var moveList = [];
  var black;
  var white;
  for(var i = 0; i < 8; i++){
    for(var j = 0; j < 8; j++){
      if(board[i][j] === 16){
        white = ''+i+j;
      }
      if(board[i][j] === 26){
        black = ''+i+j;
      }
      if(Math.floor(board[i][j]/10) === (this.props.color === 0 ? 2 : 1)){
        moveList = moveList.concat(calculateMoves.call(this,i,j,1, board));
      }
    }
  }
  if(this.props.color === 0){
    if(moveList.includes(white)){
      return 1;
    }
  } else {
    if(moveList.includes(black)){
      return 1;
    }
  }
  return 0;
}

export {
  calculateMoves,
  checkCheck,
};
