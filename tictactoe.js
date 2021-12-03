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

    let boardTie = () => {
        console.log("Check Tie")
        return !board[0].includes("-") &&
            !board[1].includes("-") &&
            !board[2].includes("-")
    }

    let boardWin = (row, col) => {
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
        boardWin,
        boardTie,
        addBoardPiece
    }
})()

var gameDisplay = (() => {
    let createBoardListener = () => {
        let boardDom = document.getElementsByClassName("board-col-piece")
        Array.from(boardDom).forEach(boardSpace => {
            boardSpace.addEventListener("click", boardPieceClick)
            boardSpace.row = boardSpace.id.slice(1, 2)
            boardSpace.col = boardSpace.id.slice(3)
        })
    }

    function boardPieceClick() {
        if (gameBoard.addBoardPiece(this.row, this.col)) {
            let piece = document.createElement("img");
            let result = document.getElementById("result")
            piece.src = game.getPlayerTurn().getImageSrc();
            this.appendChild(piece)
            this.classList.remove("board-col-piece-hover")

            if (gameBoard.boardWin(this.row, this.col)) {
                game.winner(game.getPlayerTurn())
                // remove hover for all the other places
                // dont allow click on the other places

            } else if (gameBoard.boardTie()) {
                result.innerText = "It's a Draw"
            } else {
                if (game.getPlayers().playerOne.getName() == game.getPlayerTurn().getName()) {
                    game.setPlayerTurn(game.getPlayers().playerTwo)
                    result.innerText = "Player Two's Turn"
                } else {
                    game.setPlayerTurn(game.getPlayers().playerOne)
                    result.innerText = "Player One's Turn"
                }
            }
        }
    }


    return {
        createBoardListener
    }
})()

var player = (name, imgSrc, scoreN) => {
    let imageSrc = imgSrc;
    let scoreName = scoreN;

    let getImageSrc = () => {
        return imageSrc;
    };
    const getName = () => {
        return name;
    }
    let playTurn = () => game.setPlayerTurn(this)
    let getScoreName = () => {
        return scoreName;
    }
    return {
        getName,
        playTurn,
        getImageSrc,
        getScoreName
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
            playerOne: player("x", "img/glasses-with-mustache.png", "player-one"),
            playerTwo: player("o", "img/carnival.png", "player-two")
        }
        //set turn of first player
        game.setPlayerTurn(game.getPlayers().playerOne)

        // reset
    }

    function winner(playerWin) {
        let resultText = "";
        console.log("Winner: " + playerWin.getName())
        if (playerWin.getName() == "x") {
            resultText = "Player One Wins!"
        } else if (playerWin.getName() == "o") {
            resultText = "Player Two Wins!";
        }

        document.getElementById("result").innerText = resultText;
        console.log(resultText)
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