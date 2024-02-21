const GameBoard = (function () {
    const board = [
        ['', '', ''], ['', '', ''], ['', '', '']
    ];

    const makeMove = function (row, column, player) {

        if (board[row][column] === '') {
            board[row][column] = player.piece
            return true
        }
        else {
            return false
        }
    };

    const getBoard = function () {
        return board
    }

    const printBoard = () => {
        console.log(board)
    }


    return { getBoard, makeMove, printBoard };
})()

function gameController(playerOne, playerTwo) {
    playerOneName = playerOne
    playerTwoName = playerTwo
    const board = GameBoard

    const players = [
        {
            name: playerOneName,
            piece: "X"
        },
        {
            name: playerTwoName,
            piece: "O"
        }
    ]

    let activePlayer = players[0]

    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1]
        } else {
            activePlayer = players[0]
        }
    }
    const getActivePlayer = () => {
        console.log(`It is ${activePlayer.name}'s turn.`)
        return activePlayer
    }

    const printRound = () => {
        board.printBoard()
    }

    const playRound = (row, column) => {
        let tie = false
        let winner = false


        getActivePlayer()
        printRound()

        let legalMove = board.makeMove(row, column, activePlayer);

        if (!legalMove) {
            // If the move is not legal, inform the player and return
            console.log("Please make a legal move");
            return; // leaves the playRound function
        }

        winner = checkForWinner(board.getBoard(), activePlayer.piece)
        tie = checkForTie(board.getBoard())
        switchPlayerTurn()
    }

    const checkForWinner = function (board, piece) {
        if (
            // Horizontal winners
            (board[0][0] === piece && board[0][1] === piece && board[0][2] === piece) ||
            (board[1][0] === piece && board[1][1] === piece && board[1][2] === piece) ||
            (board[2][0] === piece && board[2][1] === piece && board[2][2] === piece) ||
            // Vertical winners
            (board[0][0] === piece && board[1][0] === piece && board[2][0] === piece) ||
            (board[0][1] === piece && board[1][1] === piece && board[2][1] === piece) ||
            (board[0][2] === piece && board[1][2] === piece && board[2][2] === piece) ||
            // Diagonal winners
            (board[0][0] === piece && board[1][1] === piece && board[2][2] === piece) ||
            (board[0][2] === piece && board[1][1] === piece && board[2][0] === piece)
        ) {
            console.log("We have a winner");
            return true
        } else {
            console.log("No winner yet");
            return false
        }
    }

    const checkForTie = function (board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === '') {
                    console.log("no tie yet")
                    return false
                }
            }
        }
        console.log("we have a tie")
        return true
    }
    return { board, getActivePlayer, playRound }
}

function ScreenController() {
    let firstPlayerName
    let secondPlayerName
    let game;
    const newGameBtn = document.getElementById("new-game")
    const modal = document.getElementById("modal")
    const form = document.getElementById("form")
    const cancelBtn = document.getElementById("cancel")
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');


    newGameBtn.addEventListener("click", () => {
        modal.showModal()
    })

    cancelBtn.addEventListener("click", () => {
        modal.close()
    })

    function getNames(event) {
        event.preventDefault()
        firstPlayerName = document.getElementById("first-player-name").value
        secondPlayerName = document.getElementById("second-player-name").value
        modal.close()

        if (firstPlayerName && secondPlayerName) {
            game = gameController(firstPlayerName, secondPlayerName);
            updateScreen(); // Update the screen once the game is created
        }
    }

    form.addEventListener("submit", function (event) {
        getNames(event)
    })

    const updateScreen = function () {
        boardDiv.textContent = ""
        const board = game.board.getBoard()
        const activePlayer = game.getActivePlayer()
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

        // render the board
        for (let i = 0; i < board.length; i++) {
            const row = document.createElement("div")
            boardDiv.appendChild(row)
            for (let j = 0; j < board[i].length; j++) {
                const square = document.createElement("button")
                square.dataset.row = i
                square.dataset.column = j;
                square.textContent = board[i][j]
                row.appendChild(square)
            }
        }
    }

    function handleBoardClicks(event) {
        const clickedSquare = event.target
        const row = clickedSquare.dataset.row
        const column = clickedSquare.dataset.column
        game.playRound(row, column)
        updateScreen()
    }
    boardDiv.addEventListener("click", handleBoardClicks)
}

ScreenController()
