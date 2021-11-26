// module gameboard
var gameBoard = (() => {
    // array of board
    let game = [
        ['-', '-', '-'],
        ['-', '-', '-'],
        ['-', '-', '-']
    ];
    // add piece to board
    // board check
    let boardCheck = () => {
        return false;
    }

})()

var gameDisplay = (() => {
    let createBoard = () => {
        let boardDom = document.getElementById("board");
        for (let row = 0; row < 3; row++) {
            let boardRow = document.createElement('div')
            for (let col = 0; col < 3; col++) {
                let boardCol = document.createElement('div')
                let boardIcon = document.createElement('i')
                boardCol.classList.add("board-col-piece")
                boardCol.addEventListener("click", boardPieceClick)

                boardCol.appendChild(boardIcon)
                boardRow.appendChild(boardCol);
                boardDom.appendChild(boardRow)
            }
        }
    }
    function boardPieceClick() {
            console.log(game.getPlayerTurn())
        if (game.getPlayerTurn() == game.getPlayers().playerOne.getName()) {
            this.children[0].classList.add("fas")
            this.children[0].classList.add("fa-times")
            game.setPlayerTurn(game.getPlayers().playerTwo.getName())
            console.log(game.getPlayerTurn())
        } else if(game.getPlayerTurn() == game.getPlayers().playerTwo.getName()) {
            this.children[0].classList.add("far")
            this.children[0].classList.add("fa-circle")
            game.setPlayerTurn(game.getPlayers().playerOne.getName())
        }
        else {
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
            playerTwo: player("y")
        }
        console.log(players)
        // console.log(getPlayers().)

        // while (true) {
        // turn
        // if(gameBoard.checkBoard()){break;}
        // yPlayer.playTurn();
        // if(gameBoard.checkBoard()){break;}
        // }
        // reset
        // start
        // winner
    }
    return {
        start,
        setPlayerTurn,
        getPlayerTurn,
        getPlayers
    }
})()

// game.setPlayerTurn(game.getPlayers().playerOne.getName())
game.start();
