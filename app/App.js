import React from 'react';
import axios from 'axios';

import { Input, Button, Segment, Grid, Header } from 'semantic-ui-react';

import Board from './Board.js';
import Landing from './Landing.js';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      signUp: false,
      loggedIn: false,
      username: '',
      password: '',
      game: 0,
      color: 0,
      games: 0
    }
    this.update()

    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
  }

  update(){
    var that = this;
    setInterval(() => {
      axios.get('/getGames').then((res) => {
        that.setState({
          games: res.data
        })
      });
    }, 2000);
  }

  makeGame(){
    var that = this;
    axios.post('/newGame').then(function(response){
      that.setState({
        game: response.data.gameNum,
        color: response.data.color
      })
    })
  }

  joinGame(i){
    var that = this;
    axios.post('/joinGame', {gameNum: i}).then(function(response){
      if(response.data.able){
        that.setState({
          game: response.data.gameNum,
          color: response.data.color
        })
      }
    })
  }

  usernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }
  passwordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }

  render(){
    return (
      <div>
        {/* {this.state.loggedIn ? */}
          {this.state.game ?
            <Board game={this.state.game} color={this.state.color}/> :
            <Landing games={this.state.games} makeGame={this.makeGame.bind(this)} joinGame={this.joinGame.bind(this)}/>
          }
          {/* :
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr 2fr', gridTemplateRows: '25vh 25vh 25vh 25vh' }}>
            <Segment.Group raised compact style={{ gridRow: 2, gridColumn: 2, alignItems: 'center' }}>
              <Segment compact textAlign="left">
                <Input
                  value={this.state.username}
                  onChange={this.usernameChange}
                  icon="user"
                  iconPosition="left"
                  placeholder="Username..."
                />
                <Input
                  value={this.state.password}
                  onChange={this.passwordChange}
                  icon="protect"
                  iconPosition="left"
                  placeholder="Password..."
                  type="password"
                />
                <Button
                  primary
                  onClick={this.signUp}
                  style={{ width: 100 }}
                >
                  {this.state.signUp ? 'Sign Up' : 'Login'}
                </Button>
              </Segment>
              <Segment compact>
                <Button.Group>
                  <Button
                    onClick={() => this.setState({ signUp: !this.state.signUp, username: '', password: '' })}
                    style={{ width: 130 }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    onClick={() => this.setState({ signup: false, empLogin: true, username: '', password: '' })}
                    style={{ width: 130 }}
                  >
                    Play As Guest
                  </Button>
                </Button.Group>
              </Segment>
            </Segment.Group>
          </div> */}
      </div>
    )
  }
}

export default App;