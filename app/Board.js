import React from 'react';
import axios from 'axios';
import BoardRow from './BoardRow.js';
import Promote from './Promote.js';

import { calculateMoves, checkCheck } from './boardHelpers';


class Board extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      board: this.props.color === 0 ?
        [
          [24, 23, 22, 25, 26, 22, 23, 24],
          [21, 21, 21, 21, 21, 21, 21, 21],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [11, 11, 11, 11, 11, 11, 11, 11],
          [14, 13, 12, 15, 16, 12, 13, 14],
        ] :
        [
          [14, 13, 12, 16, 15, 12, 13, 14],
          [11, 11, 11, 11, 11, 11, 11, 11],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [0, 0, 0, 0, 0, 0, 0, 0],
          [21, 21, 21, 21, 21, 21, 21, 21],
          [24, 23, 22, 26, 25, 22, 23, 24],
        ],
      selected: -1,
      moves: [],
      castleR: 1,
      castleL: 1,
      castleBR: 1,
      castleBL: 1,
      turn: 0,
      check: 0,
      promote: 0,
      enPassant: -100,
    }
    this.update();
  }

  update(){
    var that = this;
    setInterval(() => {
      axios.post('/getState', {
        game: this.props.game,
      }).then((res) => {
        let { board, turn, enPassant } = res.data;
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
          board,
          turn,
          enPassant,
        })
      });
    }, 2000);
  }

  movePiece(y, x, tile){
    var newBoard = [];
    const { game, color } = this.props;
    this.state.board.forEach((x)=> newBoard.push(x.slice()));


    var sy = this.state.selected[0];
    var sx = this.state.selected[1];
    var { board } = this.state;
    let canCastle = true;
    let enPassant = -100;
    var moves = [];
    if (color === 0) {
      console.log(board[sy][sx], sy, y); 
      if(board[sy][sx] === 11 && Number(sy) === 6 && y === 4) {
        enPassant = `${x+10}`;
        console.log(enPassant);
      }

      if(board[sy][sx] === 11 && Math.abs(sx - x) === 1 && board[y][x] === 0) {
        newBoard[y+1][x] = 0;
        moves.push([y+1,x,0]);
      }

      if(board[sy][sx] === 16 && y === 7 && x === 6){
        newBoard[7][6] = 16;
        newBoard[7][5] = 14;
        newBoard[7][4] = 0;
        newBoard[7][7] = 0;
        moves.push([7,6,16], [7,5,14], [7,4,0], [7,7,0]);
        canCastle = this.checkCastleSquare(7, 5);
      } else if(board[sy][sx] === 16 && y === 7 && x === 2){
        newBoard[7][2] = 16;
        newBoard[7][3] = 14;
        newBoard[7][4] = 0;
        newBoard[7][0] = 0;
        moves.push([7,2,16], [7,3,14], [7,4,0], [7,0,0]);
        canCastle = this.checkCastleSquare(7, 3);
      } else {
        newBoard[y][x] = board[sy][sx];
        newBoard[sy][sx] = 0;
        moves.push([y,x,newBoard[y][x]], [sy,sx,0]);
      }
    } else {
      if(board[sy][sx] === 21 && Number(sy) === 6 && y === 4) {
        enPassant = `${x+20}`;
      }

      if(board[sy][sx] === 21 && Math.abs(sx - x) === 1 && board[y][x] === 0) {
        newBoard[y+1][x] = 0;
        moves.push([y+1,x,0]);
      }

      if(board[sy][sx] === 26 && y === 7 && x === 5){
        newBoard[7][5] = 26;
        newBoard[7][4] = 24;
        newBoard[7][3] = 0;
        newBoard[7][7] = 0;
        moves.push([7,5,26], [7,4,24], [7,3,0], [7,7,0]);
        canCastle = this.checkCastleSquare(7, 4);
      } else if(board[sy][sx] === 26 && y === 7 && x === 1){
        newBoard[7][1] = 26;
        newBoard[7][2] = 24;
        newBoard[7][0] = 0;
        newBoard[7][3] = 0;
        moves.push([7,1,26], [7,2,24], [7,0,0], [7,3,0]);
        canCastle = this.checkCastleSquare(7, 2);
      } else {
        newBoard[y][x] = board[sy][sx];
        newBoard[sy][sx] = 0;
        moves.push([y,x,newBoard[y][x]], [sy,sx,0]);
      }
    }
    if(board[sy][sx] === 11 && y === 0){
      newBoard[y][x] = 15;
      newBoard[sy][sx] = 0;
      moves.push([y,x,newBoard[y][x]], [sy,sx,0]);
    } else if(board[sy][sx] === 21 && y === 0){
      newBoard[y][x] = 25;
      newBoard[sy][sx] = 0;
      moves.push([y,x,newBoard[y][x]], [sy,sx,0]);
    }

    if(checkCheck.call(this, newBoard) === 0 && canCastle){
      axios.post('/makeMove', {
        game,
        color,
        moves,
        enPassant,
      });

      if(newBoard[7][0] !== 14 || newBoard[7][4] !== 16){
        this.setState({
          castleL: 0
        })
      }
      if(newBoard[7][7] !== 14 || newBoard[7][4] !== 16){
        this.setState({
          castleR: 0
        })
      }

      if(newBoard[7][0] !== 24 || newBoard[7][3] !== 26){
        this.setState({
          castleBL: 0
        });
      }
      if(newBoard[7][7] !== 24 || newBoard[7][3] !== 26){
        this.setState({
          castleBR: 0
        })
      }
      console.log(this.state);
      this.setState({
        board: newBoard,
        selected: -1,
        moves: [],
        turn: this.state.turn === 0 ? 1 : 0,
      });
    }
  }

  checkCastleSquare(y, x) {
    let { board } = this.state;
    let moveList = [];
    for(let i = 0; i < 8; i++){
      for(let j = 0; j < 8; j++){
        if(Math.floor(board[i][j]/10) === (this.props.color === 0 ? 2 : 1)){
          moveList = moveList.concat(calculateMoves.call(this,i,j,1, board));
        }
      }
    }
    if (moveList.includes(`${y}${x}`)) {
      return false;
    }
    return true;
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
        {this.state.promote !== 0 ?
          <Promote /> :
          ''
        }
        {
          [...Array(8)].map((x,i) => <BoardRow color={this.props.color} move={this.movePiece.bind(this)} moves={this.state.moves} selected={this.state.selected} select={this.changeSelected.bind(this)} i={i} row={this.state.board[i]} key={i}/>)
        }
      </div>
    )  
  }
}

export default Board