// module gameboard
var gameBoard = (() => {
    // array of board
    let board = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
    ];
    // add piece to board
    let addBoardPiece = (row, col) => {
        board[row][col] = game.getPlayerTurn();
        console.log(board)
    }
    // board check
    let boardCheck = (row, col) => {
        console.log("boardCheck")
        console.log("Me: " + row + " " + col)
        let size = board.length - 1;
        for (let rowCheck = -1; rowCheck <= 1; rowCheck++) {
            for (let colCheck = -1; colCheck <= 1; colCheck++) {
                if (((row + rowCheck) <= size && (row + rowCheck) >= 0) && ((col + colCheck) <= size && (col + colCheck) >= 0)) {
                    if (!(rowCheck == 0) && (colCheck == 0)) {
                        if (board[row + rowCheck][col + colCheck] == game.getPlayerTurn()) {
                            console.log(`Neigh: ${row + rowCheck} ${col + colCheck}`)
                            console.log(board[row + rowCheck][col + colCheck])
                        }
                    }
                }
            }
        }

        return false;
    }
    return {
        boardCheck,
        addBoardPiece
    }
})()

var gameDisplay = (() => {
    let createBoard = () => {
        let boardDom = document.getElementById("board");
        for (let col = 0; col < 3; col++) {
            let boardRow = document.createElement('div')
            for (let row = 0; row < 3; row++) {
                let boardCol = document.createElement('div')
                let boardIcon = document.createElement('i')
                boardCol.row = row;
                boardCol.col = col;
                boardCol.classList.add("board-col-piece")
                boardCol.addEventListener("click", boardPieceClick)

                boardCol.appendChild(boardIcon)
                boardRow.appendChild(boardCol);
                boardDom.appendChild(boardRow)
            }
        }
    }

    function boardPieceClick() {
        gameBoard.addBoardPiece(this.row, this.col)
        if (game.getPlayerTurn() == game.getPlayers().playerOne.getName()) {
            this.children[0].classList.add("fas")
            this.children[0].classList.add("fa-times")
            gameBoard.boardCheck(this.row, this.col) ? game.winner(game.getPlayers().playerOne) : ""
            // check if valid click
            game.setPlayerTurn(game.getPlayers().playerTwo.getName())
        } else if (game.getPlayerTurn() == game.getPlayers().playerTwo.getName()) {
            this.children[0].classList.add("far")
            this.children[0].classList.add("fa-circle")
            gameBoard.boardCheck(this.row, this.col) ? game.winner(game.getPlayers().playerTwo) : ""
            game.setPlayerTurn(game.getPlayers().playerOne.getName())
        }
    }

    return {
        createBoard
    }
})()
//dom manip

// factory player
var player = (name) => {
    // name 
    const getName = () => {
        return name;
    }
    // play turn
    let playTurn = () => {
        //set turn
        game.setPlayerTurn(name)
    }

    return {
        getName,
        playTurn
    }
}

// module game
var game = (() => {
    let playerTurn = "-";
    let players = {};

    let getPlayers = () => {
        return players
    }
    let setPlayerTurn = (playerName) => {
        playerTurn = playerName
    }
    let getPlayerTurn = () => {
        return playerTurn
    }
    let start = () => {
        gameDisplay.createBoard()
        players = {
            playerOne: player("x"),
            playerTwo: player("o")
        }
        //set turn of first player
        game.setPlayerTurn(game.getPlayers().playerOne.getName())

        // reset
        // start
        // winner
    }
    let winner = (playerWin) => {

    }
    return {
        start,
        setPlayerTurn,
        getPlayerTurn,
        getPlayers
    }
})()

game.start();