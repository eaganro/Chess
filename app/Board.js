import React from 'react';
import BoardRow from './BoardRow.js';
import axios from 'axios';


class Board extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      board: [
        [24, 23, 22, 25, 26, 22, 23, 24],
        [21, 21, 21, 21, 21, 21, 21, 21],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0],
        [11, 11, 11, 11, 11, 11, 11, 11],
        [14, 13, 12, 15, 16, 12, 13, 14],
      ],
      selected: -1,
      moves: [],
      castleR: 1,
      castleL: 1,
      castleBR: 1,
      castleBL: 1,
      turn: 1,
      check: 0,
    }
    this.update();
  }

  update(){
    var that = this;
    setInterval(() => {
      axios.post('/getState', {
        game: this.props.game,
      }).then((res) => {
        var board = res.data.board
        if(this.props.color === 1){
          var newBoard = [];
          board.forEach((x)=> newBoard.push(x.slice()));
          newBoard.reverse();
          newBoard = newBoard.map((row) => row.reverse());
          newBoard = newBoard.map((row) => row.map((tile) => {
            if(Math.floor(tile/10) === 1){
              return tile + 10;
            } else if(Math.floor(tile/10) === 2){
              return tile - 10;
            }
            return tile;
          }))
          board = newBoard;
          console.log('flipadelphia')
        }
        that.setState({
          board: board,
          turn: res.data.turn
        })
      });
      console.log(this.state);
    }, 2000);
  }

  movePiece(y, x, tile){
    var newBoard = [];
    this.state.board.forEach((x)=> newBoard.push(x.slice()));


    var sy = this.state.selected[0];
    var sx = this.state.selected[1];
    var board = this.state.board;
    var moves = [];
    if(board[sy][sx] === 16 && y === 7 && x === 6){
      newBoard[7][6] = 16;
      newBoard[7][5] = 14;
      newBoard[7][4] = 0;
      newBoard[7][7] = 0;
      moves.push([7,6,16], [7,5,14], [7,4,0], [7,7,0]);
    } else if(board[sy][sx] === 16 && y === 7 && x === 2){
      newBoard[7][2] = 16;
      newBoard[7][3] = 14;
      newBoard[7][4] = 0;
      newBoard[7][0] = 0;
      moves.push([7,2,16], [7,3,14], [7,4,0], [0,7,0]);
    } else if(board[sy][sx] === 26 && y === 0 && x === 6){
      newBoard[0][6] = 26;
      newBoard[0][5] = 24;
      newBoard[0][4] = 0;
      newBoard[0][7] = 0;
      moves.push([0,6,26], [0,5,24], [0,4,0], [0,7,0]);
    } else if(board[sy][sx] === 26 && y === 0 && x === 2){
      newBoard[0][2] = 26;
      newBoard[0][3] = 24;
      newBoard[0][4] = 0;
      newBoard[0][0] = 0;
      moves.push([0,2,26], [0,3,24], [0,4,0], [0,0,0]);
    } else if(board[sy][sx] === 11 && y === 0){
      newBoard[y][x] = 15;
      newBoard[sy][sx] = 0;
      moves.push([y,x,newBoard[y][x]], [sy,sx,0]);
    } else if(board[sy][sx] === 21 && y === 7){
      newBoard[y][x] = 25;
      newBoard[sy][sx] = 0;
      moves.push([y,x,newBoard[y][x]], [sy,sx,0]);
    } else {
      newBoard[y][x] = board[sy][sx];
      newBoard[sy][sx] = 0;
      moves.push([y,x,newBoard[y][x]], [sy,sx,0]);
    }
    console.log('plzzzzzzzz');
    //console.log(this.checkCheck(newBoard));
    if(this.checkCheck(newBoard) === 0){
      axios.post('/makeMove', {
        game: this.props.game,
        color: this.props.color,
        moves: moves,
      });


      this.setState({
        board: newBoard,
        selected: -1,
        moves: [],
        turn: this.state.turn === 1 ? 2 : 1,
      })
      if(board[7][0] !== 14|| board[7][4] !== 16){
        this.setState({
          castleL: 0
        })
      }
      if(board[7][7] !== 14 || board[7][4] !== 16){
        this.setState({
          castleR: 0
        })
      }

      if(board[0][0] !== 24|| board[0][4] !== 26){
        this.setState({
          castleBL: 0
        })
      }
      if(board[0][7] !== 24 || board[0][4] !== 26){
        this.setState({
          castleBR: 0
        })
      }
    }
  }

  calculateMoves(y,x,cb,board){
    if(!board){
      board = this.state.board;
    }
    var list = [];
    var piece = board[y][x];
    if(piece === 11){
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
    } else if(piece === 21){
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
    } else if(piece === 13 || piece === 23){
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
    } else if(piece === 12 || piece === 15 || piece === 22 || piece === 25){
      var i, j;
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
    }
    if(piece === 14 || piece === 15 || piece === 24 || piece === 25){
      var i = y
      var j = x;
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
    } else if(piece === 16 || piece === 26){
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

    }
    if(!cb){
      this.setState({
        moves: list
      })
    }
    return list;
  }


  changeSelected(y, x){
    console.log('pre changed');
    if(this.props.color + 1 === this.state.turn){
      console.log('changed');
      //console.log(this.state.check);
      //console.log('piece, turn',this.state.board[y][x],this.state.turn);
      if(Math.floor(this.state.board[y][x]/10) === 1){
        this.setState({
          selected: ''+y+x
        })
        this.calculateMoves(y,x)
      }
    }
  }

  checkCheck(board){
    if(!board){
      board = this.state.board;
    }
    //console.log(board);
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
        if(board[i][j] !== 0){
          moveList = moveList.concat(this.calculateMoves(i,j,1, board));
        }
      }
    }
    //console.log(moveList);
    if(this.state.turn === 1){
      if(moveList.includes(white)){
        console.log('white');
        return 1;
      }
    } else {
      if(moveList.includes(black)){
        console.log('black');
        return 1;
      }
    }
    console.log('none');
    return 0;
  }


  render(){
    console.log(this.props);
    return (
      <div style={{lineHeight: '0px'}}>
        {
          [...Array(8)].map((x,i) => <BoardRow color={this.props.color} move={this.movePiece.bind(this)} moves={this.state.moves} selected={this.state.selected} select={this.changeSelected.bind(this)} i={i} row={this.state.board[i]} key={i}/>)
        }
      </div>
    )  
  }
}

export default Board