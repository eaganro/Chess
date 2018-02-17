import React from 'react';
import Board from './Board.js';
import Landing from './Landing.js';
import axios from 'axios';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      game: 0,
      color: 0,
      games: 0
    }
    this.update()
  }

  update(){
    var that = this;
    setInterval(() => {
      axios.get('/getGames').then((res) => {
        //console.log(res.data);
        that.setState({
          games: res.data
        })
      });
    }, 2000);
  }

  makeGame(){
    //console.log('here');
    var that = this;
    axios.post('/newGame').then(function(response){
      //console.log(response.data);
      that.setState({
        game: response.data.gameNum,
        color: response.data.color
      })
    })
  }

  joinGame(i){
    var that = this;
    //console.log(i);
    axios.post('/joinGame', {gameNum: i}).then(function(response){
      //console.log(response.data);
      if(response.data.able){
        that.setState({
          game: response.data.gameNum,
          color: response.data.color
        })
      }
    })
  }

  render(){
    //console.log('kalsdbfladsbfljahdsbfljasfvjahsdfaf');
    return (
      <div>
        {this.state.game ? <Board game={this.state.game} color={this.state.color}/> :  <Landing games={this.state.games} makeGame={this.makeGame.bind(this)} joinGame={this.joinGame.bind(this)}/>}
      </div>
    )
  }
}

export default App;