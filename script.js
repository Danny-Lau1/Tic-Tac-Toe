const GameBoard = (function () {
    let board = [
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

    const resetBoard = () => {
        board = [
            ['', '', ''], ['', '', ''], ['', '', '']
        ];
        return board
    }


    return { getBoard, makeMove, printBoard, resetBoard };
})()

function gameController(playerOne, playerTwo) {
    playerOneName = playerOne
    playerTwoName = playerTwo
    let isThereWinner = false
    let isThereTie = false
    let winner = null
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

    const getPlayers = () => {
        return players
    }

    const switchPlayerTurn = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1]
        } else {
            activePlayer = players[0]
        }
    }

    const resetPlayers = () => {
        activePlayer = players[0]
    }

    const resetWinner = () => {
        isThereWinner = false
        isThereTie = false
        winner = null
    }

    const getActivePlayer = () => {
        console.log(`It is ${activePlayer.name}'s turn.`)
        return activePlayer
    }

    const printRound = () => {
        board.printBoard()
    }

    const playRound = (row, column) => {
        getActivePlayer()
        printRound()

        let legalMove = board.makeMove(row, column, activePlayer);

        if (!legalMove) {
            // If the move is not legal, inform the player and return
            console.log("Please make a legal move");
            return; // leaves the playRound function
        }

        isThereWinner = checkForWinner(board.getBoard(), activePlayer.piece)
        if (isThereWinner) {
            winner = activePlayer.name
        }
        isThereTie = checkForTie(board.getBoard())
        switchPlayerTurn()
        return [isThereWinner, isThereTie, winner]
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
    return { board, getActivePlayer, playRound, resetPlayers, getPlayers, resetWinner }
}

function ScreenController() {
    let firstPlayerName
    let secondPlayerName
    let game;
    const newGameBtn = document.getElementById("new-game")
    const resetBtn = document.getElementById("reset")
    const modal = document.getElementById("input-modal")
    const results = document.getElementById("results")
    const playAgainBtn = document.getElementById("play-again")
    const resultsMessage = document.getElementById("result-message")
    const form = document.getElementById("form")
    const cancelBtn = document.getElementById("cancel")
    const playerTurnDiv = document.querySelector('.turn');
    const playerOneTitle = document.getElementById("player-one")
    const playerTwoTitle = document.getElementById("player-two")
    const boardContainer = document.querySelector(".coded-board-container")
    const boardDiv = document.createElement("div")
    boardDiv.className = "coded-board"


    newGameBtn.addEventListener("click", () => {
        modal.showModal()
    })

    cancelBtn.addEventListener("click", () => {
        modal.close()
    })

    resetBtn.addEventListener("click", resetGame)



    function resetGame() {
        if (!game) {
            return
        }
        game.board.resetBoard()
        game.resetPlayers()
        game.resetWinner()
        updateScreen()
    }



    function getNames(event) {
        event.preventDefault()
        firstPlayerName = document.getElementById("first-player-name").value
        secondPlayerName = document.getElementById("second-player-name").value
        if (firstPlayerName && secondPlayerName) {
            game = gameController(firstPlayerName, secondPlayerName);
            resetGame();
            updateScreen(); // Update the screen once the game is created
            form.reset()
            modal.close()

        } else {
            // Handle the case where the user cancels or doesn't input valid names
            modal.close();
        }
    }

    form.addEventListener("submit", function (event) {
        getNames(event)
    })

    const updateScreen = function () {
        boardContainer.appendChild(boardDiv)
        boardDiv.textContent = ""
        const board = game.board.getBoard()
        const activePlayer = game.getActivePlayer()
        playerNames = game.getPlayers()
        playerOneTitle.textContent = `Player 1: ${playerNames[0].name} | Piece: X`
        playerTwoTitle.textContent = `Player 2: ${playerNames[1].name} | Piece O`
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

        // render the board
        for (let i = 0; i < board.length; i++) {
            const row = document.createElement("div")
            row.className = "row"
            boardDiv.appendChild(row)
            for (let j = 0; j < board[i].length; j++) {
                const square = document.createElement("button")
                square.dataset.row = i
                square.dataset.column = j;
                square.textContent = board[i][j];
                row.appendChild(square)
            }
        }

    }

    function showResults(winnerOrLoser) {
        // winnerOrLoser[0] is winner status, winnerOrLoser[1] is tie status, winnerOrLoser[2] is the winner name
        results.showModal()
        if (winnerOrLoser[0]) {
            resultsMessage.textContent = `The Winner is ${winnerOrLoser[2]}`
        }
        else {
            resultsMessage.textContent = `We have a tie!`
        }

    }

    playAgainBtn.addEventListener("click", () => {
        results.close()
        resetGame()
    })

    function handleBoardClicks(event) {
        const clickedSquare = event.target
        const row = clickedSquare.dataset.row
        const column = clickedSquare.dataset.column
        const winnerOrTie = game.playRound(row, column)
        if (winnerOrTie[0] === true || winnerOrTie[1] === true) {
            console.log(winnerOrTie)
            showResults(winnerOrTie)
        }
        updateScreen()
    }
    boardDiv.addEventListener("click", handleBoardClicks)
}

ScreenController()
