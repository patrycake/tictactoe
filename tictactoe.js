var gameBoard = (() => {
    // array of board
    let board = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
    ];
    let addBoardPiece = (row, col) => {
        if (board[row][col] != "-") return false;
        board[row][col] = game.getPlayerTurn().getName();
        console.log(board)
        return true;
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
    let createBoardListener = () => {
        let boardDom = document.getElementsByClassName("board-col-piece")
        Array.from(boardDom).forEach(boardSpace => {
            boardSpace.addEventListener("click", boardPieceClick)
            boardSpace.row = boardSpace.id.slice(1,2)
            boardSpace.col = boardSpace.id.slice(3)
            console.log(`${boardSpace.row} ${boardSpace.col}`)
        })
    }

    function boardPieceClick() {
        if (gameBoard.addBoardPiece(this.row, this.col)) {
            this.children[0].classList.add(game.getPlayerTurn().getClassListIcon().firstClass)
            this.children[0].classList.add(game.getPlayerTurn().getClassListIcon().secondClass)
            gameBoard.boardCheck(this.row, this.col) ? game.winner(game.getPlayerTurn()) : console.log("No Winner")

            if (game.getPlayers().playerOne.getName() == game.getPlayerTurn().getName()) {
                game.setPlayerTurn(game.getPlayers().playerTwo)
            } else {
                game.setPlayerTurn(game.getPlayers().playerOne)
            }
        }

    }

    return {
         createBoardListener
    }
})()

var player = (name, classLI) => {
    let classListIcon = classLI;

    let getClassListIcon = () => {
        return classListIcon
    };
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
        gameDisplay.createBoardListener()
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