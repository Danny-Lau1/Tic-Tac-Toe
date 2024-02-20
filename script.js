const GameBoard = (function () {
    const board = [
        [0, 0, 0], [0, 0, 0], [0, 0, 0]
    ];

    const makeMove = function (row, column, player) {
        const legalMove = false

        while (legalMove === false) {
            if (board[row][column] === 0) {
                board[row][column] = player.piece
                legalMove = true
            }
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
            piece: 1
        },
        {
            name: playerTwoName,
            piece: 2
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

    const playRound = () => {
        let tie = false
        let winner = false

        for (let i = 0; i <= 5; i++) {
            getActivePlayer()
            printRound()
            board.makeMove(0, 0, activePlayer)
            winner = checkForWinner(board.getBoard(), activePlayer.piece)
            tie = checkForTie(board.getBoard())
            switchPlayerTurn()
            board.makeMove(0, 1, activePlayer)
        }


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
                if (board[i][j] === 0) {
                    console.log("no tie yet")
                    return false
                }
            }
        }
        console.log("we have a tie")
        return True
    }
    return { board, getActivePlayer, playRound }
}

function ScreenController() {
    const game = gameController("Danny1", "Luci2")
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');

    const updateScreen = function () {
        boardDiv.textContent = ""

        const board = game.board.getBoard()
        const activePlayer = game.getActivePlayer()
        playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

        for (let i = 0; i < board.length; i++) {
            const row = document.createElement("div")
            boardDiv.appendChild(row)
            for (let j = 0; j < board[i].length; j++) {
                const square = document.createElement("button")
                square.dataset.row = i
                square.dataset.column = j;
                row.appendChild(square)
            }
        }

    }

    updateScreen()
}

ScreenController()
