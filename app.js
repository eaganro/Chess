var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var parser = require('body-parser');

server.listen(8081);

app.use(parser.json());
app.use(express.static(__dirname + '/public/'));

var games = [{}];

app.post('/newGame', function(req, res){
  console.log('server');
  var color = Math.floor(Math.random()+.5);
  var white = 1;
  var black = 0;
  if(color === 1){
    white = 0;
    black = 1;
  }
  var game = {
    white: white,
    black: black,
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
    turn: 0
  }
  games.push(game);
  var data = {
    color: color,
    gameNum: games.length-1
  }
  res.send(200,data);
})

app.post('/joinGame', function(req, res){
  var color = 0;
  var able = 1;
  if(games[req.body.gameNum].white === 1){
    color = 1;
    if(games[req.body.gameNum].black === 1){
      able = 0;
    }
  }
  if(able === 1){
    games[req.body.gameNum].white = 1;
    games[req.body.gameNum].black = 1;
  }
  var data = {
    color: color,
    gameNum: games.length-1,
    able: able
  }
  res.send(200,data);
})

app.post('/makeMove', function(req, res){
  var newMoves = [];
  if(req.body.color === 1){
    for(var i = 0; i < req.body.moves.length; i++){
      var piece = req.body.moves[i][2]
      // if(Math.floor(req.body.moves[i][2]/10) === 1){
      //   piece = req.body.moves[i][2] + 10;
      // }
      newMoves.push([7-req.body.moves[i][0], 7-req.body.moves[i][1], piece])
    }
  } else{
    // for(var i = 0; i < req.body.moves.length; i++){
    //   var piece = req.body.moves[i][2]
    //   newMoves.push([req.body.moves[i][0], 7-req.body.moves[i][1], piece])
    // }
    newMoves = req.body.moves;
  }
  for(var i = 0; i < newMoves.length; i++){
    games[req.body.game].board[newMoves[i][0]][newMoves[i][1]] = newMoves[i][2];
  }
  games[req.body.game].turn = games[req.body.game].turn === 0 ? 1 : 0;

  console.log(games[req.body.game].board);
  res.send();
})

app.post('/getState', function(req, res){
  console.log(req.body);
  var board = games[req.body.game].board;
  var turn = games[req.body.game].turn;
  var data = {
    board: board,
    turn: turn,
  }
  res.send(data);
})

app.get('/getGames', function(req, res){
  res.send(200, games.length-1);
})



// app.get('/', function(req, res){
//   res.sendFile(__dirname + '/public/index.html');
// })