import React from 'react';

class GameCard extends React.Component{

  clickJoin(){
    this.props.join(this.props.i);
  }

  render(){
    return(
      <div style={{border: '1px solid black'}}>
        <button onClick={this.clickJoin.bind(this)}>Click Here To Join Game</button>
      </div>
    );
  }
}

export default GameCard