const Player = require('./player.js');
let Game = function() {
  this.players = [];
  this.players.push(new Player("player1", '/images/like.jpg'));
  this.players.push(new Player("player2", '/images/haha.png'));
  this.currentplayerIndex = 0;
};

Game.prototype.getCurrentPlayerInfo = function() {
  return this.players[this.currentplayerIndex];
};
Game.prototype.isDraw = function() {
  let moves = this.players[0].moves.length;
  moves += this.players[1].moves.length;
  return moves == 9;
};
Game.prototype.insertMove=function(pos){
  this.players[this.currentplayerIndex].moves.push(pos);
  return this.players[this.currentplayerIndex];
};
Game.prototype.getTotalMoves=function(){
  return this.players[0].moves.concat(this.players[1].moves);
};
module.exports=Game;
