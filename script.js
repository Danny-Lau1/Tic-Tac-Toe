const GameBoard = (function () {
    const board = [
        [0, 0, 0], [0, 0, 0], [0, 0, 0]
    ];

    const makeMove = function (row, column, player) {

        if (board[row][column] === 0) {
            board[row][column] = player.piece
        }
    };

    const printBoard = () => {
        console.log(board)
    }


    return { board, makeMove, printBoard };
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
        activePlayer
        console.log(`It is ${activePlayer.name}'s turn.`)
    }

    const printRound = () => {
        board.printBoard()
    }

    const playRound = () => {
        let tie = False
        let winner = null

        getActivePlayer()
        printRound()
        board.makeMove(0, 0, activePlayer)
        checkForWinner(board.board, activePlayer.piece)
        checkForTie(board.board)
        switchPlayerTurn()
        printRound()
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
        } else {
            console.log("No winner yet");
        }
    }

    const checkForTie = function (board) {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[0].length; j++) {
                if (board[i][j] === 0) {
                    return False
                }
            }
        }
        return True
    }
    return { playRound }

}

let game = gameController("Danny1", "Luci2")
game.playRound()