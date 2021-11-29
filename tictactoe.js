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

        for (let check = 0; check <= 2; check++) {
            //check cols
            if (board[check][0] == board[check][1] && board[check][1] == board[check][2] && board[check][0] == game.getPlayerTurn().getName()) {
                return true;
            }
            //check rows
            if (board[0][check] == board[1][check] && board[1][check] == board[2][check] && board[0][check] == game.getPlayerTurn().getName()) {
                return true
            }
        }
        //check diagonal top left to bottom right
        if (board[0][0] == board[1][1] && board[1][1] == board[2][2] && board[0][0] == game.getPlayerTurn().getName()) {
            return true;
        }
        //check diagonal top right to bottom left
        if (board[0][2] == board[1][1] && board[1][1] == board[2][0] && board[0][2] == game.getPlayerTurn().getName()) {
            return true;
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
                boardCol.id = `r${row}c${col}`;
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