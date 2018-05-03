const calculateWhitePawnMoves = function(y, x, board, piece) {
  const list = [];
  if (this.props.color === 0) {
    if(board[y-1][x] === 0){
      list.push(String(y-1)+x);
      if(y === 6 && board[y-2][x] === 0){
        list.push(String(y-2)+x);
      }
    }
    if(board[y-1] && board[y-1][x-1] !== 0 && Math.floor(board[y-1][x-1]/10) !== Math.floor(piece/10)){
      list.push(String(y-1) + (x-1));
    }
    if(board[y-1] && board[y-1][x+1] !== 0 && Math.floor(board[y-1][x+1]/10) !== Math.floor(piece/10)){
      list.push(String(y-1) + (x+1));
    }
  } else {
    if(board[y+1][x] === 0){
      list.push(String(y+1)+x);
      if(y === 1 && board[y+2][x] === 0){
        list.push(String(y+2)+x);
      }
    }
    if(board[y+1] && board[y+1][x-1] !== 0 && Math.floor(board[y+1][x-1]/10) !== Math.floor(piece/10)){
      list.push(String(y+1) + (x-1));
    }
    if(board[y+1] && board[y+1][x+1] !== 0 && Math.floor(board[y+1][x+1]/10) !== Math.floor(piece/10)){
      list.push(String(y+1) + (x+1));
    }
  }
  return list;
}
const calculateBlackPawnMoves = function(y, x, board, piece) {
  const list = [];
  if (this.props.color === 0) {
    if(board[y+1][x] === 0){
      list.push(String(y+1)+x);
      if(y === 1 && board[y+2][x] === 0){
        list.push(String(y+2)+x);
      }
    }
    if(board[y+1] && board[y+1][x-1] !== 0 && Math.floor(board[y+1][x-1]/10) !== Math.floor(piece/10)){
      list.push(String(y+1) + (x-1));
    }
    if(board[y+1] && board[y+1][x+1] !== 0 && Math.floor(board[y+1][x+1]/10) !== Math.floor(piece/10)){
      list.push(String(y+1) + (x+1));
    }
  } else {
    if(board[y-1][x] === 0){
      list.push(String(y-1)+x);
      if(y === 6 && board[y-2][x] === 0){
        list.push(String(y-2)+x);
      }
    }
    if(board[y-1] && board[y-1][x-1] !== 0 && Math.floor(board[y-1][x-1]/10) !== Math.floor(piece/10)){
      list.push(String(y-1) + (x-1));
    }
    if(board[y-1] && board[y-1][x+1] !== 0 && Math.floor(board[y-1][x+1]/10) !== Math.floor(piece/10)){
      list.push(String(y-1) + (x+1));
    }
  }
  return list;
}

const calculateKnightMoves = function(y, x, board, piece) {
  const list = [];
  if(board[y-2] && (board[y-2][x-1] === 0 || Math.floor(board[y-2][x-1]/10) !== Math.floor(piece/10))){
    list.push(String(y-2)+(x-1));
  }
  if(board[y-2] && (board[y-2][x+1] === 0 || Math.floor(board[y-2][x+1]/10) !== Math.floor(piece/10))){
    list.push(String(y-2)+(x+1));
  }
  if(board[y-1] && (board[y-1][x+2] === 0 || Math.floor(board[y-1][x+2]/10) !== Math.floor(piece/10))){
    list.push(String(y-1)+(x+2));
  }
  if(board[y-1] && (board[y-1][x-2] === 0 || Math.floor(board[y-1][x-2]/10) !== Math.floor(piece/10))){
    list.push(String(y-1)+(x-2));
  }

  if(board[y+2] && (board[y+2][x-1] === 0 || Math.floor(board[y+2][x-1]/10) !== Math.floor(piece/10))){
    list.push(String(y+2)+(x-1));
  }
  if(board[y+2] && (board[y+2][x+1] === 0 || Math.floor(board[y+2][x+1]/10) !== Math.floor(piece/10))){
    list.push(String(y+2)+(x+1));
  }
  if(board[y+1] && (board[y+1][x-2] === 0 || Math.floor(board[y+1][x-2]/10) !== Math.floor(piece/10))){
    list.push(String(y+1)+(x-2));
  }
  if(board[y+1] && (board[y+1][x+2] === 0 || Math.floor(board[y+1][x+2]/10) !== Math.floor(piece/10))){
    list.push(String(y+1)+(x+2));
  }
  return list;
}

