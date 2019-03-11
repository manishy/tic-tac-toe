let assert=require('assert');
let Player=require('./player.js');

let test={};
exports.test=test;

test['hasWon() should tell whether the player won or not']=function () {
  let player=new Player('player1','dumb');
  let player1=new Player('player2','nothing');
  assert.ok(!player.hasWon());
  player1.moves=[1,2,3];
  assert.ok(player1.hasWon());
};
