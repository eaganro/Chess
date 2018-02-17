import React from 'react';
import BoardTile from './BoardTile.js';

class BoardRow extends React.Component{
  render(){
    //console.log('herer too');
    //console.log(this.props.selected);
    return (
      <div>
        {
          [...Array(8)].map((x,i) => <BoardTile color={this.props.color} move={this.props.move} moves={this.props.moves} selected={this.props.selected} select={this.props.select} i={i} y={this.props.i} tile={this.props.row[i]} key={i}/>)
        }
      </div>
    )  
  }
}

export default BoardRow