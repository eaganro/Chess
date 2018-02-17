import React from 'react';
import GameCard from './GameCard.js';


class Landing extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <button onClick={this.props.makeGame}>Create Game</button>
        {[...Array(this.props.games)].map((x,i) => <GameCard join={this.props.joinGame} i={i+1}/>)}
      </div>
    );
  }
}

export default Landing