import React from 'react';

class BoardTile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      boardColor: this.props.y % 2 === 0 ? this.props.i % 2 === 0 ? '0' : '1' : this.props.i % 2 === 0 ? '1' : '0',
      xy: '' + this.props.y + this.props.i
    }
  }

  select(e){
    if(this.props.tile !== 0){
      this.props.select(this.props.y, this.props.i, this.props.tile);
    } 
    if(this.props.selected !== -1){
      if(this.props.moves.includes(''+this.state.xy)){
        this.props.move(this.props.y, this.props.i)
      }
    }
  }

  render(){
    var extra = this.props.selected == this.state.xy ? '1' : ''
    var colorVal = this.state.boardColor + extra
    if(this.props.moves.includes(''+this.state.xy)){
      colorVal = this.state.boardColor + 'move';
    }
    var pieces = {
      0: 'O.png',
      11: 'WP.png',
      12: 'WB.png',
      13: 'WH.png',
      14: 'WR.png',
      15: 'WQ.png',
      16: 'WK.png',
      21: 'BP.png',
      22: 'BB.png',
      23: 'BH.png',
      24: 'BR.png',
      25: 'BQ.png',
      26: 'BK.png',
    }
    // if(this.props.color === 1){
    //   pieces = {
    //     0: 'O.png',
    //     11: 'BP.png',
    //     12: 'BB.png',
    //     13: 'BH.png',
    //     14: 'BR.png',
    //     15: 'BQ.png',
    //     16: 'BK.png',
    //     21: 'WP.png',
    //     22: 'WB.png',
    //     23: 'WH.png',
    //     24: 'WR.png',
    //     25: 'WQ.png',
    //     26: 'WK.png',
    //   }
    // }
    var opac = this.props.tile === 0 ? 0 : 1;
    const COLOR = {
      '1': 'hsl(24, 43%, 32%)',
      '0': 'hsl(136, 100%, 32%)',
      '11': 'hsl(24, 43%, 92%)',
      '01': 'hsl(136, 100%, 92%)',
      '1move': 'hsl(24, 43%, 62%)',
      '0move': 'hsl(136, 100%, 62%)'
    }
    return (
      <div id="back"
        onClick={this.select.bind(this)}
        style={{display: 'inline-block',
          width: '80px',
          height: '80px',
          border: '1px solid black',
          textAlign: 'center',
          backgroundColor: COLOR[colorVal]}}>
          <img style={{padding: '10px',
            display: 'block',
            margin: 'auto',
            width: '60px',
            height: '60px',
            opacity: opac}}
            src={`./img/${pieces[this.props.tile]}`}></img>
      </div>
    )  
  }
}

export default BoardTile
