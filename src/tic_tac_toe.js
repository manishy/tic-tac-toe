const isSubset = function(set, superSet) {
  return set.every(function(element) {
    return superSet.includes(element);
  });
}

let Player = function(image) {
  this.name = "";
  this.image = image;
  this.moves = [];
}
Player.prototype.hasWon = function() {
  let winningCombinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];
  let moves = this.moves;
  return winningCombinations.some(function(element) {
    return isSubset(element,moves);
  });
};
Player.prototype.setPlayerName=function(name) {
 this.name=name;
};
//############################

let Game = function() {
  this.players = [];
  this.players.push(new Player('images/like.jpg'));
  this.players.push(new Player('images/haha.png'));
  this.currentplayerIndex = 0;
};

Game.prototype.setPlayersName=function(names) {
  names.forEach((name,index)=>{
    this.players[index].setPlayerName(name);
  });
}
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

// ---------------------------------
// ---------------------------------
// ---------------------------------
// ---------------------------------
// ---------------------------------
// ---------------------------------
let game=new Game();

let action = {
  won: function(cellPosition, currentPlayer) {
    updateDisplay(`${currentPlayer.name}` + " has won");
    removeClickListenerOnTable();
  },
  draw: function() {
    updateDisplay("IT'S DRAW");
    removeClickListenerOnTable();
  },
  isOn: function(cellPosition, currentPlayer) {
    game.currentplayerIndex = 1 - game.currentplayerIndex;
    currentPlayer = game.getCurrentPlayerInfo();
    updateDisplay(`${currentPlayer.name}` + "'s Turn");
  }
};
const removeClickListenerOnTable=function(){
  let table = document.getElementById("tic-tac-toe");
  table.onclick = null;
  let button=document.getElementById('resetgrid');
  button.disabled = !button.disabled;
}

const updateDisplay = function(text) {
  let display = document.getElementById('display');
  display.innerText =text;
}

const getGameStatus = function() {
  let gameStatus = {};
  let currentPlayer = game.getCurrentPlayerInfo();
  if (currentPlayer.hasWon()) {
    gameStatus.status = "won";
    gameStatus.winner = currentPlayer.name;
  } else if (game.isDraw()) {
    gameStatus.status = "draw";
  } else {
    gameStatus.status = "isOn";
  }
  return gameStatus;
}
const enableDetailsBlock=function() {
  document.getElementById('player1').disabled=false;
  document.getElementById('player2').disabled=false;
  document.getElementById('submit').disabled=false;
}
const disableDetailsBlock=function() {
  document.getElementById('player1').disabled=true;
  document.getElementById('player2').disabled=true;
  document.getElementById('submit').disabled=true;
}
const takeDetails=function() {
  let player1Name=document.getElementById('player1').value;
  let player2Name=document.getElementById('player2').value;
  if(player1Name==''||player2Name==''){
    alert('ENTER DETAILS');
    return;
  }
  game.setPlayersName([player1Name,player2Name]);
  let currentPlayer = game.getCurrentPlayerInfo();
  updateDisplay(`${currentPlayer.name}` + "'s Turn");
  disableDetailsBlock();
  insertClickListenerOnTable();
}
const updateSelectedCell = function(pos) {
  let currentPlayer = game.getCurrentPlayerInfo();
  let cell = document.getElementById(pos);
  cell.style.backgroundColor="#fff";
  game.insertMove(pos);
  let imageTag= "<img src="+`${currentPlayer.image}`+" alt='' height=140px width=140px>";
  cell.innerHTML = imageTag;
  let gameStatus = getGameStatus();
  action[gameStatus.status](pos, currentPlayer);
}

const handlePositionSelected = function(event) {
  let currentPlayer = game.getCurrentPlayerInfo();
  let cell = event.target;
  let cellPosition = +cell.id;
  let totalMoves=game.getTotalMoves();
  if (totalMoves.includes(cellPosition)) {
    return;
  }
  updateSelectedCell(cellPosition);
}
const resetGame=function(){
  location.reload();
}
const insertClickListenerOnTable = function() {
  let table = document.getElementById("tic-tac-toe");
  table.onclick = handlePositionSelected;
  let currentPlayer = game.getCurrentPlayerInfo();
  updateDisplay(`${currentPlayer.name}` + "'s Turn");
}
const insertClickListenerOnButton=function(){
  let button=document.getElementById("resetgrid");
  let submit=document.getElementById('submit');
  submit.onclick=takeDetails;
  button.disabled=true;
  button.onclick=resetGame;
}
const beginGame = function() {
  insertClickListenerOnButton();
  enableDetailsBlock();
}

window.onload = beginGame;
