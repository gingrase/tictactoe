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
const playerFactory = (name, bot) => {
  return { name, bot };
};



/* ****************************************************** 

  Game board Object 

****************************************************** */
var gameBoard = (function() {
  'use strict';

  var _gameBoardArray;

  function _resetBoard() {
    _gameBoardArray = [0, 1, 2, 3, 4, 5, 6, 7, 8];
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

  function _checkIfGameOver(board) {
    if (((board[0] == board[1]) && (board[1] == board[2])) ||
        ((board[0] == board[3]) && (board[3] == board[6])) ||
        ((board[0] == board[4]) && (board[4] == board[8]))) {
      return board[0];
    } else if (((board[2] == board[4]) && (board[4] == board[6])) ||
               ((board[3] == board[4]) && (board[4] == board[5])) ||
               ((board[1] == board[4]) && (board[4] == board[7]))) {
      return board[4];
    } else if (((board[2] == board[5]) && (board[5] == board[8])) ||
               ((board[6] == board[7]) && (board[7] == board[8]))) {
      return board[8];
    } else if (((board[0] == "X") || (board[0] == "O")) && 
               ((board[1] == "X") || (board[1] == "O")) && 
               ((board[2] == "X") || (board[2] == "O")) && 
               ((board[3] == "X") || (board[3] == "O")) && 
               ((board[4] == "X") || (board[4] == "O")) && 
               ((board[5] == "X") || (board[5] == "O")) && 
               ((board[6] == "X") || (board[6] == "O")) && 
               ((board[7] == "X") || (board[7] == "O")) && 
               ((board[8] == "X") || (board[8] == "O"))) {
      return "Draw";
    }
    return false;
  }

  function checkIfGameOver() {
    return _checkIfGameOver(_gameBoardArray);
  }

  function checkIfXWon() {
    return (_checkIfGameOver(_gameBoardArray) == "X");
  }

  function checkIfOWon() {
    return (_checkIfGameOver(_gameBoardArray) == "O");
  }

  function checkIfDraw() {
    return (_checkIfGameOver(_gameBoardArray) == "Draw");
  }

  function emptySquares(board){
    return  board.filter(s => s != "O" && s != "X");
  }

  function bestSpot(aiPlayer) {
    var huPlayer;
    if (aiPlayer == "X") { 
      huPlayer = "O"; 
    } else { 
      huPlayer = "X"; 
    }
    return minimax(_gameBoardArray, aiPlayer, huPlayer, aiPlayer).index;
  }

  function minimax(newBoard, player, huPlayer, aiPlayer) {
    var availSpots = emptySquares(newBoard);
    var result = _checkIfGameOver(newBoard);
    if (result == aiPlayer) {
      return { score: 10 };
    } else if (result == huPlayer) {
      return { score: -10 };
    } else if (availSpots.length == 0) {
      return { score: 0 };
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
        var move = {};
        move.index = newBoard[availSpots[i]];
        newBoard[availSpots[i]] = player;
        if (player == aiPlayer) {
            var result = minimax(newBoard, huPlayer, huPlayer, aiPlayer);
            move.score = result.score;
        } else {
            var result = minimax(newBoard, aiPlayer, huPlayer, aiPlayer);
            move.score = result.score;
        }
        newBoard[availSpots[i]] = move.index;
        moves.push(move);
    }
    var bestMove;
    if (player == aiPlayer) {
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
  }

  return {
    resetBoard: resetBoard,
    setSquare: setSquare,
    getSquare: getSquare,
    checkIfGameOver: checkIfGameOver,
    bestSpot: bestSpot
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
      resultScreen.style.display = "block"; 
    } else if (thisGameResult == "X") {
      result.innerHTML = playerX.name + " (X) !";
      resultScreen.style.display = "block"; 
    } else if (thisGameResult == "O") {
      result.innerHTML = playerO.name + " (O) !";
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

  function _activateGameboard (gameType, playerX, playerO) {
    var old_element = document.getElementById("grid");
    var new_element = old_element.cloneNode(true);
    old_element.parentNode.replaceChild(new_element, old_element);
    _turn = "X";
    for (let i = 0; i < 9; i++) {
      const element = document.getElementById(i);
      element.addEventListener("click", (e) => {
        if (((gameBoard.getSquare(i) != "X") && (gameBoard.getSquare(i) != "O")) && (!_gameOver(playerX, playerO))) {
          gameBoard.setSquare(i, _turn);
          element.innerHTML = _turn;
          if (_turn == "X") {_turn = "O";} else {_turn = "X";}
          if ((!_gameOver(playerX, playerO)) && (gameType == "Easy")) { 
            let j = getRandomIntInclusive(0, 8);
            while ((gameBoard.getSquare(j) == "X") || (gameBoard.getSquare(j) == "O")) {
              j = getRandomIntInclusive(0, 8);
            };
            gameBoard.setSquare(j, _turn);
            const square = document.getElementById(j);
            square.innerHTML = _turn;
            if (_turn == "X") {_turn = "O";} else {_turn = "X";} 
            _gameOver(playerX, playerO);
          } else if ((!_gameOver(playerX, playerO)) && (gameType == "Unbeatable")) {
            let j = gameBoard.bestSpot(_turn);
            gameBoard.setSquare(j, _turn);
            const square = document.getElementById(j);
            square.innerHTML = _turn;
            if (_turn == "X") {_turn = "O";} else {_turn = "X";} 
            _gameOver(playerX, playerO);
          } else {
            console.log("2 players");
          }
        } 
      });
    } 
  }

  const start_btn = document.getElementById("start");
  start_btn.addEventListener("click", (e) => {
    const gameType = document.getElementById("type").value;
    const playerMarks = document.getElementById("marks").value;
    switch (gameType) {
      case "Two":
        //playerMarks = "X";
        console.log("2 players");
        const playerX = playerFactory(document.getElementById("player1Name").value, false);
        const playerO = playerFactory(document.getElementById("player2Name").value, false);
        const onScreenPlayerXName = document.getElementById("player1");
        const onScreenPlayerOName = document.getElementById("player2");
        onScreenPlayerXName.innerHTML = "Player 1 (X): " + playerX.name;
        onScreenPlayerOName.innerHTML = "Player 2 (O): " + playerO.name;        
        _activateGameboard(gameType, playerX, playerO);
        break;
      case "Easy":
        if (playerMarks == "X") {
          const playerX = playerFactory(document.getElementById("player1Name").value, false);
          const playerO = playerFactory("Easy bot", true);
          const onScreenPlayerXName = document.getElementById("player1");
          const onScreenPlayerOName = document.getElementById("player2");
          onScreenPlayerXName.innerHTML = "Player 1 (X): " + playerX.name;
          onScreenPlayerOName.innerHTML = "Player 2 (O): " + playerO.name;        
          _activateGameboard(gameType, playerX, playerO);
        } else {
          const playerX = playerFactory("Easy bot", true);
          const playerO = playerFactory(document.getElementById("player1Name").value, false);
          const onScreenPlayerXName = document.getElementById("player1");
          const onScreenPlayerOName = document.getElementById("player2");
          onScreenPlayerXName.innerHTML = "Player 1 (X): " + playerX.name;
          onScreenPlayerOName.innerHTML = "Player 2 (O): " + playerO.name;        
          _activateGameboard(gameType, playerX, playerO);
        }
        break;
      case "Unbeatable":
        if (playerMarks == "X") {
          const playerX = playerFactory(document.getElementById("player1Name").value, false);
          const playerO = playerFactory("Unbeatable bot", true);
          const onScreenPlayerXName = document.getElementById("player1");
          const onScreenPlayerOName = document.getElementById("player2");
          onScreenPlayerXName.innerHTML = "Player 1 (X): " + playerX.name;
          onScreenPlayerOName.innerHTML = "Player 2 (O): " + playerO.name;        
          _activateGameboard(gameType, playerX, playerO);
        } else {
          const playerX = playerFactory("Unbeatable bot", true);
          const playerO = playerFactory(document.getElementById("player1Name").value, false);
          const onScreenPlayerXName = document.getElementById("player1");
          const onScreenPlayerOName = document.getElementById("player2");
          onScreenPlayerXName.innerHTML = "Player 1 (X): " + playerX.name;
          onScreenPlayerOName.innerHTML = "Player 2 (O): " + playerO.name;        
          _activateGameboard(gameType, playerX, playerO);
        }
        break;
      default:
        console.log("Error: invalid type");
    }
    gameBoard.resetBoard();
    _resetBoardOnScreen();
    if ((playerMarks == "O") && (gameType != "Two")) {
      let start = getRandomIntInclusive(0, 8);
      gameBoard.setSquare(start, "X");
      document.getElementById(start).innerHTML = _turn;
      _turn = "O";    
    }
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

  function _resetBoardOnScreen() {
    for (let i = 0; i < 9; i++) {
      const element = document.getElementById(i);
      element.innerHTML = "&nbsp;";
    }
  }

  return {

  };
})();
