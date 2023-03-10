/* ****************************************************** 

  Tic Tac Toe exercise of the Odin project

  Board codification:

    0 1 2
    3 4 5
    6 7 8

  Winning conditions:

    012, 345, 678, 036, 147, 258, 048, 246, board is full

****************************************************** */



/* ****************************************************** 
  Player Object 
****************************************************** */
const playerFactory = (name) => {
  return { name };
};



/* ****************************************************** 
  Game board Object 
****************************************************** */
var gameBoard = (function() {
  'use strict';

  var _gameBoardArray;

  function _resetBoard() {
    _gameBoardArray = ["N", "N", "N", "N", "N", "N", "N", "N", "N"];
  }

  function resetBoard() {
    _resetBoard();
  }

  function _setSquare(square, mark) {
    _gameBoardArray[square] = mark;
  }

  function setSquare(square, mark) {
    _setSquare(square, mark);
  }

  function _getSquare(square) {
    return _gameBoardArray[square];
  }

  function getSquare(square) {
    return _getSquare(square);
  }

  function _checkIfGameOver() {
    console.log(_gameBoardArray[0] + _gameBoardArray[1] + _gameBoardArray[2] + _gameBoardArray[3] + _gameBoardArray[4] + _gameBoardArray[5] + _gameBoardArray[6] + _gameBoardArray[7] + _gameBoardArray[8]); 
    
    if ((((_gameBoardArray[0] == _gameBoardArray[1]) && (_gameBoardArray[1] == _gameBoardArray[2])) ||
             ((_gameBoardArray[0] == _gameBoardArray[3]) && (_gameBoardArray[3] == _gameBoardArray[6])) ||
             ((_gameBoardArray[0] == _gameBoardArray[4]) && (_gameBoardArray[4] == _gameBoardArray[8]))) && (_gameBoardArray[0] != "N")) {
      console.log(_gameBoardArray[0]);
      return _gameBoardArray[0];
    } else if ((((_gameBoardArray[2] == _gameBoardArray[4]) && (_gameBoardArray[4] == _gameBoardArray[6])) ||
             ((_gameBoardArray[3] == _gameBoardArray[4]) && (_gameBoardArray[4] == _gameBoardArray[5])) ||
             ((_gameBoardArray[1] == _gameBoardArray[4]) && (_gameBoardArray[4] == _gameBoardArray[7]))) && (_gameBoardArray[4] != "N")) {
      console.log(_gameBoardArray[4]);
      return _gameBoardArray[4];
    } else if ((((_gameBoardArray[2] == _gameBoardArray[5]) && (_gameBoardArray[5] == _gameBoardArray[8])) ||
             ((_gameBoardArray[6] == _gameBoardArray[7]) && (_gameBoardArray[7] == _gameBoardArray[8]))) && (_gameBoardArray[8] != "N")) {
      console.log(_gameBoardArray[8]);
      return _gameBoardArray[8];
    } else if ((_gameBoardArray[0] != "N") && (_gameBoardArray[1] != "N") && (_gameBoardArray[2] != "N") && (_gameBoardArray[3] != "N") && 
             (_gameBoardArray[4] != "N") && (_gameBoardArray[5] != "N") && (_gameBoardArray[6] != "N") && (_gameBoardArray[7] != "N") && 
             (_gameBoardArray[8] != "N")) {
      return "Draw";
    }
    return false;
  }

  function checkIfGameOver() {
    return _checkIfGameOver();
  }

  return {
    resetBoard: resetBoard,
    setSquare: setSquare,
    getSquare: getSquare,
    checkIfGameOver: checkIfGameOver,
  };
})();



/* ****************************************************** 
  DOM controller Object 
****************************************************** */
var displayController = (function() {
  'use strict';

  var _turn = "X";

  const typeSelect = document.getElementById("type");
  typeSelect.addEventListener("change", (e) => {  
      if (typeSelect.value == "Two") {
          document.getElementById("player2Name").disabled = false;
          document.getElementById("marks").disabled = true;
      } else {
          document.getElementById("player2Name").disabled = true;
          document.getElementById("marks").disabled = false;
      };
  });
  
  const restart_btn = document.getElementById("restart");
  restart_btn.addEventListener("click", (e) => {
    e.preventDefault();
    startScreen.style.display = "block";
    boardScreen.style.display = "none";
    resultScreen.style.display = "none";
    anotherGame.style.display = "none";
  });
  
  function _resetScreen() {
    for (let i = 0; i < 9; i++) {
      const element = document.getElementById(i);
      element.innerHTML = "&nbsp;";
    }
  }

  function _activateGameboard () {
    for (let i = 0; i < 9; i++) {
     const element = document.getElementById(i);
     element.addEventListener("click", (e) => {
       if (gameBoard.getSquare(i) == "N") {
         gameBoard.setSquare(i, _turn);
         element.innerHTML = _turn;
         console.log("_turn : " + _turn);
         console.log(i);
         if (_turn == "X") { _turn = "O"; } else { _turn = "X"; }
         const thisGameResult = gameBoard.checkIfGameOver();
         console.log(thisGameResult);
         if (thisGameResult == "Draw") {
           console.log("Draw !");
           const result = document.getElementById("result");
           result.innerHTML = "... there's no winner: it's a draw!";
           boardScreen.style.display = "none";
           resultScreen.style.display = "block";
         } else if (thisGameResult == "X") {
           console.log("X wins !");
           const result = document.getElementById("result");
           result.innerHTML = "X !";
           boardScreen.style.display = "none";
           resultScreen.style.display = "block";
         } else if (thisGameResult == "O") {
           console.log("O wins !");
           const result = document.getElementById("result");
           result.innerHTML = "O !";
           boardScreen.style.display = "none";
           resultScreen.style.display = "block";
         } else {
           console.log("Game not Over...");
         }
       }
     });
    }
  }

  const start_btn = document.getElementById("start");
  start_btn.addEventListener("click", (e) => {
    const player1 = playerFactory(document.getElementById("player1Name").value);
    const player2 = playerFactory(document.getElementById("player2Name").value);
// type
// marks
    gameBoard.resetBoard();
    _resetScreen();
    _turn = "X";
    _activateGameboard();
    e.preventDefault();
    startScreen.style.display = "none";
    boardScreen.style.display = "block";
    anotherGame.style.display = "block";
  });  

  return {

  };
})();



/* ****************************************************** 
  Gameplay controller Object 
****************************************************** */




/*

Style each cell better - instead of a number, try to render an white, red, or blue 
circle.depending on the state of the cell.

Put some paint on that house! Style the rest of the project to your liking.

1. Start by just getting the computer to make a random legal move.

2. Once you’ve gotten that, work on making the computer smart. It is possible to 
create an unbeatable AI using the minimax algorithm 

*/