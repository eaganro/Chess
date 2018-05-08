const Sequelize = require('sequelize');
const sequelize = new Sequelize('chess', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

const Users = sequelize.define('users', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
}); 

const Games = sequelize.define('games', {
  board: Sequelize.STRING,
  turn: Sequelize.INTEGER,
  enPassant: Sequelize.INTEGER,
  white: Sequelize.INTEGER,
  black: Sequelize.INTEGER,
})