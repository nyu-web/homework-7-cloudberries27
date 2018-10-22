//basic setup
let board;
let player1 = 'X';
let player2 = 'O';
let winningCombos = [
	[0,1,2], 
	[3,4,5], 
	[6,7,8], 
	[0,3,6], 
	[1,4,7], 
	[2,5,8],
	[0,4,8],
	[2,4,6]
];

let boxes = document.querySelectorAll(".box");
start();

function start(){
	document.querySelector(".finished").style.display="none";
	//gives the boxes a number
	board = Array.from(Array(9).keys());
	//clears each box and adds event listener
	for (var i = 0; i < boxes.length; i++){
		boxes[i].innerText = '';
		boxes[i].style.removeProperty('background-color');
		boxes[i].addEventListener('click', turnClick, false);
	}
}
//checks to see if box has not been clicked
function turnClick(box){
	if(typeof board[box.target.id] == 'number'){
		turn(box.target.id, player1);
		if(!tie()) {turn(nextSpot(), player2);}
	}
}

function turn(boxId, player){
	board[boxId] = player;
	document.getElementById(boxId).innerText = player;
	let gameWon = checkWin(board, player);
	if (gameWon) gameOver(gameWon)
}

function checkWin(board, player){
	let plays = board.reduce((x,y,index) => (y===player) ? 		x.concat(index) : x, []);
	let gameWon = null;
	for (let [index, win] of winningCombos.entries()){
		if (win.every(elem => plays.indexOf(elem)>-1)){
			gameWon = {index: index, player: player};
			break;
		}
	}
	return gameWon;
}

function gameOver(gameWon){
	for (let index of winningCombos[gameWon.index]){
		document.getElementById(index).style.backgroundColor=
			gameWon.player === player1 ? "blue" : "red";
	}
	for(var i = 0; i < boxes.length; i++){
		boxes[i].removeEventListener('click', turnClick, false);
	}
	declareWinner(gameWon.player === player1 ? "You win!" : "You Lose!");
}

function declareWinner(winner){
	//displays the winner
	document.querySelector(".finished").style.display = "block";
	document.querySelector(".finished .text").innerText = winner;
}

function notClickedboxes(){
	//checks to see which box still holds a number
	return board.filter(s => typeof s == 'number')
}

function nextSpot(){
	//first box thats not empty
	return notClickedboxes()[0];
}
function tie(){
	//if all the boxes are filled
	if (checkWin === null || notClickedboxes().length == 0){
		for(var i = 0; i < boxes.length; i++){
			boxes[i].style.backgroundColor = "black";
			boxes[i].removeEventListener('click', turnClick, false);
		}
		declareWinner("Tie Game!");
		return true;
	}
	return false;	
}