const calculateDiagonalMoves = function(y, x, board, piece) {
  const list = [];
  let i;
  let j;
  for(i = y+1, j = x+1; i < 8, j < 8; i++, j++){
    if(board[i] && (board[i][j] === 0 || Math.floor(board[i][j]/10) !== Math.floor(piece/10))){
      list.push(String(i) + j);
      if(board[i][j] !== 0 && Math.floor(board[i][j]/10) !== Math.floor(piece/10)){
        i = 8;
      }
    } else{
      i = 8;
    }
  }

  for(i = y+1, j = x-1; i < 8, j >= 0; i++, j--){
    if(board[i] && (board[i][j] === 0 || Math.floor(board[i][j]/10) !== Math.floor(piece/10))){
      list.push(String(i) + j);
      if(board[i][j] !== 0 && Math.floor(board[i][j]/10) !== Math.floor(piece/10)){
        i = 8;
      }
    } else{
      i = 8;
    }
  }

  for(i = y-1, j = x+1; i >= 0, j < 8; i--, j++){
    if(board[i] && (board[i][j] === 0 || Math.floor(board[i][j]/10) !== Math.floor(piece/10))){
      list.push(String(i) + j);
      if(board[i][j] !== 0 && Math.floor(board[i][j]/10) !== Math.floor(piece/10)){
        j = 8;
      }
    } else{
      j = 8;
    }
  }

  for(i = y-1, j = x-1; i >= 0, j >= 0; i--, j--){
    if(board[i] && (board[i][j] === 0 ||Math.floor(board[i][j]/10) !== Math.floor(piece/10))){
      list.push(String(i) + j);
      if(board[i][j] !== 0 && Math.floor(board[i][j]/10) !== Math.floor(piece/10)){
        i = -1;
      }
    } else{
      i = -1;
    }
  }
  return list;
}

const calculateHorizontalMoves = function(y, x, board, piece) {
  const list = [];
  let i = y
  let j = x;
  for(i = y+1; i < 8; i++){
    if(board[i] && (board[i][j] === 0 || Math.floor(board[i][j]/10) !== Math.floor(piece/10))){
      list.push(String(i) + j);
      if(board[i][j] !== 0 && Math.floor(board[i][j]/10) !== Math.floor(piece/10)){
        i = 8;
      }
    } else{
      i = 8;
    }
  } 
  j = x;
  for(i = y-1; i >= 0; i--){
    if(board[i] && (board[i][j] === 0 || Math.floor(board[i][j]/10) !== Math.floor(piece/10))){
      list.push(String(i) + j);
      if(board[i][j] !== 0 && Math.floor(board[i][j]/10) !== Math.floor(piece/10)){
        i = -1;
      }
    } else{
      i = -1;
    }
  }
  i = y;
  for(j = x+1; j < 8; j++){
    if(board[i] && (board[i][j] === 0 || Math.floor(board[i][j]/10) !== Math.floor(piece/10))){
      list.push(String(i) + j);
      if(board[i][j] !== 0 && Math.floor(board[i][j]/10) !== Math.floor(piece/10)){
        j = 8;
      }
    } else{
      j = 8;
    }
  }
  i = y;
  for(j = x-1; j >= 0; j--){
    if(board[i] && (board[i][j] === 0 ||Math.floor(board[i][j]/10) !== Math.floor(piece/10))){
      list.push(String(i) + j);
      if(board[i][j] !== 0 && Math.floor(board[i][j]/10) !== Math.floor(piece/10)){
        i = -1;
      }
    } else{
      i = -1;
    }
  }
  return list;
}

const calculateKingMoves = function(y, x, board, piece) {
  const list = [];
  if(board[y+1] && (board[y+1][x] === 0 || Math.floor(board[y+1][x]/10) !== Math.floor(piece/10))){
    list.push(String(y+1)+(x));
  }
  if(board[y+1] && (board[y+1][x+1] === 0 || Math.floor(board[y+1][x+1]/10) !== Math.floor(piece/10))){
    list.push(String(y+1)+(x+1));
  }
  if(board[y+1] && (board[y+1][x-1] === 0 || Math.floor(board[y+1][x-1]/10) !== Math.floor(piece/10))){
    list.push(String(y+1)+(x-1));
  }
  if(board[y][x+1] === 0 || Math.floor(board[y][x+1]/10) !== Math.floor(piece/10)){
    list.push(String(y)+(x+1));
  }
  if(board[y][x-1] === 0 || Math.floor(board[y][x-1]/10) !== Math.floor(piece/10)){
    list.push(String(y)+(x-1));
  }
  if(board[y-1] && (board[y-1][x+1] === 0 || Math.floor(board[y-1][x+1]/10) !== Math.floor(piece/10))){
    list.push(String(y-1)+(x+1));
  }
  if(board[y-1] && (board[y-1][x] === 0 || Math.floor(board[y-1][x]/10) !== Math.floor(piece/10))){
    list.push(String(y-1)+(x));
  }
  if(board[y-1] && (board[y-1][x-1] === 0 || Math.floor(board[y-1][x-1]/10) !== Math.floor(piece/10))){
    list.push(String(y-1)+(x-1));
  }
  if(piece === 16){
    if(board[7][5] === 0 && board[7][6] === 0 && this.state.castleR){
      list.push('76');
    }
    if(board[7][3] === 0 && board[7][2] === 0 && board[7][1] === 0 && this.state.castleL){
      list.push('72');
    }
  } else if(piece === 26){
    if(board[0][5] === 0 && board[0][6] === 0 && this.state.castleBR){
      list.push('06');
    }
    if(board[0][3] === 0 && board[0][2] === 0 && board[0][1] === 0 && this.state.castleBL){
      list.push('02');
    }
  }
  return list;
}

export {
  calculateWhitePawnMoves,
  calculateBlackPawnMoves,
  calculateKnightMoves,
  calculateDiagonalMoves,
  calculateHorizontalMoves,
  calculateKingMoves,
};
