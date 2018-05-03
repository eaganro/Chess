import React from 'react';
import BoardRow from './BoardRow.js';
import axios from 'axios';

import { calculateMoves, checkCheck } from './boardHelpers';


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
      turn: 0,
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
          for(var i = 0; i < board.length; i++){
            newBoard.push([]);
            for(var j = 0; j < board[0].length; j++){
              newBoard[i].push(0);
            }
          }
          for(var i = 0; i < board.length; i++){
            for(var j = 0; j < board[i].length; j++){
              newBoard[j][board.length - 1 -i] = board[i][j];
            }
          }

          var newBoard2 = [];
          for(var i = 0; i < newBoard.length; i++){
            newBoard2.push([]);
            for(var j = 0; j < newBoard[0].length; j++){
              newBoard2[i].push(0);
            }
          }
          for(var i = 0; i < newBoard.length; i++){
            for(var j = 0; j < newBoard[i].length; j++){
              newBoard2[j][newBoard.length - 1 -i] = newBoard[i][j];
            }
          }
          board = newBoard2;
        }
        that.setState({
          board: board,
          turn: res.data.turn
        })
      });
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
    if(checkCheck.call(this, newBoard) === 0){
      axios.post('/makeMove', {
        game: this.props.game,
        color: this.props.color,
        moves: moves,
      });


      this.setState({
        board: newBoard,
        selected: -1,
        moves: [],
        turn: this.state.turn === 0 ? 1 : 0,
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

  changeSelected(y, x){
    if(this.props.color === this.state.turn){
      if(this.props.color === 0) {
        if(Math.floor(this.state.board[y][x]/10) === 1){
          this.setState({
            selected: ''+y+x
          });
          calculateMoves.call(this,y,x);
        }
      } else {
        if(Math.floor(this.state.board[y][x]/10) === 2){
          this.setState({
            selected: ''+y+x
          });
          calculateMoves.call(this,y,x);
        }
      }
    }
  }

  render(){
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