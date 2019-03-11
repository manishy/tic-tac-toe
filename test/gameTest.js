let assert=require('assert');
let Game=require('./game.js');

let test={};
exports.test=test;

test['getCurrentPlayerInfo() should give information about current player']=function(){
  let game=new Game();
  let expectedOutput={
    name:"player1",
    image:"/images/like.jpg",
    moves:[]
  };
  assert.deepEqual(game.getCurrentPlayerInfo(),expectedOutput);
};

test['isDraw() should tell whether the game is draw or not']=function(){
  let game=new Game();
  assert.ok(!game.isDraw());
};

test['insertMove() should insert value into players moves']=function(){
  let game=new Game();
  game.insertMove(2);
  game.insertMove(9);
  let game2=new Game('dumb.jpg','../nothing');
  game2.insertMove(3);
  game2.insertMove(4);
  let player1=game.getCurrentPlayerInfo();
  let player2=game2.getCurrentPlayerInfo();
  assert.deepEqual(player1.moves,[2,9]);
  assert.deepEqual(player2.moves,[3,4]);
};

test['getTotalMoves() should give totalMoves in the game']=function(){
  let game=new Game();
  game.insertMove(2);
  game.currentplayerIndex=1-game.currentplayerIndex;
  game.insertMove(9);
  assert.deepEqual(game.getTotalMoves(),[2,9]);
};
