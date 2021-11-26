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

// module gamedisplay ?? part of game or solo??
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
                boardIcon.classList.add("fas")
                boardIcon.classList.add("fa-times")

                boardCol.appendChild(boardIcon)
                boardRow.appendChild(boardCol);
                boardDom.appendChild(boardRow)
            }
        }
    }
    let boardPieceClick = () => {}
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
    let playTurn = () => {}

    return {
        getName
    }
}

// module game
var game = (() => {
    let start = () => {
        //board init
        gameDisplay.createBoard()
        //player init
        let xPlayer = player("x");
        let yPlayer = player("y");

        // while (true) {
        // turn
        // xPlayer.playTurn();
        // if(gameBoard.checkBoard()){break;}
        // yPlayer.playTurn();
        // if(gameBoard.checkBoard()){break;}
        // }
        // reset
        // start
        // winner
    }
    return {start}
})()

game.start();