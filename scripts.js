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

  Valid values for game board square:
  
    "N" = null (blank)
    "X" or "O" = regular game marks

****************************************************** */
var gameBoard = (function() {
  'use strict';

  var _gameBoardArray;

  function _resetBoard(marks) {
//    console.log("Marks received by : " + marks);
    if (marks == "O") {
//      console.log("Board is reset for O");
      _gameBoardArray = ["X", "N", "N", "N", "N", "N", "N", "N", "N"];
    } else {
//      console.log("Board is reset for X");
      _gameBoardArray = ["N", "N", "N", "N", "N", "N", "N", "N", "N"];
    }
  }

  function resetBoard(marks) {
    _resetBoard(marks);
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
    if ((((_gameBoardArray[0] == _gameBoardArray[1]) && (_gameBoardArray[1] == _gameBoardArray[2])) ||
             ((_gameBoardArray[0] == _gameBoardArray[3]) && (_gameBoardArray[3] == _gameBoardArray[6])) ||
             ((_gameBoardArray[0] == _gameBoardArray[4]) && (_gameBoardArray[4] == _gameBoardArray[8]))) && (_gameBoardArray[0] != "N")) {
      return _gameBoardArray[0];
    } else if ((((_gameBoardArray[2] == _gameBoardArray[4]) && (_gameBoardArray[4] == _gameBoardArray[6])) ||
             ((_gameBoardArray[3] == _gameBoardArray[4]) && (_gameBoardArray[4] == _gameBoardArray[5])) ||
             ((_gameBoardArray[1] == _gameBoardArray[4]) && (_gameBoardArray[4] == _gameBoardArray[7]))) && (_gameBoardArray[4] != "N")) {
      return _gameBoardArray[4];
    } else if ((((_gameBoardArray[2] == _gameBoardArray[5]) && (_gameBoardArray[5] == _gameBoardArray[8])) ||
             ((_gameBoardArray[6] == _gameBoardArray[7]) && (_gameBoardArray[7] == _gameBoardArray[8]))) && (_gameBoardArray[8] != "N")) {
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

  function _gameOver (playerX, playerO) {
    const thisGameResult = gameBoard.checkIfGameOver();
    const result = document.getElementById("result");
    if (thisGameResult == "Draw") {
      result.innerHTML = "... there's no winner: it's a draw!";
      boardScreen.style.display = "none";
      resultScreen.style.display = "block"; 
    } else if (thisGameResult == "X") {
      result.innerHTML = playerX + " (X) !";
      boardScreen.style.display = "none";
      resultScreen.style.display = "block"; 
    } else if (thisGameResult == "O") {
      result.innerHTML = playerO + " (O) !";
      boardScreen.style.display = "none";
      resultScreen.style.display = "block"; 
    } else {
      return false;
    }
    return true; 
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  function _activateGameboard (playerX, playerO, gameType, marks) {
    var old_element = document.getElementById("grid");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    for (let i = 0; i < 9; i++) {
      const element = document.getElementById(i);
      element.addEventListener("click", (e) => {
        if (gameBoard.getSquare(i) == "N") {
          gameBoard.setSquare(i, _turn);
          element.innerHTML = _turn;
          if (_turn == "X") {_turn = "O";} else {_turn = "X";}
          if ((!_gameOver(playerX, playerO)) && (!(gameType == "Two"))) { 
            let j = 4;
            gameBoard.getSquare(j)
            while (gameBoard.getSquare(j) != "N") {
//              if (marks == "O") {
//                j = getRandomIntInclusive(1, 8);
//              } else {
                j = getRandomIntInclusive(0, 8);
//              }
            };
            gameBoard.getSquare(j)
            console.log(j);
            gameBoard.setSquare(j, _turn);
            const elementBot = document.getElementById(j);
            elementBot.innerHTML = _turn;
            _gameOver(playerX, playerO);
            if (_turn == "X") {_turn = "O";} else {_turn = "X";} 
          }
        } 
      });
    } 
  }

  const start_btn = document.getElementById("start");
  start_btn.addEventListener("click", (e) => {
    const player1 = playerFactory(document.getElementById("player1Name").value);
    const player2 = playerFactory(document.getElementById("player2Name").value);
    const gameType = document.getElementById("type").value;
    const marks = document.getElementById("marks").value;
    const player1Name = document.getElementById("player1");
    const player2Name = document.getElementById("player2");
    switch (gameType) {
      case "Two":
        _turn = "X";
        player1Name.innerHTML = "Player 1 (X): " + player1.name;
        player2Name.innerHTML = "Player 2 (O): " + player2.name;        
        _activateGameboard(player1.name, player2.name, gameType, marks);
        break;
      case "Easy":
        _turn = marks;
        if (marks == "X") {
          player1Name.innerHTML = "Player 1 (X): " + player1.name;
          player2Name.innerHTML = "Player 2 (O): Easy bot";
          _activateGameboard(player1.name, "Easy bot", gameType, marks);
        } else {
          player1Name.innerHTML = "Player 1 (X): Easy bot";
          player2Name.innerHTML = "Player 2 (O): " + player1.name;
          _activateGameboard("Easy bot", player1.name, gameType, marks);
        }
        break;
      case "Unbeatable":
        _turn = marks;
        if (marks == "X") {
          player1Name.innerHTML = "Player 1 (X): " + player1.name;
          player2Name.innerHTML = "Player 2 (O): Unbeatable bot";
          _activateGameboard(player1.name, "Unbeatable bot", gameType, marks);
        } else {
          player1Name.innerHTML = "Player 1 (X): Unbeatable bot";
          player2Name.innerHTML = "Player 2 (O): " + player1.name;
          _activateGameboard("Unbeatable bot", player1.name, gameType, marks);
        }
        break;
      default:
        console.log("Error: invalid type");
    }
    gameBoard.resetBoard(_turn);
    _resetScreen(_turn);
    e.preventDefault();
    startScreen.style.display = "none";
    boardScreen.style.display = "block";
    anotherGame.style.display = "block";
  });  

  const restart_btn = document.getElementById("restart");
  restart_btn.addEventListener("click", (e) => {
    e.preventDefault();
    startScreen.style.display = "block";
    boardScreen.style.display = "none";
    resultScreen.style.display = "none";
    anotherGame.style.display = "none";
  });
  
  function _resetScreen(marks) {
    for (let i = 0; i < 9; i++) {
      const element = document.getElementById(i);
      if ((i == 0) && (marks == "O")) {
        element.innerHTML = "X";
      } else {
        element.innerHTML = "&nbsp;";
      }
    }
  }

  return {

  };
})();
