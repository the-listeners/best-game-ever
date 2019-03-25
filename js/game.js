'use strict'


//This is where are the start button is being modified
var startButton = document.getElementById('startButton');
startButton.addEventListener("click", handleStartGame);

function handleStartGame(){
  console.log('The game has begun!');
}