var gameBoard = (() => {
    // array of board
    let board = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
    ];
    let addBoardPiece = (row, col) => {
        board[row][col] = game.getPlayerTurn().getName();
        console.log(board)
    }
    let boardCheck = (row, col) => {
        console.log("boardCheck")
        console.log("Me: " + row + " " + col)
        let size = board.length - 1;

        for (let rowCheck = -1; rowCheck <= 1; rowCheck++) {
            for (let colCheck = -1; colCheck <= 1; colCheck++) {
                let rowNeighbor = row + rowCheck;
                let colNeighbor = col + colCheck;
                if ((rowNeighbor <= size && rowNeighbor >= 0) && (colNeighbor <= size && colNeighbor >= 0)) {
                    if (!((rowCheck == 0) && (colCheck == 0))) {
                        if (board[rowNeighbor][colNeighbor] == game.getPlayerTurn().getName()) {
                            let thirdPieceRow = -1;
                            let thirdPieceCol = -1;
                            if (row == rowNeighbor) {
                                thirdPieceRow = row;
                                thirdPieceCol = getThirdPiece(col, colNeighbor)
                            } else if (col == colNeighbor) {
                                thirdPieceCol = col;
                                thirdPieceRow = getThirdPiece(row, rowNeighbor)
                            }
                            if (thirdPieceCol == -1 || thirdPieceRow == -1) {
                                // diagonal?!
                                return false;
                            } else if (board[thirdPieceRow][thirdPieceCol] == game.getPlayerTurn().getName()) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
        return false;
    }
    function getThirdPiece(position, pNeighbor){
        let thirdPiece = -1;
        if (position == 0 || pNeighbor == 0) {
            if (position == 1 || pNeighbor == 1) {
                thirdPiece = 2;
            } else {
                thirdPiece = 1;
            }
        } else {
            thirdPiece = 0;
        }
        return thirdPiece;
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
        this.children[0].classList.add(game.getPlayerTurn().getClassListIcon().firstClass)
        this.children[0].classList.add(game.getPlayerTurn().getClassListIcon().secondClass)
        gameBoard.boardCheck(this.row, this.col) ? game.winner(game.getPlayerTurn()) : console.log("No Winner")
        // check if valid click
        if (game.getPlayers().playerOne.getName() == game.getPlayerTurn().getName()) {
            game.setPlayerTurn(game.getPlayers().playerTwo)
        } else {
            game.setPlayerTurn(game.getPlayers().playerOne)
        }
    }

    return {
        createBoard
    }
})()
//dom manip

// factory player
var player = (name, classLI) => {
    //class list
    let classListIcon = classLI;

    let getClassListIcon = () => {
        return classListIcon
    };
    // name 
    const getName = () => {
        return name;
    }
    let playTurn = () => game.setPlayerTurn(this)

    return {
        getName,
        playTurn,
        getClassListIcon
    }
}

// module game
var game = (() => {
    let playerTurn = {};
    let players = {};

    let getPlayers = () => {
        return players
    }
    let setPlayerTurn = (player) => {
        playerTurn = player
    }
    let getPlayerTurn = () => {
        return playerTurn
    }
    let start = () => {
        gameDisplay.createBoard()
        players = {
            playerOne: player("x", {
                firstClass: "fas",
                secondClass: "fa-times"
            }),
            playerTwo: player("o", {
                firstClass: "far",
                secondClass: "fa-circle"
            })
        }
        //set turn of first player
        game.setPlayerTurn(game.getPlayers().playerOne)

        // reset
        // start
        // winner
    }
    let winner = (playerWin) => {
        console.log("Winner: " + playerWin.getName())
    }
    return {
        start,
        setPlayerTurn,
        getPlayerTurn,
        getPlayers,
        winner
    }
})()

game.start();